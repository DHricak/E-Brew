import json
import random
from datetime import datetime, UTC
from pathlib import Path
from flask import Flask, jsonify, request, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ROOT = Path(__file__).parent
DATA_DIR = ROOT / 'data'
PRODUCTS_FILE = DATA_DIR / 'products.json'
ORDERS_FILE = DATA_DIR / 'orders.json'

DATA_DIR.mkdir(exist_ok=True)
if not ORDERS_FILE.exists():
    ORDERS_FILE.write_text('[]', encoding='utf-8')

@app.route('/api/products')
def get_products():
    with PRODUCTS_FILE.open(encoding='utf-8') as f:
        return jsonify(json.load(f))

@app.route('/api/orders', methods=['POST'])
def create_order():
    if not request.is_json:
        abort(400, description='Request body must be JSON')

    order = request.get_json()
    required = ('fullName', 'email', 'address', 'phone', 'items')
    if not all(k in order for k in required):
        abort(400, description='Missing required order fields')

    orders = json.loads(ORDERS_FILE.read_text(encoding='utf-8'))
    order_number = f'BC-L-{random.randint(10000, 99999)}'
    record = {
        'orderNumber': order_number,
        'fullName': order['fullName'],
        'email': order['email'],
        'address': order['address'],
        'phone': order['phone'],
        'items': order['items'],
        'discount': order.get('discount', 0),
        'total': order.get('total', 0),
        'timestamp': datetime.now(UTC).isoformat()
    }
    orders.append(record)
    ORDERS_FILE.write_text(json.dumps(orders, indent=2, ensure_ascii=False), encoding='utf-8')
    return jsonify({'success': True, 'orderNumber': order_number})

@app.errorhandler(400)
def bad_request(e):
    return jsonify({'error': str(e)}), 400

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
