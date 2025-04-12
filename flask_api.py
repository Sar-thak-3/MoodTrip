from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['POST'])
def receive_data():
    """
    This endpoint handles POST requests to '/api/data'.
    It expects JSON data in the request body and returns a success message
    along with the received data.
    """
    try:
        data = request.get_json()
        if data:
            print("Received data:", data)  # For server-side logging
            response = {
                'status': 'success',
                'message': 'Data received successfully!',
                'received_data': data
            }
            return jsonify(response), 200
        else:
            response = {
                'status': 'error',
                'message': 'No JSON data received in the request body.'
            }
            return jsonify(response), 400
    except Exception as e:
        response = {
            'status': 'error',
            'message': f'An error occurred: {str(e)}'
        }
        return jsonify(response), 500

if __name__ == '__main__':
    print("Flask application is running...")
    app.run(debug=True, host='0.0.0.0', port=5000)