from flask import Blueprint, jsonify

bp = Blueprint('hello', __name__, url_prefix='/api')

@bp.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({
        'message': 'Hello from Flask',
        'status': 'success'
    })