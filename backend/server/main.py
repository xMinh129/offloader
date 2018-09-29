import os
from flask import Flask, Response, json, request, jsonify, render_template
from flask_cors import CORS
from backend.server.flight_data import FLIGHTS_MAP

import logging
import traceback
from time import strftime
from logging.handlers import RotatingFileHandler

app = Flask(__name__, template_folder='templates')
cors = CORS(app)
from flask_mail import Mail, Message

mail = Mail(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'xuanminh12995@gmail.com'
app.config['MAIL_PASSWORD'] = 'hongMINH129'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

# Logger
handler = RotatingFileHandler('app.log', maxBytes=10000, backupCount=3)
logger = logging.getLogger(__name__)
logger.setLevel(logging.ERROR)
logger.addHandler(handler)

# Controllers
from server.controllers.passenger_controller import PassengerController

PassengerController(app)

from server.controllers.flight_controller import FlightController

FlightController(app)


@app.after_request
def after_request(response):
    """ Logging after every request. """
    # This avoids the duplication of registry in the log,
    # since that 500 is already logged via @app.errorhandler.
    if response.status_code != 500:
        ts = strftime('[%Y-%b-%d %H:%M]')
        logger.error('%s %s %s %s %s %s',
                     ts,
                     request.remote_addr,
                     request.method,
                     request.scheme,
                     request.full_path,
                     response.status)
    return response


@app.errorhandler(Exception)
def exceptions(e):
    """ Logging after every Exception. """
    ts = strftime('[%Y-%b-%d %H:%M]')
    tb = traceback.format_exc()
    logger.error('%s %s %s %s %s 5xx INTERNAL SERVER ERROR\n%s',
                 ts,
                 request.remote_addr,
                 request.method,
                 request.scheme,
                 request.full_path,
                 tb)
    return "Internal Server Error", 500


@app.route('/health_check', methods=['GET'])
def health_check():
    """
    Health check
    """
    return Response(json.dumps({'reply': 'I\'m ok'}))


@app.route('/api/notify_passengers', methods=['POST'])
def notify_passengers():
    request_data = json.loads(request.data)
    flightNumber = request_data.get('flightNumber')
    fromDest = request_data.get('fromDest')
    toDest = request_data.get('toDest')
    passengers = request_data.get('passengers')
    option = request_data.get('option')
    if option == 1:
        suggestedFlights = get_suggested_flights(fromDest, toDest, flightNumber)
    else:
        suggestedFlights = None
    try:
        for passenger in passengers:
            send_email(flightNumber,
                       fromDest,
                       toDest,
                       option,
                       passenger,
                       suggestedFlights=suggestedFlights)
        return jsonify(success=True)
    except Exception as e:
        return jsonify(success=False)


def send_email(flightNumber, fromDest, toDest, option, passenger_data, suggestedFlights=None):
    msg = Message("SIA Offload",
                  sender="xuanminh12995@gmail.com",
                  recipients=[passenger_data['details']['email']])
    if option == 1:
        msg.html = render_template('mail.html',
                                   name=passenger_data['name'],
                                   flightNumber=flightNumber,
                                   fromDest=fromDest,
                                   toDest=toDest,
                                   suggestedFlights=suggestedFlights)
        mail.send(msg)


def get_suggested_flights(fromDest, toDest, currentFlightNumber):
    suggested_flights = []
    for flight in FLIGHTS_MAP:
        if flight.get('from') == fromDest and flight.get('to') == toDest and flight.get('flight_number') != currentFlightNumber:
            suggested_flights.append(flight)
    return suggested_flights
