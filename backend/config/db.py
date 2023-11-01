from pymongo import MongoClient
conn = MongoClient("mongodb+srv://Sid:asN1MWaEbAVh7VHv@cluster0.kubbnwy.mongodb.net/?retryWrites=true&w=majority")
db = conn.get_database("db")
StdCollection = db.get_collection("StdCollection")
UniCollection = db.get_collection("UniCollection")



