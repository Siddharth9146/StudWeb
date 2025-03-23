from fastapi import APIRouter, HTTPException, Body
from fastapi.encoders import jsonable_encoder
from typing import List
import datetime

from models.Exam import Exam
from config.db import exam_collection

router = APIRouter()

@router.post("/", response_model=Exam)
async def create_exam(exam: Exam = Body(...)):
    exam = jsonable_encoder(exam)
    exam["created_at"] = datetime.datetime.now()
    exam["updated_at"] = exam["created_at"]
    new_exam = exam_collection.insert_one(exam)
    created_exam = exam_collection.find_one({"_id": new_exam.inserted_id})
    return created_exam

@router.get("/", response_model=List[Exam])
async def list_exams():
    exams = list(exam_collection.find())
    return exams

@router.get("/names", response_model=List[str])
async def get_exam_names():
    exams = exam_collection.find({}, {"_id": 0, "name": 1})
    exam_names = [exam["name"] for exam in exams if "name" in exam]
    return exam_names


@router.get("/{id}", response_model=Exam)
async def get_exam(id: str):
    exam = exam_collection.find_one({"_id": id})
    if exam is not None:
        return exam
    raise HTTPException(status_code=404, detail=f"Exam with ID {id} not found")

@router.get("/level/{level}", response_model=List[Exam])
async def get_exams_by_level(level: str):
    exams = list(exam_collection.find({"level": level}))
    return exams

@router.get("/degree/{degree_type}", response_model=List[Exam])
async def get_exams_by_degree_type(degree_type: str):
    exams = list(exam_collection.find({"applicable_degrees": degree_type}))
    return exams

@router.put("/{id}", response_model=Exam)
async def update_exam(id: str, exam: Exam = Body(...)):
    exam = {k: v for k, v in exam.dict().items() if v is not None}
    exam["updated_at"] = datetime.datetime.now()
    
    if len(exam) >= 1:
        update_result = exam_collection.update_one({"_id": id}, {"$set": exam})
        
        if update_result.modified_count == 1:
            updated_exam = exam_collection.find_one({"_id": id})
            if updated_exam is not None:
                return updated_exam
    
    existing_exam = exam_collection.find_one({"_id": id})
    if existing_exam is not None:
        return existing_exam
    
    raise HTTPException(status_code=404, detail=f"Exam with ID {id} not found")

@router.delete("/{id}", response_model=Exam)
async def delete_exam(id: str):
    deleted_exam = exam_collection.find_one({"_id": id})
    if deleted_exam:
        exam_collection.delete_one({"_id": id})
        return deleted_exam
    raise HTTPException(status_code=404, detail=f"Exam with ID {id} not found")
