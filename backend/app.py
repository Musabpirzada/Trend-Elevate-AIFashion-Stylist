from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from chatbot import generate_response
from imageGen import generate_image
import re
from datetime import datetime
from urllib.parse import unquote

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://trenduser:alG4JoJVNXasBfp3@trend-elevate-cluster.q6tqhnl.mongodb.net/Trend-Elevate"
mongo = PyMongo(app)


@app.route('/api/chats', methods=['POST'])
def receive_chats():
        try:
            chats = request.json
            userId = chats.get('userId')
            upchats = chats.get('updatedChat')
            if chats:
                mongo.db.chats.insert_one({'userId': userId , 'name':upchats})
                return jsonify({'success': True, 'chats': 'Chats stored successfully'}), 200
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/retrievechats', methods=['GET'])
def get_user_chats():
    try:
        user_id = request.args.get('userId')

        if not user_id:
            return jsonify({'success': False, 'error': 'userId parameter is required'}), 400
        
        userchats = list(mongo.db.chats.find({'userId': user_id}))
        # Serialize the MongoDB ObjectId to a string
        for chat in userchats:
            chat['_id'] = str(chat['_id'])

        return jsonify({'success': True, 'chats': userchats}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/messages', methods=['POST'])
def receive_message():
    try:
        data = request.json
        message = data.get('message')
        chatName = data.get('chatName')
        
        bot_response = generate_response(message)
        current_month = datetime.now().strftime('%B')
        # print(bot_response)
        mongo.db.conversation.insert_one({
            'chatName': chatName,
            'user_message': message,
            'bot_response': bot_response,
            'month': current_month
        })
        
        return jsonify({'message': bot_response}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/getmessages', methods=['GET'])
def get_message():
    chatname = request.args.get('chatname')

    if not chatname:
        return jsonify({"error": "chatname parameter is required"}),400
    
    # chatname = unquote(chatname)
    # print(f"Decoded chatname: '{chatname}'")
    try:
        messages = list(mongo.db.conversation.find({'chatName': chatname}))

        formatted_message = [{
            "user_message": msg.get("user_message", ""),
            "bot_response": msg.get("bot_response", "")
        }
        for msg in messages
        ]
        # print(formatted_message)
        return jsonify({"messages": formatted_message}), 200
    except Exception as e:
        print(f"Error fetching messages: {e}")
        return jsonify({"error": "Failed to fetch messages"}), 500



@app.route('/api/images', methods = ['POST'])
def receive_images():
    try:
        data = request.json
        message = data.get('message')

        response = generate_image(message)

        return jsonify({'success': True, 'images': [response]}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    


@app.route('/api/like-image', methods=['POST'])
def like_image():
    try:
        data = request.json
        img_src = data.get('imgSrc')
        userId = data.get('userId')
        if not img_src:
            return jsonify({'success': False, 'error': 'No image source provided'}), 400
        
        mongo.db.images.insert_one({'userId' : userId ,'imgSrc': img_src})

        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500



@app.route('/api/retrieveimages', methods = ['POST'])
def get_user_Images():
    try:
        data = request.json
        user_id = data.get('userId')

        images = list(mongo.db.images.find({'userId' : user_id}))

        userImages = [img['imgSrc'] for img in images]
        return jsonify({'success': True, 'userimages': userImages}), 200        

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500



@app.route('/api/trend-counts', methods=['GET'])
def get_trend_counts():
    try:
        trends = ['Casual', 'Formal', 'Sporty', 'Chic']
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        trend_counts = {trend: {month: 0 for month in months} for trend in trends}
        
        # Retrieve all messages from the conversation collection
        conversations = mongo.db.conversation.find()
        
        month_mapping = {
            'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 
            'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 
            'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
        }
        
        for convo in conversations:
            user_message = convo.get('user_message', '').lower()
            month = month_mapping.get(convo.get('month', ''), '')
            if month:
                for trend in trends:
                    if re.search(r'\b' + re.escape(trend.lower()) + r'\b', user_message):
                        trend_counts[trend][month] += 1
        
        return jsonify({'success': True, 'trend_counts': trend_counts}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True, port=8080)
