from pydantic import BaseModel, Field
from typing import Dict, List, Optional
import datetime

class Degree(BaseModel):
    """Degree Model with MongoDB"""
    name: str  # Degree name like "Computer Science"
    level: str  # e.g., Bachelor's, Master's, PhD
    duration: int  # in years
    department: str
    university_id: str  # Reference to the university offering this degree
    exam_cutoffs: Dict[str, int]  # {"exam_id": minimum_score}
    description: Optional[str] = None
    eligibility: Optional[str] = None
    career_prospects: Optional[List[str]] = None
    created_at: Optional[datetime.datetime] = None
    updated_at: Optional[datetime.datetime] = None
    
    class Config:
        schema_extra = {
            "example": {
                "name": "Computer Science",
                "level": "Bachelor's",
                "duration": 4,
                "department": "Engineering",
                "university_id": "60d5ec9af3a8a8a0b8b7b9b9",
                "exam_cutoffs": {"JEE": 85, "SAT": 1400},
                "description": "A comprehensive program covering software and hardware aspects of computing",
                "eligibility": "12th grade with Mathematics as a subject",
                "career_prospects": ["Software Engineer", "Data Scientist", "System Analyst"]
            }
        }
