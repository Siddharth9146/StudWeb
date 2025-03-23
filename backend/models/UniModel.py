from pydantic import BaseModel
from typing import List

class UniversityData(BaseModel):
    name: str
    state: str
    nirf_ranking: int
    degrees_offered: List[str]
    campus_size: int 
    facilities_offered: List[str]
    required_12th: int
