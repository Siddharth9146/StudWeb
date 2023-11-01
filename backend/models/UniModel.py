from pydantic import BaseModel  

class UniversityData(BaseModel):
    name: str
    state: str
    nirf_ranking: int
    degrees_best: str
    campus_size: int 
    facilities_score: int
    required_12th : int
