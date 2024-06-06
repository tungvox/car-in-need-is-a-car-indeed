from flask import Blueprint, request, jsonify
from .models import db, User, Vehicle

routes = Blueprint('routes', __name__)

@routes.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@routes.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([vehicle.to_dict() for vehicle in vehicles])

@routes.route('/user', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(
        username=data['username'], 
        email=data['email'], 
        password=data['password']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict())

@routes.route('/vehicle', methods=['POST'])
def create_vehicle():
    data = request.json
    new_vehicle = Vehicle(
        user_id=data['user_id'], 
        make=data['make'], 
        model=data['model'], 
        year=data['year'], 
        mileage=data['mileage'], 
        price=data['price'], 
        power=data['power'], 
        fueltype=data['fueltype'], 
        location=data['location'], 
        description=data['description']
    )
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify(new_vehicle.to_dict())
