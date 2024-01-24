from flask import Flask, request
from src.newPost import insertNewPost
from src.newUser import insertNewUser

app = Flask(__name__)

@app.route('/hello')
def hello():
    return 'Hello, World!'

@app.route('/newUser', methods=['POST'])
def newUser():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    if username and password:
        return insertNewUser(username, password)
    else:
        return "Invalid input. Provide username and password."


if __name__ == '__main__':
    app.run(debug=True)
