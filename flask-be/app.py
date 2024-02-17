from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient("mongodb+srv://pao0318:Nitrkl%402019@cluster0.5ejsm1x.mongodb.net/?retryWrites=true&w=majority")
db = client["test1"] 
users_collection = db["users"]
orders_collection = db["orders"] 

# Routes
@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Please enter a valid username and password.'}), 400

        existing_user = users_collection.find_one({'username': username})
        if existing_user:
            return jsonify({'error': 'Username already exists. Choose a different username.'}), 400

        new_user = {'username': username, 'password': password}
        users_collection.insert_one(new_user)

        return jsonify({'message': 'User created successfully!'}), 201

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        existing_user = users_collection.find_one({'username': username, 'password': password})

        if existing_user:
            return jsonify({'message': 'Login successful!'}), 200
        else:
            return jsonify({'error': 'Invalid username or password.'}), 401

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        # Fetch all orders from the orders collection
        orders = list(orders_collection.find({}, {'_id': 0}))
        return jsonify({'orders': orders}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    app.run(port=8080, debug=True)
