from . import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    fullname = db.Column(db.String(120), nullable=True)
    phonenumber = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(200), nullable=True)
    profilepicture = db.Column(db.String(200), nullable=True)
    datejoined = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'fullname': self.fullname,
            'phonenumber': self.phonenumber,
            'address': self.address,
            'profilepicture': self.profilepicture,
            'datejoined': self.datejoined
        }

class Vehicle(db.Model):
    __tablename__ = 'vehicles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    make = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    mileage = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    power = db.Column(db.Integer, nullable=False)
    fueltype = db.Column(db.String(50), nullable=False)
    transmission = db.Column(db.String(50), nullable=False)
    vehicletype = db.Column(db.String(50), nullable=False)
    bodymodel = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    dateposted = db.Column(db.DateTime, default=db.func.current_timestamp())

    images = db.relationship('VehicleImage', backref='vehicle', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'make': self.make,
            'model': self.model,
            'year': self.year,
            'mileage': self.mileage,
            'price': self.price,
            'power': self.power,
            'fueltype': self.fueltype,
            'transmission': self.transmission,
            'vehicletype': self.vehicletype,
            'bodymodel': self.bodymodel,
            'location': self.location,
            'description': self.description,
            'dateposted': self.dateposted,
            'images': [image.to_dict() for image in self.images]
        }

class VehicleImage(db.Model):
    __tablename__ = 'vehicle_images'
    id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'), nullable=False)
    imageurl = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'vehicle_id': self.vehicle_id,
            'imageurl': self.imageurl
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    dateposted = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'vehicle_id': self.vehicle_id,
            'user_id': self.user_id,
            'rating': self.rating,
            'comment': self.comment,
            'dateposted': self.dateposted
        }

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'), nullable=True)
    content = db.Column(db.Text, nullable=False)
    datesent = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'vehicle_id': self.vehicle_id,
            'content': self.content,
            'datesent': self.datesent
        }

class SearchHistory(db.Model):
    __tablename__ = 'search_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    searchcriteria = db.Column(db.Text, nullable=False)
    datesearched = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'searchcriteria': self.searchcriteria,
            'datesearched': self.datesearched
        }

class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    isread = db.Column(db.Boolean, default=False)
    datesent = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'message': self.message,
            'isread': self.isread,
            'datesent': self.datesent
        }
