# ESG Supply Chain Risk Intelligence (Cas simulé) – Version FR

## Objectif
Simuler un système de pilotage des risques ESG fournisseurs pour des achats responsables : consolidation des données, contrôles qualité, scoring explicable et priorisation via une matrice **Risque × Dépense**.

## Contenu
- `data/` : données simulées (1000 fournisseurs)
- `notebooks/` : notebook d’analyse Python
- `outputs/` : exports prêts pour Tableau
- `docs/` : spécifications (dont storyboard Tableau FR)

## Démarrage rapide
1. Ouvrir `notebooks/esg_risk_analysis.ipynb` et exécuter toutes les cellules
2. Charger `outputs/cleaned_master_dataset.csv` dans Tableau
3. Suivre `docs/tableau_storyboard_fr.md` pour reproduire le dashboard

## Points forts
- Approche **risk-based** (matrice probabilité/gravité + spend & dépendance)
- Traçabilité (audits, incidents, complétude)
- Score non “compensatoire” : visibilité E/S/G pour éviter l’effet de compensation
