import time
from ShortestPath import *
from StatsSummary import *
from flask import Flask, request
import osmnx as ox

app = Flask(__name__)

shortestPathObject = ShortestPath()
statsSummary = StatsSummary()
graph = statsSummary.create_graph("University of Massachusetts Amherst", dist = 700)
graph = statsSummary.populate_graph(G = graph)
graph =  statsSummary.modify_graph_elevate(graph)

@app.route('/cost/<length>/<gradient>')
def get_cost(length, gradient):
    length_int = int(length)
    gradient_int = int(gradient)
    cost = shortestPathObject.cost_function(length_int, gradient_int)
    return {'cost': cost}

@app.route('/get_nearest_node/<float:x_loc>/<float:y_loc>')
def get_nearest_node(x_loc, y_loc):
    node = shortestPathObject.nearest_node_from_point(graph, x_loc,y_loc)
    return {"node": node}
    
#this one takes 2 doubles for a parameter
@app.route('/create_graph_point/<float:x_loc>/<float:y_loc>/<dist>/', defaults = {'transport_mode': 'walk'})
@app.route('/create_graph_point/<float:x_loc>/<float:y_loc>/<dist>/<transport_mode>/')
def create_graph_point(x_loc, y_loc, dist, transport_mode):
    loc = (x_loc, y_loc)
    graph = statsSummary.create_graph(loc, dist, transport_mode, 'point')
    graph = statsSummary.populate_graph(graph, False)
    graph = statsSummary.modify_graph_elevate(graph)
    return {'graph':graph}

@app.route('/shortest_path_normal/<int:start>/<int:end>')
def get_shortest_path_normal(start, end):
    shortest_path = shortestPathObject.shortest_path_normal(graph,start, end)
    return shortest_path

@app.route('/shortest_path_elevate/<int:start>/<int:end>')
def get_shortest_path_elevate(start, end):
    shortest_path = shortestPathObject.shortest_path_elevate(graph, start, end)
    return shortest_path

@app.route('/coordinates/<float(signed=True):x_loc>/<float(signed=True):y_loc>')
def temp(x_loc, y_loc):
    return  {"node": int(ox.get_nearest_node(graph, (x_loc, y_loc)))}



if __name__ == '__main__':
    app.run(debug = True)
