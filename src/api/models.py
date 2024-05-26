from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class Roles(enum.Enum):
    user = 'user'
    admin = 'admin'

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    role = db.Column(db.Enum(Roles), unique=False, nullable=False)
    # likes = db.relationship('Likes', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.user_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "role": self.role.name
        }
    
class People(db.Model):
    __tablename__ = 'people'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    heigth	= db.Column(db.Integer, unique=False, nullable=False)
    mass = db.Column(db.Integer, unique=False, nullable=False)
    hair_color = db.Column(db.String(40), unique=False, nullable=False)
    skin_color = db.Column(db.String(40), unique=False, nullable=False)
    eye_color = db.Column(db.String(40), unique=False, nullable=False)
    birth_year = db.Column(db.String(20), unique=False, nullable=False)
    gender = db.Column(db.String(10), unique=False, nullable=False)
    likes = db.relationship('Likes', backref='people', lazy=True)

    def __repr__(self):
        return f'<People {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "heigth": self.heigth,
            "mass": self.mass,
            "hair_color": self.hair_color,
            "skin_color": self.skin_color,
            "eye_color": self.eye_color,
            "birth_year": self.birth_year,
            "gender": self.gender
        }
    
class Planets(db.Model):
    __tablename__ = 'planets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    rotation_period	= db.Column(db.Integer, unique=False, nullable=False)
    orbital_period = db.Column(db.Integer, unique=False, nullable=False)
    diameter = db.Column(db.Integer, unique=False, nullable=False)
    climate	= db.Column(db.String(40), unique=False, nullable=False)
    gravity	= db.Column(db.String(20), unique=False, nullable=False)
    terrain	= db.Column(db.String(40), unique=False, nullable=False)
    population = db.Column(db.Integer, unique=False, nullable=False)
    likes = db.relationship('Likes', backref='planets', lazy=True)

    def __repr__(self):
        return f'<People {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "rotation_period": self.rotation_period,
            "orbital_period": self.orbital_period,
            "diameter": self.diameter,
            "climate": self.climate,
            "gravity": self.gravity,
            "terrain": self.terrain,
            "population": self.population
        }
    
class Starships(db.Model):
    __tablename__ = 'starships'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    model = db.Column(db.String(80), unique=False, nullable=False)
    manufacturer = db.Column(db.String(40), unique=False, nullable=False)
    cost_in_credits = db.Column(db.Integer, unique=False, nullable=False)
    length = db.Column(db.Integer, unique=False, nullable=False)
    max_atmosphering_speed = db.Column(db.Integer, unique=False, nullable=False)
    crew = db.Column(db.Integer, unique=False, nullable=False)
    passengers = db.Column(db.Integer, unique=False, nullable=False)
    cargo_capacity = db.Column(db.Integer, unique=False, nullable=False)
    consumables = db.Column(db.String(30), unique=False, nullable=False)
    hyperdrive_rating = db.Column(db.Integer, unique=False, nullable=False)
    MGLT =  db.Column(db.Integer, unique=False, nullable=False)
    starship_class = db.Column(db.String(60), unique=False, nullable=False)
    likes = db.relationship('Likes', backref='starships', lazy=True)

    def __repr__(self):
        return f'<Starships {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "model": self.model,
            "manufacturer": self.manufacturer,
            "cost_in_credits": self.cost_in_credits,
            "length": self.length,
            "max_atmosphering_speed": self.max_atmosphering_speed,
            "crew": self.crew,
            "passengers": self.passengers,
            "cargo_capacity": self.cargo_capacity,
            "consumables": self.consumables,
            "hyperdrive_rating": self.hyperdrive_rating,
            "MGLT": self.MGLT,
            "starship_class": self.starship_class
        }
    
class Likes(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('people.id'), nullable=False)
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'), nullable=False)
    starship_id = db.Column(db.Integer, db.ForeignKey('starships.id'), nullable=False)

    def __repr__(self):
        return f'<Likes {self.id}>'
    
    def serialize(self):

        user = User.query.get(self.user_id)
        if user is not None:
            user = user.serialize()

        person = People.query.get(self.person_id)
        if person is not None:
            person = person.serialize()

        planet = PLanets.query.get(self.planet_id)
        if planet is not None:
            planet = planet.serialize()

        starship = Starships.query.get(self.starship_id)
        if starship is not None:
            starship = starship.serialize()

        return {
            "id": self.id,
            "user": user,
            "person": person,
            "planet": planet,
            "starship": starship,
        }