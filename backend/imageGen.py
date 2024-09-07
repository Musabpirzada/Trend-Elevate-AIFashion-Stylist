import requests
from PIL import Image
from io import BytesIO


ngrok_api = "https://4f38-34-83-220-67.ngrok-free.app"

def generate_image(prompt):
    
    response = requests.post(ngrok_api, json={'input': prompt})

    if response.status_code == 200:
        base64_image = response.json().get('image', 'No response received')

        if base64_image:
            # image_data = base64.b64decode(base64_image)

            # image = Image.open(BytesIO(image_data))
            
            return base64_image
        else:
            raise ValueError("No image found in the response")
    else:
        raise Exception(f"Request failed with status code {response.status_code}")