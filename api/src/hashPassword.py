from argon2 import PasswordHasher

def hashPassword(password):
    ph = PasswordHasher()

    hashed_password = ph.hash(password)

    return hashed_password
