import unittest
from back_end import api, example, StatsSummary, ShortestPath
import osmnx as ox
import networkx
import flask

class TestShortestPath:

    def test_object(self):
        s = StatsSummary() #summary object
        self.assertTrue(isinstance(StatsSummary, s))

    def test_graph(self):
        s = StatsSummary()

        G = s.create_graph("University of Massachusetts Amherst", dist = 700)
        G = s.populate_graph(G) #add all the necessary gradients to the graph we have
        G = s.modify_graph_elevate(G)

        self.assertTrue(isinstance(networkx.DiGraph, G))

    def test_shortest_path(self):
        s = StatsSummary()

        G = s.create_graph("University of Massachusetts Amherst", dist = 700)
        G = s.populate_graph(G) #add all the necessary gradients to the graph we have
        G = s.modify_graph_elevate(G)

        origin = ox.get_nearest_node(G, (42.3878210, -72.5239110)) #Frank DC coordinates from the graph G
        end = ox.get_nearest_node(G, (2.3894329, -72.5190326)) #Chadbourne Hall coordinate from G

        shortest_path_normal = ox.shortest_path(G, origin, end, weight = 'length') #shortest path from origin to end
        shortest_path_grad = ox.shortest_path(G, origin, end, weight='impedance')
        shortest_path_dijkstra = networkx.dijkstra_path(G, origin, end, weight = 'length')
        shortest_path_grad_dijkstra = networkx.dijkstra_path(G, origin, end, weight =' impedance')

        self.assertEquals(shortest_path_normal, shortest_path_dijkstra)
        self.assertEquals(shortest_path_grad, shortest_path_grad_dijkstra)

class TestBackEnd:
    def testApp(self):
        app = flask.Flask(__name__)
        with app.test_request_context('/?name=api'):
        # assert flask.request.path == '/'
        # assert flask.request.args['name'] == 'api'

if __name__ == '__main__':
    unittest.main()

