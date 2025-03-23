from pydantic import BaseModel
from typing import List

class StudentData(BaseModel):
    name: str
    phone: str
    email: str
    tenth_grade: int
    twelfth_grade: int
    exam_score: int
    exam_name: str
    state: str
    preferred_degrees: List[str]
    preferred_facilities: List[str]
    password: str


