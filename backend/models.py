from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime
import uuid

class PersonalInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    email: str
    github: str
    linkedin: str
    location: str
    bio: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PersonalInfoCreate(BaseModel):
    name: str
    title: str
    email: str
    github: str
    linkedin: str
    location: str
    bio: str

class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    degree: str
    institution: str
    location: str
    period: str
    gpa: str
    type: Literal["masters", "bachelors", "phd"]
    order: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class EducationCreate(BaseModel):
    degree: str
    institution: str
    location: str
    period: str
    gpa: str
    type: Literal["masters", "bachelors", "phd"]
    order: int

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    company: str
    location: str
    period: str
    type: Literal["Internship", "Full-time", "Research", "Contract"]
    color: Literal["blue", "purple", "cyan", "green", "red", "orange"]
    achievements: List[str]
    tech: List[str]
    order: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ExperienceCreate(BaseModel):
    title: str
    company: str
    location: str
    period: str
    type: Literal["Internship", "Full-time", "Research", "Contract"]
    color: Literal["blue", "purple", "cyan", "green", "red", "orange"]
    achievements: List[str]
    tech: List[str]
    order: int

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    long_description: str
    tech: List[str]
    category: str
    featured: bool
    github: str
    demo: Optional[str] = None
    image: str
    status: Literal["completed", "in-progress"]
    highlights: List[str]
    order: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    long_description: str
    tech: List[str]
    category: str
    featured: bool
    github: str
    demo: Optional[str] = None
    image: str
    status: Literal["completed", "in-progress"]
    highlights: List[str]
    order: int

class Skill(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    level: int
    category: str
    skill_group: Literal["languages", "frameworks", "tools", "aiMl"]
    order: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SkillCreate(BaseModel):
    name: str
    level: int
    category: str
    skill_group: Literal["languages", "frameworks", "tools", "aiMl"]
    order: int

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    status: Literal["new", "read", "replied"] = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class PortfolioComplete(BaseModel):
    personal: PersonalInfo
    education: List[Education]
    experience: List[Experience] 
    projects: List[Project]
    skills: dict  # Grouped by skill_group