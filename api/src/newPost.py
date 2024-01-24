from src.database import getDB

def insertNewPost(content):
    db, conn = getDB()

    db.execute("INSERT INTO cesco_posts (content, USER_FK) VALUES (?, ?)", (content, 1))
    conn.commit()