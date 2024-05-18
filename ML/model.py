import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

app = Flask(__name__)
CORS(app)

# dataset, includes game information from FIFA 2022, 2018, 2014, and 2010
data = pd.read_csv('dataset.csv')

le = LabelEncoder()
data['team1'] = le.fit_transform(data['team1'])
data['team2'] = le.fit_transform(data['team2'])
data['winner'] = le.fit_transform(data['winner'])

X = data[['team1', 'team2', '1goals', '2goals']]
y = data['winner']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))


def prediction(team1, team2, goals_team1, goals_team2):
    initial_prob = 50

    probabilities = clf.predict_proba([[team1, team2, goals_team1, goals_team2]])

    prob_team1 = probabilities[0][1] * 100
    prob_team2 = probabilities[0][0] * 100
    goal_diff = goals_team1 - goals_team2

    if goal_diff > 0:
        initial_prob += goal_diff * 2
    elif goal_diff < 0:
        initial_prob -= abs(goal_diff) * 2

    if prob_team1 > prob_team2:
        adjustment = (prob_team1 - initial_prob) * 0.1
        new_prob_team1 = initial_prob + adjustment
        new_prob_team2 = 100 - new_prob_team1
        
    else:
        adjustment = (prob_team2 - initial_prob) * 0.1
        new_prob_team2 = initial_prob + adjustment
        new_prob_team1 = 100 - new_prob_team2

    return f"{team1}: {new_prob_team1:.2f}%", f"{team2}: {new_prob_team2:.2f}%"
