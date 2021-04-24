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

@app.route("/getFares", methods=['POST', 'GET'])
def getApproxFares():
    yellow_taxi = xgb.Booster()
    uber = xgb.Booster()
    lyft = xgb.Booster()
    
    num_round = 2
    yellow_taxi.load_model("yellow_cab_model.json")
    uber.load_model("uber_model.json")
    lyft.load_model("lyft_model.json")

    distance = request.json['distance']
    pickup_datetime = request.json['pickup_datetime']

    queryDict = {
        "distance": [distance],
        "pickup_datetime": [pickup_datetime]
    }
    test = pd.DataFrame(queryDict)
    test['pickup_datetime'] = to_datetime(test['pickup_datetime'])
    test['hour_of_day'] = test.pickup_datetime.dt.hour.astype(float)
    test['day'] = test.pickup_datetime.dt.day.astype(float)
    test['week'] = test.pickup_datetime.dt.week.astype(float)
    test['month'] = test.pickup_datetime.dt.month.astype(float)
    test['day_of_year'] = test.pickup_datetime.dt.dayofyear.astype(float)
    test['week_of_year'] = test.pickup_datetime.dt.weekofyear.astype(float)
    test['distance'] = test['distance'].astype(float)
    
    test = test.drop(['pickup_datetime'], axis=1)
    
    test_xgb = xgb.DMatrix(test)

    predict_yellow_taxi = yellow_taxi.predict(test_xgb, ntree_limit=num_round)
    predict_uber = uber.predict(test_xgb, ntree_limit=num_round)
    predict_lyft = lyft.predict(test_xgb, ntree_limit=num_round)

    res = {
        "yellow_taxi": str(predict_yellow_taxi[0]),
        "uber": str(predict_uber[0]),
        "lyft": str(predict_lyft[0])
    }
    return json.dumps(res)

