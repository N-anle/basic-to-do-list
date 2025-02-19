from flask import Flask,jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

tasks = [
    {"id":1, "task" : "Make my bed"},
    {"id":2, "task" :"Take a shower"},
]

current_id = 3
task = None 

#show all items
@app.route('/', methods = ["GET"])
def show_all():
    return jsonify(tasks)

#add to the to-do list
@app.route('/',methods = ["POST"])
def add_items():

    global current_id

    #listens for json input 
    data = request.get_json()
    #gets the task parameter from the json input and routs it to task_name
    task_name = data.get("task")

    #validate that task name is given
    if not task_name:
        return jsonify({"Error" : "There was no task provided"}), 400
    
    new_task = {"id" : current_id , "task" : task_name}
    tasks.append(new_task)  
    current_id += 1
    return jsonify({"Success" : "Your task was successfully added"}), 201

#edit the to-do list
@app.route('/', methods = ["PATCH"])
def edit_items():
    data = request.get_json()
    id = data.get("id")
    task_name = data.get ("task")

    if not id or not task_name:
        return jsonify({"Error" : "404 bad request"}), 400
    
    task_found = False
    for task in tasks: 
        if task["id"] == id:
            task["task"] = task_name
            task_found = True
            break

    if not task_found:
        return jsonify({"Error" : f"Task with id {id} cannot be found"}), 404
        
    return jsonify({"Success" : "Task has been edited"}), 200


#delete from the to-do list
@app.route('/', methods = ["DELETE"])
def delete_items():
    data = request.get_json()
    id  = data.get("id")

    if not id:
        return jsonify({"Error" : "400 Bad Request"}), 400
    
    task_found = False
    for task in tasks: 
        if task["id"] == id:
            task_found = True
            task_to_delete = task
            break
        
    if not task_found:    
        return jsonify({"Error" : "404 not found"}), 404
    
    tasks.remove(task_to_delete)

    return jsonify({"Success" : "Task deleted"}), 200

if __name__ == "__main__":
    app.run()