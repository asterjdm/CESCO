from flask import Flask, request, session, jsonify
from src.newUser import insertNewUser
from src.connection import connect
import os

app = Flask(__name__)

@app.route('/hello')
def hello():
    return 'Hello, World!'

@app.route('/newUser', methods=[ 'GET'])
def newUser():
    username = request.args["username"]
    password = request.args["password"]
    
    return insertNewUser(username, password)


@app.route('/connection', methods=[ 'GET'])
def connection():
    username = request.args["username"]
    password = request.args["password"]
    
    return connect(username, password)


@app.route('/amIconnected')
def amIconnected():
    username = session.get('username')
    return jsonify({"connected": username is not None})

if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)