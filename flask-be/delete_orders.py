from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb+srv://your_username:your_password@cluster0.5ejsm1x.mongodb.net/test1")
db = client["test1"]
orders_collection = db["orders"]

unique_identifier = "id"

order_ids_to_delete = [0,1]  

result = orders_collection.delete_many({unique_identifier: {"$in": order_ids_to_delete}})

print(f"Number of documents deleted: {result.deleted_count}")