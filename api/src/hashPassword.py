import hashlib

def hashPassword(password):
    hashed_password = hashlib.md5(password.encode("ASCII"))

    return hashed_password.hexdigest()
