import requests
import enchant
import re


ngrok_api = "https://cc05-34-136-160-242.ngrok-free.app"

# Define a dictionary for common contractions and their expansions
contractions_dict = {
    "ain't": "is not",
    "aren't": "are not",
    "can't": "cannot",
    "can't've": "cannot have",
    "'cause": "because",
    "could've": "could have",
    "couldn't": "could not",
    "didn't": "did not",
    "doesn't": "does not",
    "don't": "do not",
    "hadn't": "had not",
    "hasn't": "has not",
    "haven't": "have not",
    "he'd": "he would",
    "he'll": "he will",
    "he's": "he is",
    "how'd": "how did",
    "how'll": "how will",
    "how's": "how is",
    "I'd": "I would",
    "I'll": "I will",
    "I'm": "I am",
    "I've": "I have",
    "isn't": "is not",
    "it'd": "it would",
    "it'll": "it will",
    "it's": "it is",
    "let's": "let us",
    "ma'am": "madam",
    "mayn't": "may not",
    "might've": "might have",
    "mightn't": "might not",
    "must've": "must have",
    "mustn't": "must not",
    "needn't": "need not",
    "oughtn't": "ought not",
    "shan't": "shall not",
    "she'd": "she would",
    "she'll": "she will",
    "she's": "she is",
    "should've": "should have",
    "shouldn't": "should not",
    "that's": "that is",
    "there's": "there is",
    "they'd": "they would",
    "they'll": "they will",
    "they're": "they are",
    "they've": "they have",
    "wasn't": "was not",
    "we'd": "we would",
    "we'll": "we will",
    "we're": "we are",
    "we've": "we have",
    "weren't": "were not",
    "what'll": "what will",
    "what're": "what are",
    "what's": "what is",
    "what've": "what have",
    "where's": "where is",
    "who'd": "who would",
    "who'll": "who will",
    "who're": "who are",
    "who's": "who is",
    "who've": "who have",
    "won't": "will not",
    "wouldn't": "would not",
    "you'd": "you would",
    "you'll": "you will",
    "you're": "you are",
    "you've": "you have"
}

# Define a dictionary for common abbreviations and their expansions
abbreviations_dict = {
    "dr.": "doctor",
    "mr.": "mister",
    "mrs.": "missus",
    "ms.": "miss",
    "etc.": "et cetera",
    "e.g.": "for example",
    "i.e.": "that is",
    "vs.": "versus"
}

def generate_response(message):
    spell_check = spellcheck_correction(message)
    msg = expand_contractions_and_abbreviations(spell_check)

    # if not any(keyword in msg.lower() for keyword in ['white', 'dark', 'pale','brown','olive','tan', 'hello', 'thank you']):
    #     return "Please ask questions related to fashion"
    
    response = requests.post(ngrok_api, json={'input': msg})

    if response.status_code == 200:
        generated_text = response.json().get('generated_text', 'No response received')

        # print("Generated Text:", generated_text)
        return generated_text
        
    else:
        print("Error:", response.text)

def spellcheck_correction(message):
    d = enchant.Dict("en_US")
    words = message.split()

    for i, word in enumerate(words):
        
        if d.check(word):
            continue  

        suggestions = d.suggest(word)

        if suggestions:
            words[i] = suggestions[0]

    corrected_message = ' '.join(words)

    return corrected_message

def expand_contractions_and_abbreviations(message):
    # Expand contractions
    for contraction, expansion in contractions_dict.items():
        message = re.sub(r'\b' + re.escape(contraction) + r'\b', expansion, message, flags=re.IGNORECASE)
    
    # Expand abbreviations
    for abbreviation, expansion in abbreviations_dict.items():
        message = re.sub(r'\b' + re.escape(abbreviation) + r'\b', expansion, message, flags=re.IGNORECASE)
    
    return message


