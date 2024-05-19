import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

data = pd.read_csv('dataset.csv')

le_team1 = LabelEncoder()
le_team2 = LabelEncoder()
le_winner = LabelEncoder()

data['team1'] = le_team1.fit_transform(data['team1'])
data['team2'] = le_team2.fit_transform(data['team2'])
data['winner'] = le_winner.fit_transform(data['winner'])

X = data[['team1', 'team2', '1goals', '2goals']]
y = data['winner']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Training
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))

def prediction(team1, team2, goals_team1, goals_team2):
    initial_prob = 50
    team1_encoded = le_team1.transform([team1])[0]
    team2_encoded = le_team2.transform([team2])[0]
    probabilities = clf.predict_proba([[team1_encoded, team2_encoded, goals_team1, goals_team2]])

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

    return {team1: f"{new_prob_team1:.2f}%", team2: f"{new_prob_team2:.2f}%"}

@app.route('/bet', methods=['POST'])
def bet():
    data = request.get_json()
    team1 = data['team1']
    team2 = data['team2']
    goals_team1 = data['goals_team1']
    goals_team2 = data['goals_team2']
    account_id = data['accountId']
    selected_team = data['selectedTeam']
    bet_amount = data['betAmount']

    result = prediction(team1, team2, goals_team1, goals_team2)
    winner = team1 if result[team1] > result[team2] else team2

    return jsonify({
        "result": result,
        "winner": winner,
        "selectedTeam": selected_team,
        "betAmount": bet_amount
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
