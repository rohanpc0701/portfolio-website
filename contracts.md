# Portfolio Backend Integration Contracts

## Overview
This document defines the API contracts and integration plan to replace mock data with a fully functional backend for Rohan's AI/ML portfolio.

## Database Models

### 1. Personal Info Collection
```typescript
PersonalInfo {
  _id: ObjectId
  name: string
  title: string
  email: string
  github: string
  linkedin: string
  location: string
  bio: string
  createdAt: Date
  updatedAt: Date
}
```

### 2. Education Collection
```typescript
Education {
  _id: ObjectId
  degree: string
  institution: string
  location: string
  period: string
  gpa: string
  type: 'masters' | 'bachelors' | 'phd'
  order: number
  createdAt: Date
  updatedAt: Date
}
```

### 3. Experience Collection
```typescript
Experience {
  _id: ObjectId
  title: string
  company: string
  location: string
  period: string
  type: 'Internship' | 'Full-time' | 'Research' | 'Contract'
  color: 'blue' | 'purple' | 'cyan' | 'green'
  achievements: string[]
  tech: string[]
  order: number
  createdAt: Date
  updatedAt: Date
}
```

### 4. Projects Collection
```typescript
Project {
  _id: ObjectId
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  featured: boolean
  github: string
  demo?: string
  image: string
  status: 'completed' | 'in-progress'
  highlights: string[]
  order: number
  createdAt: Date
  updatedAt: Date
}
```

### 5. Skills Collection
```typescript
Skill {
  _id: ObjectId
  name: string
  level: number
  category: 'programming' | 'database' | 'web' | 'backend' | 'frontend' | 'ai-ml' | 'cv' | 'development' | 'cloud' | 'devops' | 'core' | 'domain' | 'specialized' | 'engineering'
  skillGroup: 'languages' | 'frameworks' | 'tools' | 'aiMl'
  order: number
  createdAt: Date
  updatedAt: Date
}
```

### 6. Contact Messages Collection
```typescript
ContactMessage {
  _id: ObjectId
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: Date
  updatedAt: Date
}
```

## API Endpoints

### Portfolio Data Endpoints
- `GET /api/portfolio/personal` - Get personal information
- `GET /api/portfolio/education` - Get education details
- `GET /api/portfolio/experience` - Get work experience
- `GET /api/portfolio/projects` - Get all projects (with optional category filter)
- `GET /api/portfolio/projects/featured` - Get featured projects only
- `GET /api/portfolio/skills` - Get all skills grouped by category
- `GET /api/portfolio/complete` - Get all portfolio data in one request

### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all contact messages (admin)

### Admin Endpoints (Future Enhancement)
- `POST /api/admin/portfolio/seed` - Seed database with initial data
- `PUT /api/admin/portfolio/personal` - Update personal info
- `POST /api/admin/portfolio/projects` - Add new project
- `PUT /api/admin/portfolio/projects/:id` - Update project
- `DELETE /api/admin/portfolio/projects/:id` - Delete project

## Frontend Integration Changes

### Files to Modify:
1. **Remove mock.js** - Replace with API calls
2. **Update Hero.js** - Fetch personal info from API
3. **Update About.js** - Fetch personal info and education from API
4. **Update Experience.js** - Fetch experience data from API
5. **Update Projects.js** - Fetch projects from API with filtering
6. **Update Skills.js** - Fetch skills from API grouped by category
7. **Update Contact.js** - Submit contact form to API

### API Service Layer
Create `src/services/api.js` with:
- `getPersonalInfo()`
- `getEducation()`
- `getExperience()`
- `getProjects(category?)`
- `getFeaturedProjects()`
- `getSkills()`
- `getCompletePortfolio()`
- `submitContactForm(formData)`

## Data Migration Strategy

### 1. Database Seeding
- Create seed script to populate database with current mock data
- Ensure all data relationships and ordering are preserved
- Add proper timestamps and metadata

### 2. API Error Handling
- Implement proper error responses
- Add loading states in frontend
- Fallback mechanisms for failed API calls

### 3. Performance Optimization
- Implement caching for portfolio data
- Optimize database queries
- Add pagination for large datasets (if needed)

## Implementation Phases

### Phase 1: Backend Setup
1. Create MongoDB models
2. Implement basic CRUD endpoints
3. Create database seed script
4. Add error handling and validation

### Phase 2: Frontend Integration
1. Create API service layer
2. Replace mock data calls with API calls
3. Add loading states and error handling
4. Test all functionality

### Phase 3: Contact Form Integration
1. Implement contact form submission
2. Add email notifications (optional)
3. Create admin interface for messages

## Current Mock Data to Migrate

### From mock.js:
- Personal info (name, title, email, github, linkedin, bio)
- Education (2 entries - MS Virginia Tech, BTech K.J. Somaiya)
- Experience (3 entries - AutoUnify, Colgate-Palmolive, Virginia Tech)
- Projects (5 entries including SentiMint, LLM Defender Bot, etc.)
- Skills (4 categories: languages, frameworks, tools, aiMl)
- Testimonials (3 entries - for future enhancement)
- Achievements (3 entries - for future enhancement)

## Environment Variables Needed
- `MONGO_URL` - Already configured
- `DB_NAME` - Already configured
- `JWT_SECRET` - For future admin authentication
- `EMAIL_SERVICE_*` - For contact form notifications (optional)

This contract ensures a smooth transition from mock data to a fully functional backend while maintaining all current functionality and preparing for future enhancements.