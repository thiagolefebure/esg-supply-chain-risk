# ESG Supply Chain Risk Intelligence Platform (Simulated Case Study)

**Goal:** Demonstrate an end-to-end responsible procurement analytics workflow:
- Consolidate supplier, ESG, audit and incident data
- Ensure **data quality** and traceability (portfolio-friendly governance)
- Build an explainable **risk scoring** model
- Prioritize actions via a **Risk × Spend** matrix
- Provide Tableau-ready outputs and a presentation deck

> **Disclaimer:** All data is simulated and does not represent any real company, supplier, or country risk profile.

---

## Repository structure

- `data/` – raw simulated datasets (CSV)
- `notebooks/` – Python analysis (Jupyter)
- `outputs/` – curated datasets for Tableau + scoring results
- `docs/` – dashboard spec + calculated fields
- `presentation.pptx` – 6-slide pitch deck

---

## Datasets (CSV)

1) `data/suppliers.csv`
- Supplier master data (category, tier, spend, traceability, etc.)

2) `data/esg_scores.csv`
- ESG pillar scores (E/S/G) + last update + source

3) `data/audits.csv`
- Audit status, scores, non-compliance severity, deadlines

4) `data/incidents.csv`
- ESG incidents (type, pillar, severity, date)

---

## Method (high level)

### 1) Data quality
- Missingness profiling and completeness KPI (`esg_completeness`)
- Light imputation *for scoring only* (median by category → overall median)

### 2) Explainable risk score
A composite score combining:
- Pillar ESG gaps (100 - E/S/G scores)
- Inherent risk (simulated `country_risk_weight`)
- Operational risk drivers (tier, dependency, traceability)
- Compliance signals (audits + incidents)

### 3) Decisions
- `risk_class` thresholds (Low / Medium / High)
- `recommended_action` rules for mitigation, audits, monitoring

---

## Run the analysis

From the `notebooks/` folder:
1. Open `esg_risk_analysis.ipynb`
2. Run all cells
3. Outputs are written to `outputs/`

---

## Tableau dashboard (build guide)

See:
- `docs/tableau_dashboard_spec.md`
- `docs/tableau_calculated_fields.txt`

Use `outputs/cleaned_master_dataset.csv` as your primary Tableau data source.

---

## Suggested slide pitch (what to say in interview)

> “I built a simulated responsible procurement system: data consolidation, quality controls, an explainable ESG risk score, and a dashboard for prioritizing suppliers by risk and spend. The goal is to turn ESG reporting into a decision tool.”

---

## License
MIT (optional – add if you plan to publish publicly).
