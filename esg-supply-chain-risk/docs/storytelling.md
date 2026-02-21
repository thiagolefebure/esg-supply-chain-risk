# Storytelling (Interview-ready)

## 15-second summary
I built a simulated responsible procurement system that consolidates supplier ESG signals, measures data quality, computes an explainable risk score, and prioritizes action using a Risk × Spend matrix—turning ESG reporting into a decision tool.

## 60-second walkthrough
1) **Context**: ESG and regulatory pressure require stronger supply-chain risk control.
2) **Data**: Consolidated four sources (supplier master, ESG scores, audits, incidents) into one master dataset keyed by `supplier_id`.
3) **Governance**: Added KPIs for completeness and staleness; kept raw values and used light imputation **only for scoring**.
4) **Model**: Built an explainable score combining E/S/G gaps, inherent risk, operational drivers (tier, dependency, traceability) and compliance signals (audits, incidents).
5) **Decision**: Classified suppliers into Low/Medium/High risk and proposed standard actions (audit, mitigation plan, monitoring).
6) **Delivery**: Tableau-ready exports + pitch deck.

## What to emphasize for a Responsible Procurement role
- Traceability, auditability, and process documentation
- Avoiding ESG “compensation” (keep pillar-level visibility, thresholds)
- Prioritization (focus on suppliers that are both risky and financially critical)
