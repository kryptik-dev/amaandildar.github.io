from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import os
import asyncio
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="кяуρтιк Portfolio API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/kryptik_portfolio")
client = AsyncIOMotorClient(MONGO_URL)
database = client.get_default_database()

# Collections
projects_collection = database.projects
research_collection = database.research
skills_collection = database.skills
experience_collection = database.experience
contact_collection = database.contact

# Pydantic models
class Project(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str
    description: str
    long_description: str
    technologies: List[str]
    status: str = "active"  # active, discontinued, coming_soon
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    category: str
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ResearchNote(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str
    content: str
    summary: str
    category: str
    tags: List[str]
    date_published: datetime
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Skill(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    category: str
    level: int  # 1-100
    icon: Optional[str] = None
    description: Optional[str] = None

class Experience(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str
    company: str
    duration: str
    description: str
    technologies: List[str]
    current: bool = False

class ContactMessage(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    replied: bool = False

# API Routes
@app.get("/")
async def root():
    return {"message": "Welcome to кяуρтιк's Portfolio API"}

@app.get("/api/projects")
async def get_projects(featured: Optional[bool] = None, category: Optional[str] = None):
    query = {}
    if featured is not None:
        query["featured"] = featured
    if category:
        query["category"] = category
    
    projects = await projects_collection.find(query).sort("created_at", -1).to_list(length=None)
    return {"projects": projects}

@app.get("/api/projects/{project_id}")
async def get_project(project_id: str):
    project = await projects_collection.find_one({"_id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.get("/api/research")
async def get_research(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    
    research = await research_collection.find(query).sort("date_published", -1).to_list(length=None)
    return {"research": research}

@app.get("/api/research/{research_id}")
async def get_research_note(research_id: str):
    research = await research_collection.find_one({"_id": research_id})
    if not research:
        raise HTTPException(status_code=404, detail="Research note not found")
    return research

@app.get("/api/skills")
async def get_skills(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    
    skills = await skills_collection.find(query).sort("level", -1).to_list(length=None)
    return {"skills": skills}

@app.get("/api/experience")
async def get_experience():
    experience = await experience_collection.find({}).sort("current", -1).to_list(length=None)
    return {"experience": experience}

@app.post("/api/contact")
async def create_contact_message(message: ContactMessage):
    result = await contact_collection.insert_one(message.dict(exclude={"id"}))
    return {"message": "Message sent successfully", "id": str(result.inserted_id)}

@app.get("/api/portfolio-stats")
async def get_portfolio_stats():
    total_projects = await projects_collection.count_documents({})
    active_projects = await projects_collection.count_documents({"status": "active"})
    total_research = await research_collection.count_documents({})
    total_skills = await skills_collection.count_documents({})
    
    return {
        "total_projects": total_projects,
        "active_projects": active_projects,
        "total_research": total_research,
        "total_skills": total_skills
    }

# Initialize database with sample data
@app.on_event("startup")
async def startup_event():
    # Insert sample data if collections are empty
    if await projects_collection.count_documents({}) == 0:
        sample_projects = [
            {
                "_id": "the360unity",
                "title": "The360Unity",
                "description": "A community for developers to share their projects and learn from each other, collaborate and grow.",
                "long_description": "The360Unity is a comprehensive platform designed to bring developers together in a collaborative environment. It features project sharing, code reviews, learning resources, and community discussions. Built with modern web technologies, it aims to foster growth and innovation in the developer community.",
                "technologies": ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
                "status": "coming_soon",
                "category": "Web Development",
                "featured": True,
                "created_at": datetime.utcnow()
            },
            {
                "_id": "jarvis",
                "title": "JARVIS",
                "description": "An AI Intelligent system inspired by Tony Stark's JARVIS with email capabilities and automation features.",
                "long_description": "JARVIS was an ambitious AI project inspired by Tony Stark's JARVIS. It featured email reading and responding capabilities, food ordering automation, and custom voice training. Due to copyright concerns from Marvel Entertainment, the project was discontinued, but the concepts and learnings continue to influence other AI work.",
                "technologies": ["Python", "AI/ML", "Automation", "Email API", "Voice Recognition"],
                "status": "discontinued",
                "category": "AI/ML",
                "featured": True,
                "created_at": datetime.utcnow()
            },
            {
                "_id": "synthora",
                "title": "Synthora",
                "description": "A white-label ChatGPT solution for customizable AI chat interfaces.",
                "long_description": "Synthora is a white-label ChatGPT solution currently in development. This project aims to provide a customizable AI chat interface that can be branded and integrated into various platforms. Built with modern web technologies and AI integration capabilities.",
                "technologies": ["Python", "Flask", "HTML/CSS", "JavaScript", "AI Integration"],
                "status": "active",
                "github_url": "https://github.com/lilpizzaro/synthora",
                "category": "AI/ML",
                "featured": True,
                "created_at": datetime.utcnow()
            }
        ]
        await projects_collection.insert_many(sample_projects)
    
    if await research_collection.count_documents({}) == 0:
        sample_research = [
            {
                "_id": "jarviss-ai-brain",
                "title": "JARVIS's AI BRAIN",
                "content": "Based on Google's Gemini FOR NOW. Plans on using custom trained models using footage and audio of the actual Iron Man's JARVIS.",
                "summary": "Exploring the development of JARVIS's AI brain using Google's Gemini with plans for custom training.",
                "category": "J.A.R.V.I.S.",
                "tags": ["AI", "Machine Learning", "Google Gemini", "Custom Training"],
                "date_published": datetime(2025, 4, 21),
                "featured": True,
                "created_at": datetime.utcnow()
            },
            {
                "_id": "jarvis-email-capability",
                "title": "Powerful Email Capability",
                "content": "JARVIS can now read emails and respond to them. He can also suggest email responses. This is a powerful tool that could change the way JARVIS can be used.",
                "summary": "JARVIS now has the ability to read and respond to emails with AI-powered suggestions.",
                "category": "J.A.R.V.I.S.",
                "tags": ["Email", "AI", "Automation", "Natural Language Processing"],
                "date_published": datetime(2025, 4, 22),
                "featured": True,
                "created_at": datetime.utcnow()
            },
            {
                "_id": "jarvis-food-ordering",
                "title": "The most powerful tool I have ever created",
                "content": "JARVIS is now able to order food from a restaurant on his own from just a single command. This takes advantage of custom training the model by capturing audio from me actually ordering food, as well as order items from Takealot. Could he potentially replace a personal assistant?",
                "summary": "JARVIS can now autonomously order food and items online through custom voice training.",
                "category": "J.A.R.V.I.S.",
                "tags": ["Voice Recognition", "Automation", "E-commerce", "AI Assistant"],
                "date_published": datetime(2025, 4, 23),
                "featured": True,
                "created_at": datetime.utcnow()
            }
        ]
        await research_collection.insert_many(sample_research)
    
    if await skills_collection.count_documents({}) == 0:
        sample_skills = [
            {"name": "Frontend Development", "category": "Development", "level": 90},
            {"name": "React/Next.js", "category": "Development", "level": 85},
            {"name": "JavaScript/TypeScript", "category": "Development", "level": 85},
            {"name": "UI/UX Design", "category": "Design", "level": 80},
            {"name": "Software Development", "category": "Development", "level": 85},
            {"name": "Python", "category": "Development", "level": 80},
            {"name": "AI/ML", "category": "AI", "level": 75},
            {"name": "Database Design", "category": "Backend", "level": 70}
        ]
        await skills_collection.insert_many(sample_skills)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)