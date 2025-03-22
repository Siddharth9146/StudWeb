from fastapi import FastAPI
from routes.routes import router

app = FastAPI()

app.include_router(router)

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
    "http://127.0.0.1/"
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

