import time
from ShortestPath import *
from StatsSummary import *
from flask import Flask, request

app = Flask(__name__)

shortestPathObject = ShortestPath()
statsSummary = StatsSummary()
graph = None


@app.route('/cost/<length>/<gradient>')
def get_cost(length, gradient):
    length_int = int(length)
    gradient_int = int(gradient)
    cost = shortestPathObject.cost_function(length_int, gradient_int)
    return {'cost': cost}
    
#this one takes 2 doubles for a parameter
@app.route('/create_graph_point/<float:x_loc>/<float:y_loc>/<dist>/', defaults = {'transport_mode': 'walk'})
@app.route('/create_graph_point/<float:x_loc>/<float:y_loc>/<dist>/<transport_mode>/')
def create_graph_point(x_loc, y_loc, dist, transport_mode):

    loc = (x_loc, y_loc)
    graph = statsSummary.create_graph(loc, dist, transport_mode, 'point')
    graph = stats.populate_graph(graph, False)
    return {'msg':'graph created'}

#this one takes a string (address) for a parameter
@app.route('/create_graph_address/<loc>/<dist>/', defaults = {'transport_mode':'walk'})
@app.route('/create_graph_address/<loc>/<dist>/<transport_mode>/')
def create_graph_address(loc, dist, transport_mode):
    graph = statsSummary.create_graph(loc, dist, transport_mode, 'address')
    graph = statsSummary.populate_graph(graph)
    return {'msg':'graph created'}




    
#def shortest_path_normal(self, G, start, end):
 #       return ox.shortest_path(G, start, end, weight = 'length')

# @app.route('/shortest_path_normal/<tf>/<start>/<end>')
#     x1, y1 = start[0], start[1]
#     return ox.shortest_path(G, start, end, weight = 'length')

#@app.route('/shortest_path_elevate/')
#@app.route('/edge_cost/')

if __name__ == '__main__':
    app.run(debug = True)