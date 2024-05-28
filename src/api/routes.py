"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Roles, People, Planets, Starships, Likes
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()
    user = User.query.filter_by(user_name=body['user_name']).first()

    if user != None:
        return jsonify({"msg": "Username already in use"}), 400

    if user is None:
        password_hash = current_app.bcrypt.generate_password_hash(body['password']).decode('utf-8')
        new_user = User(
            user_name = body['user_name'],
            password = password_hash,
            role = 'user',
            is_active = True
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "User created"}), 201
    
@api.route('/login', methods=['POST'])
def login():
    user_name = request.json.get('user_name', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(user_name=user_name).first()

    if user is None:
        return jsonify({"msg": "Username not found"}), 401
    
    decrypted_password = current_app.bcrypt.check_password_hash(user.password, password)

    if user_name != user.user_name or decrypted_password is False:
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity=user_name)
    return jsonify(user=user.serialize(), access_token=access_token), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def get_in_profile():
    user_name = get_jwt_identity()
    user = User.query.filter_by(user_name=user_name).first()

    response_body = {
        "msg": "Username found",
        "User": user.serialize()
    }

    return jsonify(response_body), 200

@api.route('/people', methods=['POST'])
@jwt_required()
def create_person():
    user_name = get_jwt_identity()
    user = User.query.filter_by(user_name=user_name).first()
    body = request.get_json()
    person = People.query.filter_by(name=body['name']).first()

    if user is None:
        return jsonify({"msg": "User not found"}), 404
    
    if person is not None:
        return jsonify({"msg": "Person already in system"}), 401

    if user.role == Roles.admin:
        new_person = People()
        for key, value in body.items():
            if value is None:
                value = 'n/a'                
            setattr(new_person, key, value)

        non_nullable_fields = [
            'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'
        ]
        for field in non_nullable_fields:
            if getattr(new_person, field) is None:
                setattr(new_person, field, 'n/a')


        db.session.add(new_person)
        db.session.commit()                    

        return jsonify({"msg": "Person created"}), 201
    
    else:
        return jsonify({"msg": "Not allowed"}), 403
    
@api.route('/planets', methods=['POST'])
@jwt_required()
def create_planet():
    user_name = get_jwt_identity()
    user = User.query.filter_by(user_name=user_name).first()
    body = request.get_json()
    planet = Planets.query.filter_by(name=body['name']).first()

    if user is None:
        return jsonify({"msg": "User not found"}), 404
    
    if planet is not None:
        return jsonify({"msg": "Planet already in system"}), 401
    
    if user.role == Roles.admin:
        new_planet = Planets()
        for key, value in body.items():
            if value is None:
                value = 'n/a'
            setattr(new_planet, key, value)

        non_nullable_fields = [
            'name', 'rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'population'
        ]

        for field in non_nullable_fields:
            if getattr(new_planet, field) is None:
                setattr(new_planet, field, 'n/a')

        db.session.add(new_planet)
        db.session.commit()
    
        return jsonify({"msg": "Planet created"}), 201
    else:
        return jsonify({"msg": "Not allowed"}), 403

@api.route('/starships', methods=['POST'])
@jwt_required()
def create_starship():
    user_name = get_jwt_identity()
    user = User.query.filter_by(user_name=user_name).first()
    body = request.get_json()
    starship = Starships.query.filter_by(name=body['name']).first()

    if user is None:
        return jsonify({"msg": "User not found"}), 404
    
    if starship is not None: 
        return jsonify({"msg": "Starship already in system"}), 401
    
    if user.role == Roles.admin:
        new_starship = Starships()
        for key, value in body.items():
            if value is None:
                value = 'n/a'
            setattr(new_starship, key, value)

        non_nullable_fields = [
            'name', 'model', 'manufacturer', 'cost_in_credits', 'length', 'max_atmosphering_speed', 'crew', 
            'passengers', 'cargo_capacity', 'consumables', 'hyperdrive_rating', 'MGLT', 'starship_class'
        ]

        for field in non_nullable_fields:
            if getattr(new_starship, field) is None:
                setattr(new_starship, field, 'n/a')

        db.session.add(new_starship)
        db.session.commit()

        return jsonify({"msg": "Starship created"}), 201
    
    else:
        return jsonify({"msg": "Not allowed"}), 403

@api.route('/people', methods=['GET'])
def get_all_people():
    people = People.query.all()
    result = list(map(lambda person: person.serialize() ,people))

    return jsonify(result), 200

@api.route('/people/<person_id>', methods=['GET'])
def get_person(person_id):
    person = People.query.filter_by(id=person_id).first()

    return jsonify(person.serialize()), 200

@api.route('/planets', methods=['GET'])
def get_all_planets():
    planets = Planets.query.all()
    result = list(map(lambda planet: planet.serialize(), planets))

    return jsonify(result), 200

@api.route('/planets/<planet_id>', methods=['GET'])
def get_planet(planet_id):
    planet = Planets.query.filter_by(id=planet_id).first()

    return jsonify(planet.serialize()), 200

@api.route('/starships', methods=['GET'])
def get_all_starships():
    starships = Starships.query.all()
    result = list(map(lambda starship: starship.serialize(), starships))

    return jsonify(result), 200

@api.route('/starships/<starship_id>', methods=['GET'])
def get_starship(starship_id):
    starship = Starships.query.filter_by(id=starship_id).first()

    return jsonify(starship.serialize()), 200

@api.route('/likes', methods=['POST'])
@jwt_required()
def like_item():
    user_name = get_jwt_identity()   

    user = User.query.filter_by(user_name=user_name).first()
    if user is None:
        return jsonify({"msg": "User not found"}), 404

    body = request.get_json()
    if 'type' not in body or 'id' not in body:
        return jsonify({"msg": "Missing type or id"}), 401
    
    like_type = body['type']
    like_id = body['id']

    valid_types = {'person', 'planet', 'starship'}
    if like_type not in valid_types:
        return jsonify({"msg": "Invalid type"}), 400
    
    if like_type == 'person':
        like = Likes.query.filter_by(user_id=user.id, person_id=like_id).first()
    elif like_type == 'planet':
        like = Likes.query.filter_by(user_id=user.id, planet_id=like_id).first()
    elif like_type == 'starship':
        like = Likes.query.filter_by(user_id=user.id, starship_id=like_id).first()

    if like:
        db.session.delete(like)
        db.session.commit()
        return jsonify({"msg": "Like removed"}), 200
    
    else:
        if like_type == 'person':
            new_like = Likes(user_id=user.id, person_id=like_id)
        elif like_type == 'planet':
            new_like = Likes(user_id=user.id, planet_id=like_id)
        elif like_type == 'starship':
            new_like = Likes(user_id=user.id, starship_id=like_id)

        db.session.add(new_like)
        db.session.commit()
        return jsonify({"msg": "Like added"}), 201
    
@api.route('/user/likes', methods=['GET'])
@jwt_required()
def get_likes():
    user_name = get_jwt_identity()
    user = User.query.filter_by(user_name=user_name).first()

    if user is None:
        return jsonify({"msg": "User not found"}), 404
    
    likes = Likes.query.filter_by(user_id=user.id).all()
    result = list(map(lambda like: like.serialize(), likes))

    return jsonify(result), 200