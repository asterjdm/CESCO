from src.database import getDB
from src.hashPassword import hashPassword
from flask import jsonify

def insertNewUser(username, password):
    hashedPassword = hashPassword(password)

    if len(username) < 4 or len(username) > 20:
        return jsonify({
            "success": False,
            "error": "invalid username"
        })
    
    if not username.isalnum():
        return jsonify({
            "success": False,
            "error": "invalid username"
        })

    db, conn = getDB()

    db.execute("INSERT INTO cesco_users (username, password) VALUES (?, ?)", (username, hashedPassword))

    conn.commit()

    return jsonify({
        "success": True
    })
