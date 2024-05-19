# PredicTurf - HawkHacks 2024 Submission

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=0EF71F&random=false&width=435&lines=PredicTurf;Bets;Blockchain)](https://git.io/typing-svg)

PredicTurf is an innovative decentralized prediction market built on the NEAR blockchain, leveraging machine learning (ML) to provide accurate forecasting and analytics. Our platform allows users to bet on the outcomes of various future events, including sports, elections, stocks, and more, creating a diverse and dynamic betting ecosystem. This project was created for the 2024 HawkHacks hackathon competition by Abdullah Wasiq, Nour El Mohktari, Krish Nalam, and Sidak Singh. 

# Key Features

`Decentralized Prediction Market`, PredicTurf ensures safe, transparent, and decentralized transactions by running its operations on the NEAR blockchain. Bets are made using the NEAR blockchain wallet, facilitating secure and efficient transactions. Users can manage their funds and bets directly through the blockchain, benefiting from NEAR’s low transaction fees and high-speed processing.

`ML-Based Forecasting`, A machine learning model built with Python using the scikit library forms the basis of PredicTurfs probability analysis. Currently the demo dataset includes the FIFA World Cup results for sports category betting. This includes team victories, defeats, and goals, that are the primary focus of this model's initial training on historical datasets. The training provides the ability to further predict probabilities of each teams victory during live matches.

`Seamless Frontend Integration`, The backend Flask application and our user-friendly JavaScript (React) frontend work together flawlessly. Users can easily place and follow their bets thanks to this integration, which guarantees real-time updates and seamless user experiences. 

# Deploy Locally
Clone or download the repository. Install the required packages `npm install`. Same goes for the Machine learning model in Python.
- `npm run dev`
- Navigate to /backend & `node server.js`
- Navigate to /ML & `python model.py`
- Since our website needs direct interaction with the **Near** Wallet, it needs to be deployed publicly. The solution to this is to port forward, in our case, using Ngrok: `ngrok http 5173` where port `5173` is Vite's default port.
- Make a Near Wallet account
- Sign up
- Login & Enjoy!


# Deployable Demo 

coming soon

# 
