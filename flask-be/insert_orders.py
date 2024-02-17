# insert_orders.py

from pymongo import MongoClient

client = MongoClient("mongodb+srv://pao0318:Nitrkl%402019@cluster0.5ejsm1x.mongodb.net/?retryWrites=true&w=majority")
db = client["test1"]
orders_collection = db["orders"]

# Sample orders data
orders_data = [
  {
    "id": 7,
    "image": "url/to/product-image7.jpg",
    "reviewStars": 4,
    "description": "Product G - Amet consectetur adipiscing elit.",
    "status": "Delivered",
    "orderNumber": "ORD345612"
  },
  {
    "id": 8,
    "image": "url/to/product-image8.jpg",
    "reviewStars": 5,
    "description": "Product H - Tempor incididunt ut labore et dolore.",
    "status": "In Progress",
    "orderNumber": "ORD789034"
  },
  {
    "id": 9,
    "image": "url/to/product-image9.jpg",
    "reviewStars": 3,
    "description": "Product I - Magna aliqua. Ut enim ad minim veniam.",
    "status": "Cancelled",
    "orderNumber": "ORD123456"
  },
  {
    "id": 10,
    "image": "url/to/product-image10.jpg",
    "reviewStars": 2,
    "description": "Product J - Duis aute irure dolor in reprehenderit.",
    "status": "PickupComplete",
    "orderNumber": "ORD567890"
  },
  {
    "id": 11,
    "image": "url/to/product-image11.jpg",
    "reviewStars": 1,
    "description": "Product K - Excepteur sint occaecat cupidatat non proident.",
    "status": "Delayed",
    "orderNumber": "ORD234567"
  },
  {
    "id": 12,
    "image": "url/to/product-image12.jpg",
    "reviewStars": 5,
    "description": "Product L - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "status": "Delivered",
    "orderNumber": "ORD890123"
  },
  {
    "id": 13,
    "image": "url/to/product-image13.jpg",
    "reviewStars": 3,
    "description": "Product M - Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "status": "In Progress",
    "orderNumber": "ORD456789"
  },
  {
    "id": 14,
    "image": "url/to/product-image14.jpg",
    "reviewStars": 0,
    "description": "Product N - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "status": "Cancelled",
    "orderNumber": "ORD012345"
  },
  {
    "id": 15,
    "image": "url/to/product-image15.jpg",
    "reviewStars": 4,
    "description": "Product O - Nisi ut aliquip ex ea commodo consequat.",
    "status": "PickupComplete",
    "orderNumber": "ORD678901"
  },
  {
    "id": 16,
    "image": "url/to/product-image16.jpg",
    "reviewStars": 2,
    "description": "Product P - Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "status": "Returned",
    "orderNumber": "ORD234567"
  },
  {
    "id": 17,
    "image": "url/to/product-image17.jpg",
    "reviewStars": 1,
    "description": "Product Q - Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "status": "Delayed",
    "orderNumber": "ORD890123"
  },
  {
    "id": 18,
    "image": "url/to/product-image18.jpg",
    "reviewStars": 5,
    "description": "Product R - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "status": "Delivered",
    "orderNumber": "ORD456789"
  },
  {
    "id": 19,
    "image": "url/to/product-image19.jpg",
    "reviewStars": 3,
    "description": "Product S - Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "status": "In Progress",
    "orderNumber": "ORD012345"
  },
  {
    "id": 20,
    "image": "url/to/product-image20.jpg",
    "reviewStars": 0,
    "description": "Product T - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "status": "Cancelled",
    "orderNumber": "ORD678901"
  }
]


# Insert orders into the orders collection
orders_collection.insert_many(orders_data)
print("Orders inserted successfully.")
