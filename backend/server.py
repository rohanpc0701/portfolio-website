from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from models import *
from seed_data import *

# Import legacy models for compatibility
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
from supabase import create_client, Client

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (used if Supabase is not configured)
mongo_url = os.environ.get('MONGO_URL')
db = None
client = None
if mongo_url:
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

# Supabase connection (preferred when configured)
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_SERVICE_ROLE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
supabase: Optional[Client] = None
if SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Collections (MongoDB only)
if db is not None:
    personal_collection = db.personal_info
    education_collection = db.education
    experience_collection = db.experience
    projects_collection = db.projects
    skills_collection = db.skills
    contact_collection = db.contact_messages

# Portfolio Data Endpoints
@api_router.get("/portfolio/personal", response_model=PersonalInfo)
async def get_personal_info():
    """Get personal information"""
    personal = await personal_collection.find_one({})
    if not personal:
        raise HTTPException(status_code=404, detail="Personal information not found")
    
    # Convert MongoDB _id to id
    personal['id'] = str(personal.pop('_id'))
    return PersonalInfo(**personal)

@api_router.get("/portfolio/education", response_model=List[Education])
async def get_education():
    """Get education details"""
    education_cursor = education_collection.find({}).sort("order", 1)
    education_list = await education_cursor.to_list(length=None)
    
    for edu in education_list:
        edu['id'] = str(edu.pop('_id'))
    
    return [Education(**edu) for edu in education_list]

@api_router.get("/portfolio/experience", response_model=List[Experience])
async def get_experience():
    """Get work experience"""
    experience_cursor = experience_collection.find({}).sort("order", 1)
    experience_list = await experience_cursor.to_list(length=None)
    
    for exp in experience_list:
        exp['id'] = str(exp.pop('_id'))
    
    return [Experience(**exp) for exp in experience_list]

@api_router.get("/portfolio/projects", response_model=List[Project])
async def get_projects(category: Optional[str] = None, featured_only: bool = False):
    """Get all projects with optional filtering. Uses Supabase if configured, otherwise MongoDB."""
    # Supabase path
    if supabase:
        q = supabase.table('projects').select('*')
        if category and category != 'all':
            q = q.eq('category', category)
        if featured_only:
            q = q.eq('featured', True)
        # Order by display order if exists, else updated_at
        try:
            q = q.order('order', desc=False)
        except Exception:
            try:
                q = q.order('updated_at', desc=False)
            except Exception:
                pass
        result = q.execute()
        rows = result.data or []
        # Ensure all required fields exist with sensible defaults
        normalized = []
        for row in rows:
            row.setdefault('tech', [])
            row.setdefault('highlights', [])
            row.setdefault('demo', None)
            row.setdefault('featured', False)
            row.setdefault('status', 'completed')
            normalized.append(row)
        return [Project(**row) for row in normalized]

    # MongoDB path
    if db is None:
        raise HTTPException(status_code=500, detail="No database configured")
    query = {}
    if category and category != "all":
        query["category"] = category
    if featured_only:
        query["featured"] = True
    projects_cursor = projects_collection.find(query).sort("order", 1)
    projects_list = await projects_cursor.to_list(length=None)
    for project in projects_list:
        project['id'] = str(project.pop('_id'))
    return [Project(**project) for project in projects_list]

@api_router.get("/portfolio/projects/featured", response_model=List[Project])
async def get_featured_projects():
    """Get featured projects only"""
    return await get_projects(featured_only=True)

@api_router.post("/portfolio/projects/bulk", response_model=List[Project])
async def bulk_create_projects(projects: List[ProjectCreate]):
    """Create multiple projects at once. Uses Supabase if configured, otherwise MongoDB."""
    try:
        if supabase:
            payload = [p.dict() for p in projects]
            # Ensure arrays exist
            for p in payload:
                p.setdefault('tech', [])
                p.setdefault('highlights', [])
            result = supabase.table('projects').insert(payload).execute()
            rows = result.data or []
            return [Project(**row) for row in rows]

        if db is None:
            raise HTTPException(status_code=500, detail="No database configured")
        created: List[Project] = []
        for proj in projects:
            project_obj = Project(**proj.dict())
            result = await projects_collection.insert_one(project_obj.dict())
            project_obj.id = str(result.inserted_id)
            created.append(project_obj)
        return created
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating projects: {str(e)}")

@api_router.get("/portfolio/skills")
async def get_skills():
    """Get all skills grouped by category"""
    skills_cursor = skills_collection.find({}).sort("order", 1)
    skills_list = await skills_cursor.to_list(length=None)
    
    # Group skills by skill_group
    grouped_skills = {
        "languages": [],
        "frameworks": [],
        "tools": [],
        "aiMl": []
    }
    
    for skill in skills_list:
        skill['id'] = str(skill.pop('_id'))
        skill_obj = Skill(**skill)
        grouped_skills[skill_obj.skill_group].append(skill_obj)
    
    return grouped_skills

@api_router.get("/portfolio/complete", response_model=PortfolioComplete)
async def get_complete_portfolio():
    """Get all portfolio data in one request"""
    personal = await get_personal_info()
    education = await get_education()
    experience = await get_experience()
    projects = await get_projects()
    skills = await get_skills()
    
    return PortfolioComplete(
        personal=personal,
        education=education,
        experience=experience,
        projects=projects,
        skills=skills
    )

# Contact Endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(form_data: ContactMessageCreate):
    """Submit contact form. Uses Supabase if configured, otherwise MongoDB."""
    try:
        # Prefer Supabase if available
        if supabase:
            payload = form_data.dict()
            payload.setdefault("status", "new")
            result = supabase.table("contact_messages").insert(payload).execute()
            rows = result.data or []
            if not rows:
                raise HTTPException(status_code=500, detail="Failed to save contact message")
            row = rows[0]
            # Normalize optional fields for Pydantic
            row.setdefault("status", "new")
            return ContactMessage(**row)

        # Fallback to MongoDB
        if db is None:
            raise HTTPException(status_code=500, detail="No database configured")

        message_obj = ContactMessage(**form_data.dict())
        result = await contact_collection.insert_one(message_obj.dict())
        message_obj.id = str(result.inserted_id)
        return message_obj
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting contact form: {str(e)}")

@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin endpoint). Uses Supabase if configured, otherwise MongoDB."""
    try:
        if supabase:
            result = supabase.table("contact_messages").select("*").order("created_at", desc=True).execute()
            rows = result.data or []
            return [ContactMessage(**row) for row in rows]

        if db is None:
            raise HTTPException(status_code=500, detail="No database configured")

        messages_cursor = contact_collection.find({}).sort("created_at", -1)
        messages_list = await messages_cursor.to_list(length=None)
        for message in messages_list:
            message['id'] = str(message.pop('_id'))
        return [ContactMessage(**message) for message in messages_list]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact messages: {str(e)}")

# Admin/Seed Endpoints
@api_router.post("/admin/seed")
async def seed_database():
    """Seed database with initial portfolio data"""
    try:
        if db is None:
            raise HTTPException(status_code=500, detail="No database configured")
        # Clear existing data
        await personal_collection.delete_many({})
        await education_collection.delete_many({})
        await experience_collection.delete_many({})
        await projects_collection.delete_many({})
        await skills_collection.delete_many({})
        
        # Insert personal info
        personal_obj = PersonalInfo(**PERSONAL_INFO)
        await personal_collection.insert_one(personal_obj.dict())
        
        # Insert education
        for edu_data in EDUCATION_DATA:
            edu_obj = Education(**edu_data)
            await education_collection.insert_one(edu_obj.dict())
        
        # Insert experience
        for exp_data in EXPERIENCE_DATA:
            exp_obj = Experience(**exp_data)
            await experience_collection.insert_one(exp_obj.dict())
        
        # Insert projects
        for project_data in PROJECTS_DATA:
            project_obj = Project(**project_data)
            await projects_collection.insert_one(project_obj.dict())
        
        # Insert skills
        for skill_data in SKILLS_DATA:
            skill_obj = Skill(**skill_data)
            await skills_collection.insert_one(skill_obj.dict())
        
        return {"message": "Database seeded successfully", "status": "success"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error seeding database: {str(e)}")

# Legacy endpoints (keeping for compatibility)
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple health endpoints for platform probes
@app.get("/")
async def health_root():
    return {"status": "ok", "service": "portfolio-backend"}

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()