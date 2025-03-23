from pydantic import BaseModel, EmailStr

class SignupData(BaseModel):
    name: str
    email: str
    password: str 