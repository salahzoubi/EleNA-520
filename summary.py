import osmnx as ox
import numpy as np

api_key = "AIzaSyA0HL2QKAmdhCiBPnRj_YqIZykzfm0HRUE"

#create a networkx digraph based on the location provided, default transport mode is "walking"
#Transport modes: ‘walk’, ‘bike’, ‘drive’, ‘drive_service’, ‘all’, ‘all_private’, ‘none'


class summary:

    def create_graph(loc, dist, transport_mode = 'walk', loc_type = 'address'):
        if loc_type == "address":
            G = ox.graph_from_address(loc, dist=dist, network_type=transport_mode)
        elif loc_type == "points":
            G = ox.graph_from_point(loc, dist=dist, network_type=transport_mode )
        return G

    #add bearing, grades, node elevations and edge speeds to the graph...
    def populate_graph(G, speeds = False):
        G = ox.add_edge_speeds(G) if speeds else G
        G = ox.add_edge_travel_times(G)
        G = ox.add_node_elevations(G, api_key= api_key)
        G = ox.add_edge_grades(G, None, None)

    #add cost function to graph
    def modify_graph_elevate(G, cost_function):
        for u,v,k, data in G.edges(keys= True, data = True):
            data['impedance'] = cost_function(data['length'], data['grade_abs'])
            data['rise'] = data['length'] * data['grade']

    def print_route_stats(G, route):
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
