import time
import ShortestPath.py
from flask import Flask, request

app = Flask(__name__)
shortestPathObject = ShortestPath()

#This is just a test api gateway
@app.route('/time', methods = [])
def get_current_time():
    print("a")
    return {'time': 1581527730}

@app.route('/cost/<length>/<gradient>')
def get_cost(length, gradient):
    cost = shortestPathObject.get_cost_function(length, gradient)
    return {'cost': cost}

# @app.route('/shortestPath/<length>/<gradient>', methods=['GET'])
# def get_cost_function(length, gradient):
#    cost = shortPathObject.cost_function(length, gradient)
#    return cost

if __name__ == '__main__':
    app.run(debug = True)