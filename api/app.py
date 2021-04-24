import flask
import requests
import json
from flask_cors import CORS
from flask import request
from pandas import read_csv, DataFrame, to_datetime
from numpy import radians, sin, cos, arcsin, sqrt, mean
from sklearn import ensemble
import time
from datetime import datetime
import xgboost as xgb
import pandas as pd

app = flask.Flask(__name__)
CORS(app)


def getApproxFares(distance, pickup_datetime):
    print(distance)
    print(pickup_datetime)



time =  datetime.now().strftime("%Y-%m-%d %H:%M:%S")
getApproxFares(5.3, time )