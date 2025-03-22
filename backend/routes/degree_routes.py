from fastapi import APIRouter, HTTPException, Body
from fastapi.encoders import jsonable_encoder
from typing import List
import datetime

from models.Degree import Degree
from config.db import degree_collection

router = APIRouter()

@router.post("/", response_model=Degree)
async def create_degree(degree: Degree = Body(...)):
    degree = jsonable_encoder(degree)
    degree["created_at"] = datetime.datetime.now()
    degree["updated_at"] = degree["created_at"]
    new_degree = degree_collection.insert_one(degree)
    created_degree = degree_collection.find_one({"_id": new_degree.inserted_id})
    return created_degree

@router.get("/", response_model=List[Degree])
async def list_degrees():
    degrees = list(degree_collection.find())
    return degrees

@router.get("/{id}", response_model=Degree)
async def get_degree(id: str):
    degree = degree_collection.find_one({"_id": id})
    if degree is not None:
        return degree
    raise HTTPException(status_code=404, detail=f"Degree with ID {id} not found")

@router.get("/department/{department}", response_model=List[Degree])
async def get_degrees_by_department(department: str):
    degrees = list(degree_collection.find({"department": department}))
    return degrees

@router.get("/level/{level}", response_model=List[Degree])
async def get_degrees_by_level(level: str):
    degrees = list(degree_collection.find({"level": level}))
    return degrees

@router.get("/university/{university_id}", response_model=List[Degree])
async def get_degrees_by_university(university_id: str):
    degrees = list(degree_collection.find({"university_id": university_id}))
    return degrees

@router.put("/{id}", response_model=Degree)
async def update_degree(id: str, degree: Degree = Body(...)):
    degree = {k: v for k, v in degree.dict().items() if v is not None}
    degree["updated_at"] = datetime.datetime.now()
    
    if len(degree) >= 1:
        update_result = degree_collection.update_one({"_id": id}, {"$set": degree})
        
        if update_result.modified_count == 1:
            updated_degree = degree_collection.find_one({"_id": id})
            if updated_degree is not None:
                return updated_degree
    
    existing_degree = degree_collection.find_one({"_id": id})
    if existing_degree is not None:
        return existing_degree
    
    raise HTTPException(status_code=404, detail=f"Degree with ID {id} not found")

@router.delete("/{id}", response_model=Degree)
async def delete_degree(id: str):
    deleted_degree = degree_collection.find_one({"_id": id})
    if deleted_degree:
        degree_collection.delete_one({"_id": id})
        return deleted_degree
    raise HTTPException(status_code=404, detail=f"Degree with ID {id} not found")
