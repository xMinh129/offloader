from flask import request, json
from server.response_handler import handle_response, handle_db_error

JSON_RESPONSE_TYPE = 'application/json'

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST'],
    'Access-Control-Allow-Headers': 'Content-Type'
}


class PassengerController(object):

    def __init__(self, app):
        @app.route('/api/passengers', methods=['GET'])
        def get_passengers():
            return handle_response({
                'success': True,
                'data': 'hello_world'
            })
