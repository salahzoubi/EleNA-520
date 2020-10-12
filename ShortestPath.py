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

    def cost_function(length, gradient):
        penalty_term = gradient ** 2
        return (length *penalty_term)**2

    def shortest_path_normal(G, start, end):
        return ox.shortest_path(G, start, end, weight = 'length')

    def shortest_path_elevate(G, start, end):
        return ox.shortest_path(G, start, end, weight = 'impedance')


