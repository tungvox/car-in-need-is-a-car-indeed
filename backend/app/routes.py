from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from .models import db, User, Vehicle, VehicleImage, Review, Message
from werkzeug.utils import secure_filename
import os

routes = Blueprint('routes', __name__)

@routes.route('/signup', methods=['POST'])
def signup():
    data = request.json
    try:
        if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'User already exists'}), 409

        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        new_user = User(username=data['username'], email=data['email'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        response = jsonify({'token': access_token, 'user': user.to_dict()})
        set_access_cookies(response, access_token)
        return response, 200
    return jsonify({'error': 'Invalid credentials'}), 401

@routes.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response, 200

@routes.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.to_dict()), 200

@routes.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([vehicle.to_dict() for vehicle in vehicles]), 200

from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from .models import db, User, Vehicle

routes = Blueprint('routes', __name__)

@routes.route('/signup', methods=['POST'])
def signup():
    data = request.json
    try:
        if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'User already exists'}), 409

        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        new_user = User(username=data['username'], email=data['email'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        response = jsonify({'token': access_token, 'user': user.to_dict()})
        set_access_cookies(response, access_token)
        return response, 200
    return jsonify({'error': 'Invalid credentials'}), 401

@routes.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response, 200

@routes.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.to_dict()), 200

@routes.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([vehicle.to_dict() for vehicle in vehicles]), 200

@routes.route('/vehicle', methods=['POST'])
@jwt_required()
def create_vehicle():
    data = request.form
    user_id = get_jwt_identity()
    new_vehicle = Vehicle(
        user_id=user_id,
        make=data['make'],
        model=data['model'],
        year=data['year'],
        mileage=data['mileage'],
        price=data['price'],
        power=data['power'],
        fueltype=data['fueltype'],
        transmission=data['transmission'],
        vehicletype=data['vehicletype'],
        bodymodel=data['bodymodel'],
        location=data['location'],
        description=data['description']
    )
    db.session.add(new_vehicle)
    db.session.commit()

    # Handle image upload
    if 'images' in request.files:
        for image in request.files.getlist('images'):
            image_url = save_image(image)  # Implement this function to save the image and return its URL
            new_image = VehicleImage(vehicle_id=new_vehicle.id, imageurl=image_url)
            db.session.add(new_image)
    
    db.session.commit()
    return jsonify(new_vehicle.to_dict()), 201

def save_image(image):
    filename = secure_filename(image.filename)
    filepath = os.path.join('uploads', filename)  # Ensure this directory exists
    image.save(filepath)
    return filepath  # Return the path or URL to the saved image


