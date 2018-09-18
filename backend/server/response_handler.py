from flask import Response, json
import requests

JSON_RESPONSE_TYPE = 'application/json'

FAILURE_RESPONSE = {'success': False}
SUCCESS_RESPONSE = {'success': True}

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST'],
    'Access-Control-Allow-Headers': 'Content-Type'
}


def handle_response(response):
    if response.get('success', None):
        return Response(json.dumps(response), status=requests.codes.ok, mimetype=JSON_RESPONSE_TYPE, headers=HEADERS)
    else:
        return Response(json.dumps(response), status=requests.codes.server_error,
                        mimetype=JSON_RESPONSE_TYPE, headers=HEADERS)


def handle_db_error(exception):
    return {'error': exception}
