# Team 23 — IMI Big Data & AI Competition (Scotiabank)

## Project Overview

This repository contains three interconnected deliverables for AML (Anti-Money Laundering) detection:

| Task | Name | Description |
|------|------|-------------|
| Task 1 | AML Knowledge Library | React web app — structured reference mapping 17 red flag indicators to 15 regulatory sources and 7 AML typologies |
| Task 2 | Bad Actor Detection Model | Isolation Forest on Scotiabank transaction data with SHAP/LIME explainability |
| Task 3 | RAG Explainability Layer | Retrieval-Augmented Generation pipeline that maps SHAP values to Knowledge Library indicators and generates regulatory-grade justification narratives |

---

## Task 1 — AML Knowledge Library (React App)

### Requirements

- Node.js ≥ 16
- npm ≥ 8

### Run locally

```bash
cd my-app
npm install
npm start
```

Opens at **http://localhost:3000**

### Build for production

```bash
cd my-app
npm run build
```

Output goes to `my-app/build/`. The `build/` folder contains the latest production build and can be served statically.

### App structure

All data (indicators, typologies, sources, feature map) is embedded directly in:

```
my-app/src/aml_dashboard.jsx
```

No external API calls. To extend the library, add entries to the `SOURCES`, `INDICATORS`, `TYPOLOGIES`, or `FEATURE_MAP` arrays in that file.

---

## Task 2 — Bad Actor Detection Model

### Requirements

```bash
pip install pandas numpy scikit-learn shap joblib openpyxl
```

### Files

| File | Description |
|------|-------------|
| `final model.ipynb` | Isolation Forest training, feature engineering, risk scoring |
| `iso_forest_individual.joblib` | Saved model — individual accounts |
| `iso_forest_business.joblib` | Saved model — business accounts |
| `features.csv` | Engineered feature matrix (output of `final model.ipynb`) |
| `model_output_individual_accounts.csv` | Risk scores for individual accounts |
| `model_output_business_accounts.csv` | Risk scores for business accounts |

### Run

Open and run `final model.ipynb` top to bottom. Requires `kyc_individual.csv` and `kyc_smallbusiness.csv` as input data.

---

## Task 3 — RAG Explainability Layer

### Requirements

```bash
pip install pandas numpy shap pdfplumber scikit-learn joblib google-generativeai openpyxl
```

### Files

| File | Description |
|------|-------------|
| `explanation model.ipynb` | Full RAG pipeline — SHAP → indicator mapping → Gemini prompt → narrative |
| `feature_indicator_map.json` | JSON lookup exported from Task 1: maps each model feature to its Knowledge Library indicator ID(s) |
| `feature_description.xlsx` | Human-readable feature descriptions and AML rationale |
| `static/` | PDF source documents used for supplementary retrieval |
| `model_output_explanations_bus.csv` | Generated narratives — business accounts |
| `model_output_explanations_ind.csv` | Generated narratives — individual accounts |

### Configuration

In `explanation model.ipynb`, set your Gemini API key in the config cell:

```python
GEMINI_API_KEY = "your-key-here"
GEMINI_MODEL   = "gemini-2.5-flash-lite"
```

### Architecture

Task 3 is a consumer of Task 1's output. The pipeline is:

```
SHAP values
    ↓
feature_indicator_map.json  ←── exported from Task 1 Knowledge Library
    ↓
Indicator objects (IND-01 … IND-17)
    ↓  with: detection rule, threshold, typology, source citations
LLM prompt (Gemini)
    ↓
Regulatory-grade justification narrative
    (cites indicators by ID and source documents by name)
```

### Run

Open `explanation model.ipynb` and run cells in order. The batch cells (business ~35 min, individual ~4–5 hr) use the Gemini Batch API and write to `.jsonl` files before processing responses.

---

## Repository Structure

```
Team23/
├── my-app/                          # Task 1 — React app
│   ├── src/aml_dashboard.jsx        # All Knowledge Library data + UI
│   ├── build/                       # Production build (pre-built)
│   └── package.json
├── final model.ipynb                # Task 2 — Isolation Forest
├── explanation model.ipynb          # Task 3 — RAG pipeline
├── feature_indicator_map.json       # Task 1→3 bridge: feature→indicator lookup
├── feature_description.xlsx         # Feature descriptions for prompt building
├── model_output_individual_accounts.csv
├── model_output_business_accounts.csv
├── model_output_explanations_bus.csv
├── model_output_explanations_ind.csv
└── static/                          # PDF source documents for RAG
```
