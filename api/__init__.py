from flask import Flask, request, jsonify
from src.newPost import insertNewPost
from src.newUser import insertNewUser

app = Flask(__name__)

@app.route('/hello')
def hello():
    return 'Hello, World!'

@app.route('/newUser', methods=[ 'GET'])
def newUser():
    username = request.args["username"]
    password = request.args["password"]
    
    if username and password:
        return insertNewUser(username, password)
    else:
        return jsonify({"error":"Invalid input. Provide username and password."})


if __name__ == '__main__':
    app.run(debug=True)
