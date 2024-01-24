from src.database import getDB
from src.hashPassword import hashPassword

def connect(username, password):
    hashedPassword = hashPassword(password)

    db, conn = getDB()
    takenUser = db.execute("SELECT * FROM cesco_users WHERE username = ? AND password = ?", (username, hashedPassword))
    
    if(len(takenUser) >= 1):
        print("connected")