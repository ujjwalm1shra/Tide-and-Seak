# Tide&Seak

### Intelligent Freight Forecasting & Vessel Chartering Decision Support

**Tide&Seak** is an AI-powered maritime intelligence platform designed to help cargo owners, charterers, and logistics teams make more informed vessel chartering decisions.

The platform combines **freight-rate forecasting, voyage economics, vessel/cargo intelligence, scenario simulation, and data-driven decision support** into a unified workspace.

> **Predict the market. Simulate the decision. Charter with confidence.**

---

## Overview

Chartering a vessel is a time-sensitive decision made under uncertainty.

Freight rates fluctuate. Vessel availability changes. Route economics shift. Fuel costs move. Waiting too long can increase exposure, while chartering too early can leave money on the table.

Tide&Seak is being built around a simple question:

> **Given the available market and voyage data, what is the most rational chartering decision right now?**

The platform transforms raw maritime and market data into actionable intelligence through a combination of:

* Historical data analysis
* Machine learning
* Freight-rate forecasting
* Voyage-level economic modelling
* Scenario simulation
* Route and vessel intelligence
* Persistent data storage
* RESTful APIs
* Interactive visualisation

---

## Core Capabilities

### Predict

Forecast freight-rate movement across **routes, vessel classes, and time horizons**.

The prediction engine is designed to combine historical market behaviour with relevant operational and economic features to produce:

* Forecasted freight rates
* Historical vs. predicted trends
* Confidence / uncertainty ranges
* Route-specific forecasts
* Vessel-class comparisons
* Feature-driven market insights

---

### Simulate

Evaluate the economics of different chartering strategies before committing.

Tide&Seak enables users to compare scenarios such as:

**Charter Now**

vs.

**Wait & Charter Later**

Scenario analysis can incorporate variables such as:

* Freight-rate projections
* Vessel costs
* Voyage duration
* Fuel assumptions
* Port-related costs
* Market uncertainty
* Expected upside/downside
* Timing sensitivity

The goal is not simply to predict the market — it is to understand **how a prediction changes the decision**.

---

### Optimize

The planned decision layer will combine forecast outputs with voyage economics to identify potentially preferable chartering strategies.

Rather than treating forecasting as an isolated ML problem, Tide&Seak aims to connect:

**Market Forecast → Voyage Economics → Scenario Analysis → Decision**

This creates a decision-support pipeline rather than a standalone prediction model.

---

## System Architecture

```text
                    ┌─────────────────────────┐
                    │       Tide&Seak UI      │
                    │                         │
                    │ Predict · Simulate ·    │
                    │ Optimize · Analytics    │
                    └────────────┬────────────┘
                                 │
                                 │ REST API
                                 ▼
                    ┌─────────────────────────┐
                    │      FastAPI Backend    │
                    │                         │
                    │ API Layer               │
                    │ Validation              │
                    │ Business Logic          │
                    │ Authentication          │
                    └────────────┬────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │ Data Pipeline│ │ ML Pipeline  │ │ Decision     │
        │              │ │              │ │ Engine       │
        │ Cleaning     │ │ Feature Eng. │ │ Simulation   │
        │ Validation   │ │ Training     │ │ Economics    │
        │ Transformation│ │ Evaluation  │ │ Optimization │
        └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
               │                │                │
               └────────────────┼────────────────┘
                                ▼
                    ┌─────────────────────────┐
                    │        Supabase         │
                    │                         │
                    │ PostgreSQL Database     │
                    │ Authentication          │
                    │ Persistent Application  │
                    │ Data                    │
                    └─────────────────────────┘
```

---

# Machine Learning Pipeline

Tide&Seak treats forecasting as a complete machine-learning pipeline rather than a single model.

### 1. Data Ingestion

Collect and consolidate historical freight, route, vessel, and relevant market variables.

Potential data sources include:

* Freight-rate histories
* Vessel characteristics
* Route information
* Voyage economics
* Fuel-related variables
* Port and operational variables
* Temporal market indicators

---

### 2. Data Preparation

Raw maritime datasets are transformed into model-ready representations through:

* Missing-value handling
* Outlier analysis
* Data validation
* Feature transformation
* Temporal alignment
* Categorical encoding
* Feature scaling where appropriate
* Leakage prevention

The objective is to create a reproducible data pipeline rather than manually prepared datasets.

---

### 3. Feature Engineering

Potential predictive features include:

* Historical freight-rate lags
* Rolling averages
* Rate volatility
* Route characteristics
* Vessel-class information
* Seasonal patterns
* Time-based features
* Market momentum
* Voyage economics
* Fuel-cost indicators

Feature engineering is treated as a first-class component of the forecasting system.

---

### 4. Model Development

The experimentation layer is designed to support multiple machine-learning approaches rather than relying on a single estimator.

Planned models include:

* Linear / Ridge Regression
* Random Forest
* Gradient Boosting
* XGBoost
* Other tree-based ensemble methods
* Time-series forecasting approaches where appropriate

Models will be evaluated using suitable regression metrics such as:

* MAE
* RMSE
* R²
* MAPE where appropriate

Model selection will be based on **out-of-sample performance and generalisation**, rather than training accuracy alone.

---

## Explainability

A prediction is only useful when its reasoning can be investigated.

Where applicable, Tide&Seak will incorporate model interpretation techniques to analyse which variables contribute most strongly to predicted freight-rate movement.

This enables users to move beyond:

> "The model predicts the rate will increase."

towards:

> "The model predicts an increase, with recent rate momentum, seasonal behaviour, and route-specific variables contributing significantly to the forecast."

---

# Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Three.js
* WebGL
* Responsive UI

The current interface includes an interactive 3D Earth visualisation with route arcs, vessel markers, geographic labels, and interactive camera controls.

### Backend

* Python
* FastAPI
* REST APIs
* Pydantic
* Uvicorn

### Machine Learning

* Python
* NumPy
* Pandas
* Scikit-learn
* XGBoost
* Matplotlib
* Seaborn

Additional forecasting and interpretability libraries may be introduced as the modelling pipeline evolves.

### Database & Infrastructure

* Supabase
* PostgreSQL
* Docker
* Git
* GitHub

---

# Data & ML Architecture

```text
Raw Maritime Data
       │
       ▼
┌─────────────────┐
│ Data Validation  │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Data Cleaning    │
│ & Transformation │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Feature          │
│ Engineering      │
└────────┬────────┘
         ▼
┌────────────────────────────┐
│ Train / Validation / Test  │
│ Split                      │
└────────────┬───────────────┘
             ▼
      Model Experiments
             │
      ┌──────┼─────────┐
      ▼      ▼         ▼
    RF    XGBoost   Regression
      │      │         │
      └──────┼─────────┘
             ▼
      Model Evaluation
             │
             ▼
      Selected Model
             │
             ▼
      FastAPI Inference
             │
             ▼
        Tide&Seak UI
```

---

# Decision-Support Layer

A central design principle of Tide&Seak is that **forecasting alone is not the end product**.

A freight-rate prediction becomes valuable when it can influence a real chartering decision.

The decision-support layer therefore connects predictive outputs with voyage-level economics.

### Example workflow

```text
Market Data
     ↓
Freight Forecast
     ↓
Expected Rate Range
     ↓
Voyage Economics
     ↓
Charter-Now Scenario
     ↕
Wait Scenario
     ↓
Risk / Cost Comparison
     ↓
Decision Support
```

This allows users to explore questions such as:

* Is chartering now economically favourable?
* What happens if rates move against the current assumption?
* How sensitive is the voyage to freight-rate changes?
* What is the cost of waiting?
* Which scenario provides the better risk-adjusted outcome?

---

# Interactive Maritime Visualisation

The platform's visual layer is designed to provide geographic context alongside analytical outputs.

The current homepage uses **Three.js/WebGL** to render an interactive 3D Earth with:

* Route visualisation
* Geographic nodes
* Animated vessel markers
* Interactive orbit controls
* Atmospheric rendering
* Route trajectories
* Responsive camera projection

The route system converts latitude/longitude coordinates into 3D globe coordinates and renders curved maritime paths between locations.

This visual layer is intended to evolve into a richer operational map for route, vessel, and market intelligence.

---

# Backend API

The FastAPI service will expose the analytical capabilities of Tide&Seak through modular REST endpoints.

Example endpoint structure:

```text
/api
│
├── /auth
│   ├── login
│   └── register
│
├── /routes
│   ├── list
│   └── details
│
├── /vessels
│   ├── list
│   └── details
│
├── /forecast
│   ├── predict
│   └── history
│
├── /simulation
│   ├── create
│   └── compare
│
└── /analytics
    ├── market
    └── voyage
```

The API layer separates application logic from the frontend, allowing the ML and decision engines to evolve independently from the presentation layer.

---

# Database

Supabase provides the persistence layer for application and analytical data.

Potential relational entities include:

```text
Users
  │
  ├── Saved Routes
  ├── Saved Vessels
  ├── Forecasts
  └── Simulations

Routes
  │
  ├── Ports
  ├── Vessel Classes
  └── Historical Rates

Forecasts
  │
  ├── Model Version
  ├── Prediction
  ├── Confidence Range
  └── Timestamp

Simulations
  │
  ├── Scenario A
  ├── Scenario B
  ├── Assumptions
  └── Results
```

---

# Project Structure

The target architecture is designed to separate the frontend, backend, machine-learning pipeline, and infrastructure:

```text
Tide-and-Seak/
│
├── frontend/
│   ├── pages/
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── core/
│   │
│   └── main.py
│
├── ml/
│   ├── data/
│   ├── preprocessing/
│   ├── features/
│   ├── models/
│   ├── evaluation/
│   └── notebooks/
│
├── tests/
│
├── docker/
│
├── requirements.txt
├── .env.example
├── docker-compose.yml
└── README.md
```

---

# Development Roadmap

Tide&Seak is being developed incrementally from a visual prototype into a complete analytical platform.

### Phase I — Product Foundation

* [x] Responsive landing page
* [x] Predict workspace concept
* [x] Simulation workspace concept
* [x] Authentication interface
* [x] Interactive 3D globe
* [x] Maritime route visualisation
* [x] Responsive navigation
* [x] FAQ and informational pages

The current repository implements this frontend foundation.

### Phase II — Backend

* [ ] FastAPI application
* [ ] REST API architecture
* [ ] Request validation
* [ ] Authentication
* [ ] Database integration
* [ ] Route and vessel services
* [ ] Forecast inference API
* [ ] Simulation API

### Phase III — Data & ML

* [ ] Maritime dataset acquisition
* [ ] Data ingestion pipeline
* [ ] Data validation
* [ ] Feature engineering
* [ ] Baseline regression models
* [ ] Random Forest experiments
* [ ] XGBoost experiments
* [ ] Time-aware model validation
* [ ] Model comparison
* [ ] Model persistence
* [ ] Inference pipeline

### Phase IV — Decision Intelligence

* [ ] Charter-now vs. wait simulation
* [ ] Voyage economics engine
* [ ] Scenario comparison
* [ ] Sensitivity analysis
* [ ] Risk-adjusted decision support
* [ ] Forecast explainability

### Phase V — Productionisation

* [ ] Dockerised services
* [ ] Production API deployment
* [ ] Database security
* [ ] Automated testing
* [ ] CI/CD
* [ ] Monitoring
* [ ] Model versioning
* [ ] API documentation

---

# Local Development

## Frontend

The current frontend can be run as a static application.

```bash
git clone https://github.com/ujjwalm1shra/Tide-and-Seak.git
cd Tide-and-Seak
```

Open the project with VS Code and serve the frontend through a local development server.

The current frontend relies on external resources including Google Fonts, Three.js, OrbitControls, and Earth textures, so an internet connection is required for the complete visual experience.

---

## Backend

Once the FastAPI backend is available:

```bash
cd backend

python -m venv .venv
```

### Linux / macOS

```bash
source .venv/bin/activate
```

### Windows

```powershell
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn app.main:app --reload
```

API documentation will be available through FastAPI's generated documentation interface.

---

# Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
SUPABASE_URL=
SUPABASE_KEY=

MODEL_PATH=

API_ENV=development
```

**Never commit secrets or production credentials to Git.**

---

# Docker

Tide&Seak is designed to be deployable as containerised services.

Target architecture:

```text
                 ┌───────────────┐
                 │   Frontend    │
                 │    Nginx      │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │   FastAPI     │
                 │    API        │
                 └───────┬───────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
       ┌─────────────┐       ┌─────────────┐
       │ ML Inference│       │  Supabase   │
       │   Service   │       │ PostgreSQL  │
       └─────────────┘       └─────────────┘
```

---

# Design Principles

### Data First

Models are only as reliable as the data and validation pipeline behind them.

### Decision Over Prediction

A forecast is useful only when it improves a decision.

### Modular Architecture

Frontend, API, ML, and data layers should evolve independently.

### Reproducibility

Data processing and model experiments should be reproducible and version-controlled.

### Explainability

Where practical, predictions should be interpretable rather than treated as opaque outputs.

### Production Mindset

The project is designed with deployment, testing, security, and maintainability in mind from the beginning.

---

# Current Status

**Tide&Seak is an actively evolving project.**

The repository currently contains the frontend/product prototype and interactive visual foundation. Backend services, persistent storage, machine-learning pipelines, forecasting infrastructure, and decision-support engines are being developed as subsequent phases of the platform.

The goal is to evolve the project from:

```text
Static Product Prototype
        ↓
Full-Stack Platform
        ↓
ML Forecasting System
        ↓
Decision Intelligence Platform
```

---

# Why Tide&Seak?

Traditional freight analysis often requires combining information from multiple sources before a chartering decision can be made.

Tide&Seak aims to bring these components together into one analytical workflow:

**Market Data**

→ **Forecast**

→ **Voyage Economics**

→ **Scenario Simulation**

→ **Risk Analysis**

→ **Chartering Decision**

The long-term objective is to build a practical intelligence layer between **raw maritime data and real-world chartering decisions**.

---

## Built With

`Python` · `FastAPI` · `Scikit-learn` · `XGBoost` · `Pandas` · `NumPy` · `Supabase` · `PostgreSQL` · `JavaScript` · `Three.js` · `HTML5` · `CSS3` · `REST APIs` · `Docker` · `Git`

---

## Repository

**GitHub:** https://github.com/ujjwalm1shra/Tide-and-Seak

---

## Disclaimer

Tide&Seak is an experimental software and research project intended for analytical and educational purposes.

Forecasts and scenario outputs should not be interpreted as financial, commercial, or chartering advice. Real-world decisions should incorporate validated market data, professional expertise, contractual considerations, and operational constraints.
