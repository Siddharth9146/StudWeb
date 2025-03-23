from fastapi import APIRouter, HTTPException, status, Body
from config.db import StdCollection, UniCollection, degree_collection
from models.StudModel import StudentData
from models.UniModel import UniversityData
from models.SignupModel import SignupData
from models.UniSignupModel import UniSignupData
from bson import ObjectId
from algo.algorithm2 import suggest_universities
from typing import List, Dict, Any
from models.Degree import Degree
from pydantic import BaseModel

from schemas.user import StudInfoSerializer, StudsInfoSerializer, UniInfoSerializer, UnisInfoSerializer

class StudentRoadmapData(BaseModel):
    student_data: Dict[str, Any]

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
async def getUniId(name: str, password: str):
    global uni_id  # Declare as global to modify the global variable
    UniInfo = UniCollection.find_one({"name": name, "password": password})
    if UniInfo:
        uni_id = str(UniInfo["_id"])  # Save university ID to the global variable
        return {"success": True, "id": uni_id}
    return {"success": False, "message": "Invalid college name or password"}

@router.get("/UniInfo")
async def getUniInfo():
    UnisInfo = UniCollection.find()
    return UnisInfoSerializer(UnisInfo)

@router.post("/StudInfoPost")
async def postStudInfo(StudInfo: StudentData):
    try:
        StdCollection.insert_one(dict(StudInfo))
        return {"success": True, "message": "Profile created successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create profile"
        )

@router.post("/UniInfo")
async def postUniInfo(UniInfo: UniversityData):
    try:
        UniCollection.insert_one(dict(UniInfo))
        return {"success": True, "message": "University info added successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to add university info"
        )

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

@router.post("/StudSignup")
async def signup_student(signup_data: SignupData):
    try:
        # Check if email already exists
        existing_user = StdCollection.find_one({"email": signup_data.email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Create initial student document with minimal info
        student_data = {
            "name": signup_data.name,
            "email": signup_data.email,
            "password": signup_data.password,
            # Default values for required fields
            "phone": "",
            "tenth_grade": 0,
            "twelfth_grade": 0,
            "state": "",
            "preferred_degree": ""
        }

        result = StdCollection.insert_one(student_data)
        return {
            "success": True,
            "id": str(result.inserted_id),
            "message": "Account created successfully"
        }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create account"
        )

@router.post("/UniSignup")
async def signup_university(signup_data: UniSignupData):
    try:
        # Check if college name already exists
        existing_uni = UniCollection.find_one({"name": signup_data.name})
        if existing_uni:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="College name already registered"
            )

        # Create initial university document with minimal info
        uni_data = {
            "name": signup_data.name,
            "password": signup_data.password,
            "state": "",
            # Default values for required fields
            "nirf_ranking": 0,
            "degrees_best": "",
            "campus_size": 0,
            "facilities_score": 0,
            "required_12th": 0
        }

        result = UniCollection.insert_one(uni_data)
        return {
            "success": True,
            "id": str(result.inserted_id),
            "message": "University account created successfully"
        }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create university account"
        )

# Optional: Only import and use if GEMINI_API_KEY is set
try:
    import google.generativeai as genai
    import os
    import json
    
    GEMINI_API_KEY="AIzaSyAR_tkg_U2qtUhsPaYUN0AqnSGRVcPojxY"

    genai.configure(api_key=GEMINI_API_KEY)

    @router.post("/generate-roadmap")
    async def generate_roadmap(student_data: StudentRoadmapData):
        try:
            student_json = json.dumps(student_data.student_data)
            model = genai.GenerativeModel('gemini-2.0-flash')
            prompt = f"Using this data what should be the roadmap for the student. Give data in JSON format. Here's the student data: {student_json}"
            response = model.generate_content(prompt)
            
            try:
                roadmap_data = json.loads(response.text)
                return roadmap_data
            except json.JSONDecodeError:
                return {"raw_response": response.text}
                
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to generate roadmap: {str(e)}"
            )
except ImportError:
    # If google.generativeai is not available, provide a dummy endpoint
    @router.post("/generate-roadmap")
    async def generate_roadmap(student_data: StudentRoadmapData):
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Roadmap generation is not available. Please configure GEMINI_API_KEY."
        )
       
