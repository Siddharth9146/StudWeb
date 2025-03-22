from pymongo import MongoClient
conn = MongoClient("mongodb+srv://Sid:asN1MWaEbAVh7VHv@cluster0.kubbnwy.mongodb.net/?retryWrites=true&w=majority")
db = conn.get_database("db")

# Original collections
StdCollection = db.get_collection("StdCollection")
UniCollection = db.get_collection("UniCollection")

# New collections
university_collection = db.get_collection("universities")
degree_collection = db.get_collection("degrees")
exam_collection = db.get_collection("exams")

