from flask import Flask
import pickle
import numpy as np
from numpy.linalg import norm

import tensorflow 
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50,preprocess_input
from sklearn.neighbors import NearestNeighbors



model = ResNet50(weights='imagenet',include_top=False,input_shape=(224,224,3))
model.trainable = False
model = tensorflow.keras.Sequential([
                          model,
                          GlobalMaxPooling2D()
])

def extract_features(img_path,model):
  img = image.load_img(img_path,target_size=(224,224))
  img_array = image.img_to_array(img)
  expanded_img_array = np.expand_dims(img_array,axis=0) 
  preprocessed_img = preprocess_input(expanded_img_array)
  result = model.predict(preprocessed_img).flatten()
  normalized_result = result/norm(result)
  return normalized_result

feature_list = pickle.load(open('embeddings.pkl','rb'))
filenames = pickle.load(open('filenames.pkl','rb'))


neighbors = NearestNeighbors(n_neighbors=6,algorithm='brute',metric='euclidean')
neighbors.fit(feature_list)

app = Flask(__name__)
@app.route('/')
def index():
    result = extract_features('4704.jpg',model)
    distances,indices = neighbors.kneighbors([result])
    final_Arr = []
    for i in indices[0]:
        final_Arr.append(int(str(filenames[i].split('/')[-1].split('.')[0])))
       
    print(final_Arr)
    return "Hello World"


if __name__ == '__main__':
    app.run(debug=True)