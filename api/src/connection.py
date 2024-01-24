from src.database import getDB
from src.hashPassword import hashPassword

def connect(username, password):
    hashedPassword = hashPassword(password)

    db, conn = getDB()
    db.execute("SELECT * FROM cesco_users WHERE username = ? AND password = ?", (username, hashedPassword))
    takenUser = db.fetchall()
    if len(takenUser) >= 1:
        return "connected"
    return "error " + str(hashedPassword)
