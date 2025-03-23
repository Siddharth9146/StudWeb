from pydantic import BaseModel

class UniSignupData(BaseModel):
    name: str  # college name
    password: str