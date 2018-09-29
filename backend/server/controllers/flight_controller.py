from flask import request, json, jsonify
from backend.server.flight_data import FLIGHTS_MAP

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST'],
    'Access-Control-Allow-Headers': 'Content-Type'
}


class FlightController(object):

    def __init__(self, app):
        @app.route('/api/flights', methods=['GET'])
        def get_all_flights():
            return jsonify(flights=FLIGHTS_MAP)

        @app.route('/api/suggested_flights', methods=['POST'])
        def get_suggested_flights():
            suggested_flights = []
            for flight in FLIGHTS_MAP:
                if flight.get('from') == request.args.get('from') and flight.get('to') == request.args.get('to'):
                    suggested_flights.append(flight)
            return jsonify(flights=suggested_flights)
