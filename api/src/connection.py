from src.database import getDB
from src.hashPassword import hashPassword
from flask import session, jsonify

def connect(username, password):
    hashedPassword = hashPassword(password)

    db, conn = getDB()
    db.execute("SELECT ID FROM cesco_users WHERE username = ? AND password = ?", (username, hashedPassword))
    takenUser = db.fetchall()

    if len(takenUser) >= 1:
        session['username'] = username
        session['userID'] = takenUser[0][0]
        return jsonify({'correct': True})
    
    return jsonify({'correct': False})
