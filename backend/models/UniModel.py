from pydantic import BaseModel  

class UniversityData(BaseModel):
    name: str
    location: str
    qs_ranking: int
    nirf_ranking: int
    degrees_best: str