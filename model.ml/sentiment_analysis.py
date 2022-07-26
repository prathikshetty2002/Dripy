# -*- coding: utf-8 -*-
"""Sentiment Analysis.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1N2aYuP0c6RqW9h9MBqtQfAq2_e5MopKv

##Vader Sentiment Analysis
"""

!pip install vadersentiment

!pip install --upgrade vaderSentiment

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def sentiment_scores(sentence):

	
	sid_obj = SentimentIntensityAnalyzer()

	sentiment_dict = sid_obj.polarity_scores(sentence)
	
	# print("Overall sentiment dictionary is : ", sentiment_dict)
	print("👎 ", sentiment_dict['neg']*100, "% Negative")
	# print("sentence was rated as ", sentiment_dict['neu']*100, "% Neutral")
	print("👍 ", sentiment_dict['pos']*100, "% Positive")

	print("Review Overall Analysis", end = " ")

	
	if sentiment_dict['compound'] >= 0.05 :
		print("🙂 Positive")

	elif sentiment_dict['compound'] <= - 0.05 :
		print("☹️ Negative")

	else :
		print("😐 Neutral")




print("\n1st statement :")
sentence = "This product is very good!"

sentiment_scores(sentence)

print("\n2nd Statement :")
sentence = "study is going on as usual"
sentiment_scores(sentence)

print("\n3rd Statement :")
sentence = "I am very sad today."
sentiment_scores(sentence)