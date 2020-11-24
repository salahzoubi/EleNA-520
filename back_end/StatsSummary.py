import osmnx as ox
import numpy as np
from ShortestPath import ShortestPath

api_key = "AIzaSyA0HL2QKAmdhCiBPnRj_YqIZykzfm0HRUE"

#create a networkx digraph based on the location provided, default transport mode is "walking"
#Transport modes: ‘walk’, ‘bike’, ‘drive’, ‘drive_service’, ‘all’, ‘all_private’, ‘none'


class StatsSummary:

    def __init__(self):
        pass

    def create_graph(self, loc, dist, transport_mode = 'walk', loc_type = 'address'):
        G = None
        if loc_type == "address":
            G = ox.graph_from_address(loc, dist=dist, network_type=transport_mode)
        elif loc_type == "points":
            G = ox.graph_from_point(loc, dist=dist, network_type=transport_mode )
        return G

    #add bearing, grades, node elevations and edge speeds to the graph...
    def populate_graph(self, G, speeds = False):
        G = ox.add_edge_speeds(G) if speeds else G
        G = ox.add_node_elevations(G, api_key= api_key)
        G = ox.add_edge_grades(G)

        return G

    #add cost function to graph
    def modify_graph_elevate(self, G):
        c = ShortestPath()
        for u,v,k, data in G.edges(keys= True, data = True):
            data['impedance'] = c.cost_function(data['length'], data['grade'])
            data['rise'] = data['length'] * data['grade']
        return G

    def convert_nodes_to_coord(self, G, nodes):
        return [(G.nodes[n]['x'], G.nodes[n]['y']) for n in nodes]

    def print_route_stats(self, G, route):
        route_grades = ox.utils_graph.get_route_edge_attributes(G, route, 'grade_abs')
        msg = 'The average grade is {:.1f}% and the max is {:.1f}%'
        print(msg.format(np.mean(route_grades)*100, np.max(route_grades)*100))

        route_rises = ox.utils_graph.get_route_edge_attributes(G, route, 'rise')
        ascent = np.sum([rise for rise in route_rises if rise >= 0])
        descent = np.sum([rise for rise in route_rises if rise < 0])
        msg = 'Total elevation change is {:.1f} meters: a {:.0f} meter ascent and a {:.0f} meter descent'
        print(msg.format(np.sum(route_rises), ascent, abs(descent)))

        route_lengths = ox.utils_graph.get_route_edge_attributes(G, route, 'length')
        print('Total trip distance: {:,.0f} meters'.format(np.sum(route_lengths)))
