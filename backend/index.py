from fastapi import FastAPI
from routes.routes import router
from routes.university_routes import router as university_router
from routes.degree_routes import router as degree_router
from routes.exam_routes import router as exam_router

app = FastAPI()

app.include_router(router)
app.include_router(university_router, prefix="/universities", tags=["Universities"])
app.include_router(degree_router, prefix="/degrees", tags=["Degrees"])
app.include_router(exam_router, prefix="/exams", tags=["Exams"])

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from config.db import conn

try:
    conn.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)



from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:5000",
    "http://localhost:5500",
    "http://127.0.0.1/",
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

