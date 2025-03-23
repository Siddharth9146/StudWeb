from fastapi import APIRouter, HTTPException, Body
from fastapi.encoders import jsonable_encoder
from typing import List
import datetime

from models.University import University
from config.db import university_collection

router = APIRouter()

@router.post("/", response_model=University)
async def create_university(university: University = Body(...)):
    university = jsonable_encoder(university)
    university["created_at"] = datetime.datetime.now()
    university["updated_at"] = university["created_at"]
    new_university = university_collection.insert_one(university)
    created_university = university_collection.find_one({"_id": new_university.inserted_id})
    return created_university

@router.get("/", response_model=List[University])
async def list_universities():
    universities = list(university_collection.find())
    return universities

@router.get("/{id}", response_model=University)
async def get_university(id: str):
    university = university_collection.find_one({"_id": id})
    if university is not None:
        return university
    raise HTTPException(status_code=404, detail=f"University with ID {id} not found")

@router.get("/state/{state}", response_model=List[University])
async def get_universities_by_state(state: str):
    universities = list(university_collection.find({"state": state}))
    return universities

@router.get("/degree/{degree}", response_model=List[University])
async def get_universities_by_degree(degree: str):
    universities = list(university_collection.find({"degrees_offered": degree}))
    return universities

@router.put("/{id}", response_model=University)
async def update_university(id: str, university: University = Body(...)):
    university = {k: v for k, v in university.dict().items() if v is not None}
    university["updated_at"] = datetime.datetime.now()
    
    if len(university) >= 1:
        update_result = university_collection.update_one({"_id": id}, {"$set": university})
        
        if update_result.modified_count == 1:
            updated_university = university_collection.find_one({"_id": id})
            if updated_university is not None:
                return updated_university
    
    existing_university = university_collection.find_one({"_id": id})
    if existing_university is not None:
        return existing_university
    
    raise HTTPException(status_code=404, detail=f"University with ID {id} not found")

@router.delete("/{id}", response_model=University)
async def delete_university(id: str):
    deleted_university = university_collection.find_one({"_id": id})
    if deleted_university:
        university_collection.delete_one({"_id": id})
        return deleted_university
    raise HTTPException(status_code=404, detail=f"University with ID {id} not found")

