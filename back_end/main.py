import networkx as nx
import osmnx as ox
import requests
import matplotlib.cm as cm
import matplotlib.colors as colors
from ShortestPath import ShortestPath
from StatsSummary import StatsSummary

ox.config(use_cache=True, log_console=True)

if __name__ == "__main__":

    s = StatsSummary() #summary object
    shortestPath = ShortestPath()
    #CreateGraph takes in a string of location and a dist parameter to factor the distance...
    G = s.create_graph("University of Massachusetts Amherst", dist = 700)
    G = s.populate_graph(G) #add all the necessary gradients to the graph we have
    G = s.modify_graph_elevate(G)

    origin = ox.get_nearest_node(G, (42.3878210, -72.5239110)) #Frank DC coordinates from the graph G
    end = ox.get_nearest_node(G, (2.3894329, -72.5190326)) #Chadbourne Hall coordinate from G

    #returns the shortest path overall...

    shortest_path_normal = ox.shortest_path(G, origin, end, weight = 'length') #shortest path from origin to end
    print(shortest_path_normal)
    fig, ax = ox.plot_graph_route(G, shortest_path_normal, bbox=None, node_size=10)

    list_of_coords = s.convert_nodes_to_coord(G, shortest_path_normal) #passing in a list of ints representing nodes, return a list of (x,y) coords
    print(list_of_coords)
    #returns shortest path

    shortest_path_grad = ox.shortest_path(G, origin, end, weight='impedance')
    print(shortest_path_grad)
    fig, ax = ox.plot_graph_route(G, shortest_path_grad, bbox=None, node_size=0)

    #print some summary stats...

    s.print_route_stats(G, shortest_path_normal)
    s.print_route_stats(G, shortest_path_grad)

