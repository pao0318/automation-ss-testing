from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
import base64
import os
from PIL import Image
import numpy as np
import time

# import cv2


app = Flask(__name__)
CORS(app)

# # Pixel Matching Function
# def pixelmatch(image1, image2):
#     # Convert images to grayscale
#     gray1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
#     gray2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)

#     # Compute absolute difference
#     diff = cv2.absdiff(gray1, gray2)

#     # Threshold the difference image
#     _, thresholded = cv2.threshold(diff, 30, 255, cv2.THRESH_BINARY)

#     # Count non-zero pixels (differences)
#     num_diff_pixels = np.count_nonzero(thresholded)

#     # Calculate percentage difference
#     height, width = thresholded.shape
#     total_pixels = height * width
#     percentage_diff = (num_diff_pixels / total_pixels) * 100

#     return percentage_diff

# MongoDB Connection
client = MongoClient("mongodb+srv://pao0318:Nitrkl%402019@cluster0.5ejsm1x.mongodb.net/?retryWrites=true&w=majority")
db = client["your_database_name"]  # Replace with your actual database name
users_collection = db["users"]

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

@app.route('/api/save-screenshot', methods=['POST'])
def save_screenshot():
    try:
        data_url = request.json.get('dataUrl')
        base64_data = data_url.split(',')[1]
        binary_data = base64.b64decode(base64_data)
        fileName = f'screenshot_{int(time.time())}.png'
        file_path = os.path.join(os.path.dirname(__file__),  '..', 'FE', 'public', 'screenshots', 'Login', fileName)

        with open(file_path, 'wb') as file:
            file.write(binary_data)

        print('Screenshot saved:', file_path)
        return jsonify({'message': 'Screenshot saved on the server.'}), 200

    except Exception as e:
        print('Error saving screenshot:', str(e))
        return jsonify({'error': 'Internal server error'}), 500

# @app.route('/api/compare-images', methods=['POST'])
# def compare_images():
#     try:
#         img1_base64 = request.json.get('img1')
#         img2_base64 = request.json.get('img2')

#         img1_binary = base64.b64decode(img1_base64)
#         img2_binary = base64.b64decode(img2_base64)

#         img1 = cv2.imdecode(np.frombuffer(img1_binary, np.uint8), cv2.IMREAD_COLOR)
#         img2 = cv2.imdecode(np.frombuffer(img2_binary, np.uint8), cv2.IMREAD_COLOR)

#         # Ensure images have the same dimensions
#         if img1.shape[:2] != img2.shape[:2]:
#             return jsonify({'error': 'Images must have the same dimensions for comparison.'}), 400

#         # Calculate percentage difference
#         percentage_difference = pixelmatch(img1, img2)

#         return jsonify({'similarity': 100 - percentage_difference}), 200

#     except Exception as e:
#         print('Error comparing images:', str(e))
#         return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    app.run(port=8080)
