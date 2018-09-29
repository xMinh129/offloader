from flask import request, jsonify, json
import pandas as pd
from backend.server.models.run_model import run_model
from backend.server.flight_data import PASSENGER_INFO
from random import sample, choice

JSON_RESPONSE_TYPE = 'application/json'

STATUS_OPTIONS = ['UNKNOWN', 'ON TAXI', 'CHECKED IN']

MOCK_DATA_PATH = "./server/models/input_example.csv"

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST'],
    'Access-Control-Allow-Headers': 'Content-Type'
}


class PassengerController(object):

    def __init__(self, app):
        @app.route('/api/passengers', methods=['GET'])
        def get_passengers():
            # flightNumber = request.args.get('flightNumber')
            data = pd.read_csv(MOCK_DATA_PATH, header=None)
            # data = pd.read_csv(MOCK_DATA_PATH, header=0).sample(100)
            return data.to_json(orient='values')

        @app.route('/api/ranked_passengers', methods=['GET'])
        def get_ranked_passengers():
            ranked_passengers = []
            ranking = run_model()
            passengers = json.loads(pd.read_csv(MOCK_DATA_PATH, header=None).to_json(orient='values'))[1:101]
            for index, passenger in enumerate(passengers):
                ranked_passengers.append({
                    'first_name': PASSENGER_INFO[index].get('first_name'),
                    'last_name': PASSENGER_INFO[index].get('last_name'),
                    'score': ranking.get(passenger[0]),
                    'status': 'NOT CHECK IN',  # ['UNKNOWN', 'ON TAXI', 'CHECKED IN']
                    'details': {
                        'email': PASSENGER_INFO[index].get('email'),
                        'gender': passenger[1],
                        'age': int(float(passenger[2])),
                        'nationality': passenger[3],
                        'corporate': passenger[4],
                        'number_of_tickets': int(float(passenger[5])),
                        'number_of_baggages': int(float(passenger[6])),
                        'flight_class': passenger[7],
                        'flexible_dates': passenger[8],
                        'booked_days_advance': int(float(passenger[9]))
                    }

                })

            return jsonify(
                ranked_passengers=sorted(ranked_passengers, key=lambda k: k['score'], reverse=True),
                checked_in=0,
                flight_capacity=90,
                total_booked=100
            )

        @app.route('/api/update_ranklist', methods=['POST'])
        def update_ranked_passengers():
            ranklist = json.loads(request.data).get('ranklist').get('ranked_passengers')
            total_booked = json.loads(request.data).get('ranklist').get('total_booked')
            flight_capacity = json.loads(request.data).get('ranklist').get('flight_capacity')
            random_index = sample(range(1, 100), 15)
            checked_in = json.loads(request.data).get('ranklist').get('checked_in')
            available_seat = flight_capacity - checked_in

            if available_seat is 90:
                for i, item in enumerate(ranklist):
                    if i in random_index:
                        ranklist[i].update({'status': 'UNKNOWN'})
                    else:
                        ranklist[i].update({'status': 'CHECKED IN'})
                        checked_in += 1

            else:
                count = 2
                for i, item in enumerate(ranklist):
                    if count > 0:
                        if item['status'] == 'UNKNOWN':
                            item.update({'status': choice(['CHECKED IN', 'IN THE TAXI', 'IN THE TAXI'])})
                            count = count - 1
                            checked_in += 1
                    else:
                        break

            return jsonify(ranked_passengers=ranklist,
                           checked_in=checked_in,
                           flight_capacity=90,
                           total_booked=100)
