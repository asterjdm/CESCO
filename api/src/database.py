import sqlite3

def getDB():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()

    return cursor, connection