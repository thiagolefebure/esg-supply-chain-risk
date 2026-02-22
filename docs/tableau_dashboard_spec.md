# Tableau Dashboard Spec (Portfolio)

## Primary datasource
Use `outputs/cleaned_master_dataset.csv`

### Core dimensions
- `supplier_id`, `supplier_name`
- `country`, `region`
- `category`, `tier`, `dependency_level`
- `traceability_level`, `charter_signed`, `made_in_disclosed`

### Core measures
- `annual_spend_chf`
- `env_score`, `social_score`, `governance_score`
- `risk_score`, `risk_class`
- `incident_penalty`, `audit_score`, `non_compliance_level`
- `esg_completeness`

---

## Dashboard pages

### 1) Executive overview
**KPI tiles**
- % suppliers by risk class
- Total spend exposure (CHF) by risk class
- % suppliers audited
- % missing ESG fields (1 - avg(esg_completeness))

**Visuals**
- Bar: suppliers by risk class
- Bar: spend by risk class
- Bar: top categories by spend exposure (high + medium risk)

### 2) Risk × Spend matrix
**Scatter plot**
- X: `annual_spend_chf` (log scale)
- Y: `risk_score`
- Color: `risk_class`
- Tooltip: supplier details + recommended action

### 3) Supplier deep dive
**Filters**
- Supplier ID / Category / Country / Tier / Risk class

**Views**
- ESG pillar bars (E, S, G)
- Audit & compliance panel
- Incidents table (type, pillar, severity, date)

### 4) Data quality / governance
**KPIs**
- Completeness by category
- Staleness: days since `last_update`
- % suppliers missing any pillar score

---

## Interaction design
- Click a supplier in the matrix → opens deep dive via dashboard actions
- Use parameters for dynamic thresholds if you want to show “what-if” scoring
