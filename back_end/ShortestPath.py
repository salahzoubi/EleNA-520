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

    #strategy input for shortest path (pick between default (A*) and dijkstra)
    def shortest_path_normal(self, G, start, end, dijkstra = False):
        return ox.shortest_path(G, start, end, weight = 'length') if not dijkstra else nx.dijkstra_path(G, start, end, weight = 'length')

    def shortest_path_elevate(self, G, start, end, dijkstra =  False):
       return ox.shortest_path(G, start, end, weight = 'impedance') if not dijkstra else nx.dijkstra_path(G, start, end, weight = 'impedance')

    def edge_cost_normsl(self, G, u, v):
       return G.edges[u,v,0]['length']

    


