from pydantic import BaseModel, Field
from typing import List, Optional
import datetime

class University(BaseModel):
    """University Model with MongoDB"""
    name: str
    state: str
    campus_size: float  # in acres
    degrees_offered: List[str]  # List of degree names like "Computer Science", "Mechanical Engineering"
    facilities: Optional[List[str]] = None
    established_year: Optional[int] = None
    website: Optional[str] = None
    contact_email: Optional[str] = None
    created_at: Optional[datetime.datetime] = None
    updated_at: Optional[datetime.datetime] = None
    
    class Config:
        schema_extra = {
            "example": {
                "name": "Example University",
                "state": "California",
                "campus_size": 500.5,
                "degrees_offered": ["Computer Science", "Mechanical Engineering", "Business Administration"],
                "facilities": ["Library", "Sports Complex", "Labs"],
                "established_year": 1950,
                "website": "https://example-university.edu",
                "contact_email": "info@example-university.edu"
            }
        }
