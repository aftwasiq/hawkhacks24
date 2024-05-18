import pandas as pd
from flask import Flask
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

app = Flask(__name__)

data = pd.read_csv('matches.csv')

le = LabelEncoder()
data['team1'] = le.fit_transform(data['team1'])
data['team2'] = le.fit_transform(data['team2'])
data['winner'] = le.fit_transform(data['winner'])

X = data[['team1', 'team2']]
y = data['winner']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))


def prediction(team1, team2):
    probabilities = clf.predict_proba([[team1, team2]])

    prob = probabilities[0][0]
    return f"CROATIA: {prob * 100:.2f}%", f"FRANCE: {100 - (prob * 100)}%"


@app.route('/')
def run():
    one, two = prediction(le.transform(['CROATIA'])[0], le.transform(['FRANCE'])[0])
    return f"{one, two}"


if __name__ == '__main__':
    app.run()
