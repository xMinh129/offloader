from flask import request, json
from server.response_handler import handle_response, handle_db_error
import pandas as pd

JSON_RESPONSE_TYPE = 'application/json'

MOCK_DATA_PATH = "/Users/Darius/Desktop/offloader/backend/SIAModel/input_example.csv"

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST'],
    'Access-Control-Allow-Headers': 'Content-Type'
}


class PassengerController(object):

    def __init__(self, app):
        @app.route('/api/passengers', methods=['GET'])
        def get_passengers():
            flightNumber = request.args.get('flightNumber')
            data = pd.read_csv(MOCK_DATA_PATH, header=0).sample(100)
            return data.to_json(orient='table')
            # return handle_response({
            #     'success': True,
            #     'data': 'hello_world'
            # })
