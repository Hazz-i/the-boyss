from flask import jsonify, make_response

def success_response(data, status_code=200):
    return make_response(jsonify({
        'status': 'success',
        'data': data
    }), status_code)

def error_response(message, status_code=400):
    return make_response(jsonify({
        'status': 'error',
        'message': message
    }), status_code)

def not_found_response(message='Resource not found', status_code=404):
    return error_response(message, status_code)