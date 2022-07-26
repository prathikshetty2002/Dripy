from flask import Flask,request,jsonify
import pickle
import numpy as np
from numpy.linalg import norm
import urllib.request
import os
import tensorflow 
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50,preprocess_input
from sklearn.neighbors import NearestNeighbors
import pandas as pd



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
@app.route('/recommend',methods=['GET'])
def index():
    args = request.args
    path = args['name']
    id = args['id']
    urllib.request.urlretrieve(path, "./uploads/"+str(id)+'.jpg')
    result = extract_features("./uploads/"+str(id)+'.jpg',model)
    distances,indices = neighbors.kneighbors([result])
    final_Arr = []
    for i in indices[0]:
        final_Arr.append(int(str(filenames[i].split('/')[-1].split('.')[0])))
       
    os.remove("./uploads/"+str(id)+'.jpg')
    return jsonify({'result': final_Arr})


@app.route('/image_search')
def imagesearch():
    args = request.args
    url = args['url']
    urllib.request.urlretrieve(url, "./uploads/" + "test.jpg")
    result = extract_features("./uploads/"+'test.jpg',model)
    distances,indices = neighbors.kneighbors([result])
    final_Arr = []
    for i in indices[0]:
        final_Arr.append(int(str(filenames[i].split('/')[-1].split('.')[0])))
       
    os.remove("./uploads/"+'test.jpg')


    return jsonify({'result': final_Arr})


@app.route('/search')
def search():
    args = request.args
    query = args['query']
    df = pd.read_csv('./grandfinaleX.csv',error_bad_lines = False)

    lis = ['gender','masterCategory','subCategory','articleType','productDisplayName']

    x_df = pd.DataFrame()

    for i in query.split():
        for j in lis:
            new_df = df[df[j] == i]
            x_df = pd.concat([x_df,new_df])

    arr = df['id'].head(10).values
    return jsonify({'searchResult': arr.tolist()})



if __name__ == '__main__':
    app.run(debug=True)