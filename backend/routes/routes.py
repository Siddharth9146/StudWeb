from fastapi import APIRouter, HTTPException, status
from config.db import StdCollection, UniCollection, degree_collection
from models.StudModel import StudentData
from models.UniModel import UniversityData
from bson import ObjectId
from algo.algorithm2 import suggest_universities
from typing import List
from models.Degree import Degree

from schemas.user import StudInfoSerializer, StudsInfoSerializer, UniInfoSerializer, UnisInfoSerializer

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
    
        
       
