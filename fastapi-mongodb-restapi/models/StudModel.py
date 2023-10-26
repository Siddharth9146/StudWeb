from pydantic import BaseModel  

class StudentData(BaseModel):
    name: str
    tenth_grade: int
    twelfth_grade: int
    location: str

