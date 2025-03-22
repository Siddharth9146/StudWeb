from pydantic import BaseModel  

class StudentData(BaseModel):
    name: str
    phone: str
    email: str
    tenth_grade: int
    twelfth_grade: int
    state: str
    preferred_degree: str
    password: str


