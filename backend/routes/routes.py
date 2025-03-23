from fastapi import APIRouter, HTTPException, status, Body
from config.db import StdCollection, UniCollection, degree_collection
from models.StudModel import StudentData
from models.UniModel import UniversityData
from bson import ObjectId
from algo.algorithm2 import suggest_universities
from typing import List, Dict, Any
from models.Degree import Degree
import google.generativeai as genai
import os
import json
from pydantic import BaseModel

from schemas.user import StudInfoSerializer, StudsInfoSerializer, UniInfoSerializer, UnisInfoSerializer

class StudentRoadmapData(BaseModel):
    student_data: Dict[str, Any]

# Initialize Gemini API with your API key
# You'll need to set this environment variable or configure it properly
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
genai.configure(api_key=GEMINI_API_KEY)

router = APIRouter()

@router.get("/StudInfo")
async def getStudInfo():
    StudsInfo = StdCollection.find()
    return StudsInfoSerializer(StudsInfo)

@router.get("/StudInfo/{name}")
async def getStudInfo(name: str):
    StudInfo = StdCollection.find_one({"name": name})
    if StudInfo:
        return StudInfoSerializer(StudInfo)
    raise HTTPException(404, f"Student with name {name} not found")

# @router.get("/StudLogin")
# async def getStudId(email: str, password: str):
#     StudInfo = StdCollection.find_one({"email": email, "password": password})
#     if StudInfo:
#         stud_id = str(StudInfo["_id"])  # Save student ID to a variable
#         return {"id": stud_id}
#     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")



# Define global variables
stud_id = None
uni_id = None

@router.get("/StudLogin")
async def getStudId(email: str, password: str):
    global stud_id  # Declare as global to modify the global variable
    StudInfo = StdCollection.find_one({"email": email, "password": password})
    if StudInfo:
        stud_id = str(StudInfo["_id"])  # Save student ID to the global variable
        return {"success": True, "id": stud_id}
    return {"success": False, "message": "Invalid username or password"}

@router.get("/UniLogin")
async def getUniId(email: str, password: str):
    global uni_id  # Declare as global to modify the global variable
    UniInfo = UniCollection.find_one({"email": email, "password": password})
    if UniInfo:
        uni_id = str(UniInfo["_id"])  # Save university ID to the global variable
        return {"success": True, "id": uni_id}
    return {"success": False, "message": "Invalid username or password"}


# @router.get("/UniLogin")
# async def getUniId(email: str, password: str):
#     UniInfo = UniCollection.find_one({"email": email, "password": password})
#     if UniInfo:
#         uni_id = str(UniInfo["_id"])  # Save university ID to a variable
#         return {"id": uni_id}
#     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")

@router.get("/UniInfo")
async def getUniInfo():
    UnisInfo = UniCollection.find()
    return UnisInfoSerializer(UnisInfo)


@router.post("/StudInfoPost")
async def postStudInfo(StudInfo: StudentData):
        try:
           StdCollection.insert_one(dict(StudInfo))
        except Exception as e:
              print(e)
        

            
@router.post("/UniInfo")
async def postUniInfo(UniInfo: UniversityData):
        
        try:
           UniCollection.insert_one(dict(UniInfo))
        except Exception as e:
              print(e)

@router.get("/UniSuggestion/{name}")
async def getUniSuggestion(name: str):
    StudInfo = StdCollection.find_one({"name": name})
    if StudInfo:
        StudInfo = StudInfoSerializer(StudInfo)
        UnisInfo = UniCollection.find()
        UnisInfo = UnisInfoSerializer(UnisInfo)
        suggestions = suggest_universities(UnisInfo, StudInfo)
        return suggestions
    raise HTTPException(404, f"Student with name {name} not found")


@router.post("/generate-roadmap")
async def generate_roadmap(student_data: StudentRoadmapData):
    try:
        # Convert the student data to JSON string
        student_json = json.dumps(student_data.student_data)
        
        # Create Gemini model
        model = genai.GenerativeModel('gemini-pro')
        
        # Send prompt to Gemini API
        prompt = f"Using this data what should be the roadmap for the student. Give data in JSON format. Here's the student data: {student_json}"
        
        # Generate response
        response = model.generate_content(prompt)
        
        # Extract the JSON from the response
        # This assumes Gemini returns a valid JSON string
        try:
            # Try to parse the response text as JSON
            roadmap_data = json.loads(response.text)
            return roadmap_data
        except json.JSONDecodeError:
            # If it's not valid JSON, return the raw text
            return {"raw_response": response.text}
            
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate roadmap: {str(e)}"
        )
       
