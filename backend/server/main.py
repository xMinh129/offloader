import os
import random
from flask import Flask, Response, json, request, jsonify, render_template
from flask_cors import CORS

import logging
import traceback
from time import strftime
from logging.handlers import RotatingFileHandler
from backend.server.flight_data import FLIGHTS_MAP

app = Flask(__name__, template_folder='templates')
cors = CORS(app)
from flask_mail import Mail, Message

mail = Mail(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
# TODO to be put in environment when deployed
app.config['MAIL_USERNAME'] = 'youremailaccount'
app.config['MAIL_PASSWORD'] = 'yourpassword'
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
def send_email():
    data = json.loads(request.data)
    name = data.get('name')
    # flightNumber = request.data.get('flightNumber')
    # fromDest = request.data.get('fromDest')
    # toDest = request.data.get('toDest')
    recipient = data.get('recipient')
    msg = Message("SIA Offload",
                  sender="xuanminh12995@gmail.com",
                  recipients=[recipient])
    msg.html = render_template('mail.html', name=name, flightNumber='SQ890',
                               fromDest='SIN', toDest='HKG', suggestedFlights=FLIGHTS_MAP)

    mail.send(msg)

