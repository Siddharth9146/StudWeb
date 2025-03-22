from pydantic import BaseModel, Field
from typing import List, Optional
import datetime

class Exam(BaseModel):
    """Exam Model with MongoDB"""
    name: str

    class Config:
        schema_extra = {
            "example": {
                "name": "JEE Main"
            }
        }
