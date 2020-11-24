import pandas as pd
import geopandas as gpd
from shapely.geometry import Point, LineString


import matplotlib.pyplot as plt
import plotly_express as px

import networkx as nx
import osmnx as ox
import numpy as np
ox.config(use_cache=True, log_console=True)

class ShortestPath:

    def cost_function(self,length, gradient):
        penalty_term = gradient ** 2
        return (length *penalty_term)**2

    def convert_nodes_to_coord(self, G, nodes):
        return [(G.nodes[n]['x'], G.nodes[n]['y']) for n in nodes]
    #strategy input for shortest path (pick between default (A*) and dijkstra)
    def shortest_path_normal(self, G, start, end, dijkstra = False):
        if not dijkstra:
            short_path = ox.shortest_path(G, start, end, weight = 'length')
            coord_path = self.convert_nodes_to_coord(G, short_path)
            return {"nodes": short_path, "coordinates": coord_path}
        else:
            short_path =  nx.dijkstra_path(G, start, end, weight = 'length')
            coord_path = self.convert_nodes_to_coord(G, short_path)
            return {"nodes": short_path, "coordinates": coord_path}

    def nearest_node_to_point(self, G, x, y):
        return ox.get_nearest_node(G, (x, y))

    def shortest_path_elevate(self, G, start, end, dijkstra =  False):
        if not dijkstra:
            short_path = ox.shortest_path(G, start, end, weight = 'impedance')
            coord_path = self.convert_nodes_to_coord(G, short_path)
            return {"nodes": short_path, "coordinates": coord_path}
        else:
            short_path =  nx.dijkstra_path(G, start, end, weight = 'impedance')
            coord_path = self.convert_nodes_to_coord(G, short_path)
            return {"nodes": short_path, "coordinates": coord_path}

    def edge_cost_normsl(self, G, u, v):
       return G.edges[u,v,0]['length']

    


