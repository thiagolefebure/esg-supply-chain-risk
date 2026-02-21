# Storyboard Tableau – Pilotage des risques ESG fournisseurs (cas simulé)

Ce storyboard décrit un dashboard Tableau “client-ready” aligné avec une politique d’achats responsables : approche **risk-based**, traçabilité, audits et plans de progrès.

## 0) Sources de données
Utiliser l’export unique : `outputs/cleaned_master_dataset.csv` (grain = 1 ligne / fournisseur).

Champs clés :
- `supplier_id` (clé)
- `supplier_name`
- `country`, `region`, `country_risk_level`
- `category`, `tier`, `dependency_level`
- `annual_spend_chf`
- `env_score`, `social_score`, `governance_score`
- `risk_score` (0–100+), `risk_band` (Low/Medium/High)
- `has_incident`, `incident_severity_max`, `incident_count`
- `last_audit_date`, `audit_score`, `non_compliance_flag`
- `data_quality_completeness` (0–1), `last_update_date`

> Objectif : limiter les joints multiples dans Tableau (robustesse + performance).

---

## 1) Dashboard 1 – **Vue Exécutive**
**But** : donner un état des lieux en 30 secondes et déclencher les bons arbitrages.

### KPI Cards (en haut)
- % fournisseurs **High Risk**
- **Spend exposé** High Risk (CHF)
- % fournisseurs évalués ESG (scores non nuls)
- % fournisseurs avec audit < 24 mois
- Nb incidents (12 derniers mois)

### Visuels
1. **Bar** : Spend exposé par `risk_band` (tri décroissant)
2. **Carte** : Spend exposé par pays (ou symbol map) + filtre `risk_band`
3. **Top 10** : fournisseurs critiques (table) :
   - supplier_name, annual_spend_chf, risk_score, social_score, country, last_audit_date, incident_severity_max

### Actions
- Clic sur un fournisseur (Top 10) → navigation vers Dashboard 3 “Fiche Fournisseur”
- Clic sur un pays → filtre global pays

---

## 2) Dashboard 2 – **Matrice Risque × Criticité (Priorisation)**
**But** : prioriser audits / plans d’action en combinant risque et dépendance économique.

### Visuel principal (scatter)
- X : `annual_spend_chf`
- Y : `risk_score`
- Taille : `dependency_level` (ou `annual_spend_chf` si préféré)
- Couleur : `risk_band`
- Tooltip : supplier_name, country, tier, env/social/gov, has_incident, last_audit_date, non_compliance_flag

### Zones
- Ajouter 2 lignes de référence :
  - `risk_score` = 70 (seuil High)
  - `annual_spend_chf` = P80 (80e percentile) pour définir “critique”

### Actions
- Sélection d’un point → panneau latéral “mini-fiche” (ou paramètre + sheet tooltip)
- Bouton “Voir fiche fournisseur” → Dashboard 3

---

## 3) Dashboard 3 – **Fiche Fournisseur (Drill-down)**
**But** : analyser un fournisseur en détail et décider d’un plan.

### Sections
- **Profil** : pays, région, catégorie, tier, dépendance, spend
- **ESG** : 3 jauges (E/S/G) + indicateur “pilier critique” (min(E,S,G))
- **Audit & conformité** : audit_score, last_audit_date, non_compliance_flag
- **Incidents** : incident_count, incident_severity_max, derniers incidents (table)

### Indicateurs décisionnels
- “Action recommandée” (calcul) :
  - High Risk + spend élevé → **Audit prioritaire**
  - Non-compliance = True → **Plan d’action immédiat**
  - Social_score < 45 → **Priorité S / droits humains**
- “Délai cible” :
  - non-conformité majeure → immédiat
  - non-conformité mineure → 6 mois (logique policy)

---

## 4) Dashboard 4 – **Qualité des données & Traçabilité**
**But** : sécuriser l’auditabilité et la crédibilité du reporting.

### Visuels
- Complétude moyenne (card) + distribution (histogram)
- Tableau “champs manquants” par fournisseur critique
- Dernière mise à jour (max last_update_date) + liste des sources (si ajouté)
- % fournisseurs sans audit / audit trop ancien

### Actions
- Filtre “Critique” = spend top 20% OU risk_band=High
- Export liste des fournisseurs avec complétude < 0.8

---

## 5) Filtres globaux recommandés
- Période (si incidents datés)
- `risk_band`
- `country_risk_level`
- `category`
- `tier`
- `dependency_level`

---

## 6) Champs calculés (suggestions)
- `spend_exposed_high` : IF risk_band='High Risk' THEN annual_spend_chf END
- `pillar_min` : MIN([env_score],[social_score],[governance_score])
- `audit_age_months` : DATEDIFF('month',[last_audit_date],TODAY())
- `audit_overdue_flag` : [audit_age_months] > 24
- `priority_bucket` :
  - IF [risk_band]='High Risk' AND [annual_spend_chf] >= {FIXED: PERCENTILE([annual_spend_chf],0.8)} THEN 'P1'
  - ELSEIF [risk_band]='High Risk' THEN 'P2'
  - ELSE 'P3' END

---

## 7) Messages (storytelling) à afficher dans le dashboard
- “Le score global n’est **pas compensatoire** : les piliers ESG restent visibles (E/S/G).”
- “La priorisation combine **risque** et **criticité économique** (spend & dépendance).”
- “La qualité des données est suivie pour garantir l’**auditabilité**.”
