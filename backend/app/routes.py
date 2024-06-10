import os
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from werkzeug.utils import secure_filename
from .models import db, User, Vehicle, VehicleImage, Review, Message

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
    try:
        data = request.form
        user_id = get_jwt_identity()
        
        # Create the new vehicle instance
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
        db.session.commit()  # Commit to get the new_vehicle ID
        print(f"Created vehicle with ID {new_vehicle.id}")

        # Check if images are provided in the request
        if 'images' in request.files:
            images = request.files.getlist('images')
            if not images:
                print("No images found in request.files")
            for image in images:
                print(f"Processing image {image.filename}")
                image_url = save_image(image)
                if image_url:
                    print(f"Image saved to {image_url}")
                    new_image = VehicleImage(vehicle_id=new_vehicle.id, imageurl=image_url)
                    db.session.add(new_image)
                    print(f"Queued image {image_url} for vehicle {new_vehicle.id}")
                else:
                    print(f"Failed to save image {image.filename}")
        else:
            print("No 'images' key in request.files")

        db.session.commit()  # Commit all the new images
        print(f"Images committed for vehicle with ID {new_vehicle.id}")
        return jsonify(new_vehicle.to_dict()), 201
    except Exception as e:
        print(f"Error: {str(e)}")  # Debugging statement
        db.session.rollback()
        return jsonify({'error': 'Failed to create vehicle', 'details': str(e)}), 500

def save_image(image):
    try:
        upload_dir = os.path.join(os.path.dirname(__file__), '..', 'uploads')  # Ensure this points to the 'backend/uploads' directory
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        filename = secure_filename(image.filename)
        filepath = os.path.join(upload_dir, filename)
        image.save(filepath)
        print(f"Saved image to {filepath}")  # Debug statement
        return filepath
    except Exception as e:
        print(f"Error saving image: {str(e)}")
        return None  # Return None in case of error

@routes.route('/messages', methods=['POST'])
@jwt_required()
def send_message():
    data = request.json
    sender_id = get_jwt_identity()
    new_message = Message(
        sender_id=sender_id,
        receiver_id=data['receiver_id'],
        vehicle_id=data.get('vehicle_id'),
        content=data['content']
    )
    db.session.add(new_message)
    db.session.commit()
    return jsonify(new_message.to_dict()), 201

@routes.route('/reviews', methods=['POST'])
@jwt_required()
def leave_review():
    data = request.json
    user_id = get_jwt_identity()
    new_review = Review(
        vehicle_id=data['vehicle_id'],
        user_id=user_id,
        rating=data['rating'],
        comment=data['comment']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201

@routes.route('/vehicle-makes', methods=['GET'])
def get_vehicle_makes():
    makes = [
        {'make': 'Toyota', 'models': ['Corolla', 'Camry', 'Prius']},
        {'make': 'Ford', 'models': ['Fiesta', 'Focus', 'Mustang']},
        {'make': 'Honda', 'models': ['Civic', 'Accord', 'Fit']}
    ]
    return jsonify(makes), 200

@routes.route('/my-listings', methods=['GET'])
@jwt_required()
def get_my_listings():
    user_id = get_jwt_identity()
    vehicles = Vehicle.query.filter_by(user_id=user_id).all()
    return jsonify([vehicle.to_dict() for vehicle in vehicles]), 200

