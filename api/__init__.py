from flask import Flask, request
from src.newUser import insertNewUser
from src.connection import connect

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

if __name__ == '__main__':
    app.run(debug=True)