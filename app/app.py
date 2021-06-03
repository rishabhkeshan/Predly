import uvicorn
from typing import List
from typing import Optional
from fastapi import FastAPI
import tensorflow as tf
import string, os
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
import pandas as pd


app = FastAPI()
model = tf.keras.models.load_model('../models')

curr_dir = '../ArticleDataset/'
all_headlines = []
for filename in os.listdir(curr_dir):
    if 'Articles' in filename:
        article_df = pd.read_csv(curr_dir + filename)
        all_headlines.extend(list(article_df.headline.values))
        break

all_headlines = [h for h in all_headlines if h != "Unknown"]
def clean_text(txt):
    txt = "".join(v for v in txt if v not in string.punctuation).lower()
    txt = txt.encode("utf8").decode("ascii",'ignore')
    return txt 
corpus = [clean_text(x) for x in all_headlines]
tokenizer = Tokenizer()
tokenizer.fit_on_texts(corpus)

def generate_text(seed_text, next_words, model, max_sequence_len):
    for _ in range(next_words):
        token_list = tokenizer.texts_to_sequences([seed_text])[0]
        token_list = pad_sequences([token_list], maxlen=max_sequence_len-1, padding='pre')
        predicted = model.predict_classes(token_list, verbose=0)
        
        output_word = ""
        for word,index in tokenizer.word_index.items():
            if index == predicted:
                output_word = word
                break
        seed_text += " "+output_word
    return seed_text.title()


@app.get('/')
def index():
    return {'status': 'Model fired up and running fine!'}


@app.get('/predict/')
def predict_review(text: str, length: Optional[int] = 5):
    x = generate_text(text, length, model, 19)
    words = len(x.split(" "))
    return {
        'prediction': x,
        'words': words
    }


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)