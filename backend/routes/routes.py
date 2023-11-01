from fastapi import APIRouter, HTTPException, status
from config.db import StdCollection, UniCollection
from models.StudModel import StudentData
from models.UniModel import UniversityData
from bson import ObjectId



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
        
       
