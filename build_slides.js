const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

// ESG Supply Chain Risk Intelligence (Simulated) – Portfolio deck

const ROOT = __dirname;
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'slide_data.json'), 'utf8'));
const MATRIX_IMG = path.join(ROOT, 'outputs', 'risk_spend_matrix.png');

function fmtMchf(x) {
  return `${(x / 1_000_000).toFixed(1)}M CHF`;
}

function addHeader(slide, title) {
  slide.addText(title, {
    x: 0.6,
    y: 0.35,
    w: 12.2,
    h: 0.6,
    fontFace: 'Calibri',
    fontSize: 30,
    bold: true,
    color: '1F2937',
  });
}

function addSubheader(slide, text) {
  slide.addText(text, {
    x: 0.6,
    y: 1.05,
    w: 12.2,
    h: 0.5,
    fontFace: 'Calibri',
    fontSize: 16,
    color: '374151',
  });
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.6,
    y: 7.05,
    w: 12.2,
    h: 0.3,
    fontFace: 'Calibri',
    fontSize: 10,
    color: '6B7280',
  });
}

// --- Build PPTX
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Thiago Lefebure';
pptx.company = 'Portfolio (simulated case study)';

// Theme (keep it Swiss: minimal)
pptx.theme = {
  headFontFace: 'Calibri',
  bodyFontFace: 'Calibri',
  lang: 'fr-FR',
};

// =============== Slide 1: Title
{
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.35, fill: { color: '111827' } });
  slide.addText('ESG Supply Chain Risk Intelligence', {
    x: 0.6,
    y: 0.35,
    w: 12.2,
    h: 0.7,
    fontFace: 'Calibri',
    fontSize: 34,
    bold: true,
    color: 'FFFFFF',
  });
  slide.addText('Portfolio case study • Responsible procurement risk scoring & dashboarding (simulated data)', {
    x: 0.6,
    y: 1.55,
    w: 12.2,
    h: 0.4,
    fontFace: 'Calibri',
    fontSize: 16,
    color: '374151',
  });
  slide.addText('Thiago Lefebure', {
    x: 0.6,
    y: 2.15,
    w: 12.2,
    h: 0.4,
    fontFace: 'Calibri',
    fontSize: 18,
    bold: true,
    color: '111827',
  });
  slide.addText('Data Analyst • ESG • Data Governance', {
    x: 0.6,
    y: 2.55,
    w: 12.2,
    h: 0.35,
    fontFace: 'Calibri',
    fontSize: 14,
    color: '374151',
  });
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 3.25, w: 12.2, h: 0.9, fill: { color: 'F3F4F6' }, line: { color: 'E5E7EB' } });
  slide.addText('Disclaimer: All datasets and results are simulated for demonstration purposes.', {
    x: 0.9,
    y: 3.45,
    w: 11.6,
    h: 0.5,
    fontFace: 'Calibri',
    fontSize: 12,
    color: '374151',
  });
  addFooter(slide, '© Portfolio case study (simulated)');
  slide.addNotes(`
[Sources]\n- Simulated dataset generated for portfolio.\n[/Sources]\n`);
}

// =============== Slide 2: Problem & objectives
{
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };
  addHeader(slide, 'Problem & objectives');
  addSubheader(slide, 'Turn supplier ESG data into a decision tool (risk-based approach)');

  slide.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.75, w: 5.95, h: 5.0, fill: { color: 'F9FAFB' }, line: { color: 'E5E7EB' } });
  slide.addText('Typical challenges', {
    x: 0.9,
    y: 2.05,
    w: 5.4,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: '111827',
  });
  slide.addText(
    [
      'Dispersed sources (ERP + questionnaires + ratings + audits)',
      'Heterogeneous formats and missing values',
      'Need for traceability and auditability',
      'Prioritization: where to audit / mitigate first',
    ].join('\n'),
    {
      x: 0.95,
      y: 2.45,
      w: 5.4,
      h: 4.1,
      fontSize: 13,
      color: '374151',
      bullet: { indent: 18 },
      paraSpaceAfter: 6,
    }
  );

  slide.addShape(pptx.ShapeType.rect, { x: 6.75, y: 1.75, w: 6.05, h: 5.0, fill: { color: '111827' }, line: { color: '111827' } });
  slide.addText('This case study delivers', {
    x: 7.05,
    y: 2.05,
    w: 5.5,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: 'FFFFFF',
  });
  slide.addText(
    [
      'A consolidated supplier “master dataset”',
      'Data quality KPIs (completeness, staleness)',
      'Explainable ESG risk score (E/S/G + signals)',
      'Risk × Spend matrix to prioritize action',
      'Tableau-ready exports for dashboards',
    ].join('\n'),
    {
      x: 7.1,
      y: 2.45,
      w: 5.45,
      h: 4.1,
      fontSize: 13,
      color: 'FFFFFF',
      bullet: { indent: 18 },
      paraSpaceAfter: 6,
    }
  );

  addFooter(slide, 'All metrics on the next slides are simulated.');
  slide.addNotes(`
[Sources]\n- Simulated dataset generated for portfolio.\n[/Sources]\n`);
}

// =============== Slide 3: Data model
{
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };
  addHeader(slide, 'Data model (simulated)');
  addSubheader(slide, 'Four tables merged into a single analytics-ready dataset');

  const box = (x, y, w, h, title, bullets) => {
    slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, fill: { color: 'F9FAFB' }, line: { color: 'E5E7EB' } });
    slide.addText(title, { x: x + 0.25, y: y + 0.2, w: w - 0.5, h: 0.35, fontSize: 14, bold: true, color: '111827' });
    slide.addText((Array.isArray(bullets) ? bullets.join('\n') : bullets), {
      x: x + 0.25,
      y: y + 0.6,
      w: w - 0.5,
      h: h - 0.8,
      fontSize: 12,
      color: '374151',
      bullet: { indent: 14 },
      paraSpaceAfter: 4,
    });
  };

  box(0.8, 1.8, 5.9, 2.1, 'suppliers.csv', [
    'Supplier master data (tier, category, spend)',
    'Traceability flags & charter status',
  ]);
  box(6.8, 1.8, 5.7, 2.1, 'esg_scores.csv', [
    'E / S / G pillar scores',
    'Last update & data source',
  ]);
  box(0.8, 4.2, 5.9, 2.1, 'audits.csv', [
    'Audit score, non-compliance severity',
    'Deadlines & third-party audit flag',
  ]);
  box(6.8, 4.2, 5.7, 2.1, 'incidents.csv', [
    'Incident type, pillar, severity',
    'Used as a risk signal/penalty',
  ]);

  slide.addText('Join key: supplier_id', {
    x: 0.8,
    y: 6.55,
    w: 12.0,
    h: 0.35,
    fontSize: 12,
    italic: true,
    color: '6B7280',
  });
  addFooter(slide, 'Output: cleaned_master_dataset.csv (Tableau-ready)');
  slide.addNotes(`
[Sources]\n- Simulated dataset generated for portfolio.\n[/Sources]\n`);
}

// =============== Slide 4: Key results (charts)
{
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };
  addHeader(slide, 'Key results (simulated)');
  addSubheader(slide, 'Risk distribution and spend exposure');

  // Chart 1: counts
  const riskOrder = ['Low Risk', 'Medium Risk', 'High Risk'];
  const counts = riskOrder.map((k) => DATA.risk_counts[k] || 0);
  const spend = riskOrder.map((k) => DATA.spend_by_risk[k] || 0);

  slide.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.75, w: 6.2, h: 5.2, fill: { color: 'F9FAFB' }, line: { color: 'E5E7EB' } });
  slide.addText('Suppliers by risk class', { x: 0.9, y: 2.0, w: 5.6, h: 0.3, fontSize: 14, bold: true, color: '111827' });
  slide.addChart(
    pptx.ChartType.bar,
    [
      {
        name: 'Suppliers',
        labels: riskOrder,
        values: counts,
      },
    ],
    {
      x: 0.9,
      y: 2.35,
      w: 5.6,
      h: 4.35,
      showLegend: false,
      dataLabelPosition: 'outEnd',
      valGridMajor: { color: 'E5E7EB' },
      catAxisLabelColor: '374151',
      valAxisLabelColor: '374151',
      fontSize: 11,
    }
  );

  // Chart 2: spend
  slide.addShape(pptx.ShapeType.rect, { x: 7.0, y: 1.75, w: 6.2, h: 5.2, fill: { color: 'F9FAFB' }, line: { color: 'E5E7EB' } });
  slide.addText('Spend exposure by risk class (CHF)', { x: 7.3, y: 2.0, w: 5.6, h: 0.3, fontSize: 14, bold: true, color: '111827' });
  slide.addChart(
    pptx.ChartType.bar,
    [
      {
        name: 'Spend (CHF)',
        labels: riskOrder,
        values: spend.map((v) => Math.round(v / 1_000_000 * 10) / 10), // in M CHF
      },
    ],
    {
      x: 7.3,
      y: 2.35,
      w: 5.6,
      h: 4.35,
      showLegend: false,
      dataLabelPosition: 'outEnd',
      valGridMajor: { color: 'E5E7EB' },
      catAxisLabelColor: '374151',
      valAxisLabelColor: '374151',
      fontSize: 11,
      valAxisTitle: 'CHF (millions)',
    }
  );

  // A couple of callouts
  const highSpend = DATA.spend_by_risk['High Risk'] || 0;
  slide.addText(`High-risk spend exposure: ${fmtMchf(highSpend)}`, {
    x: 0.6,
    y: 6.95,
    w: 12.2,
    h: 0.35,
    fontSize: 12,
    color: '111827',
  });
  slide.addNotes(`
[Sources]\n- Simulated dataset generated for portfolio.\n[/Sources]\n`);
}

// =============== Slide 5: Risk × Spend matrix
{
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };
  addHeader(slide, 'Prioritization view');
  addSubheader(slide, 'Risk × Spend matrix to focus audits and mitigation');

  slide.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.75, w: 8.6, h: 5.2, fill: { color: 'F9FAFB' }, line: { color: 'E5E7EB' } });
  slide.addImage({ path: MATRIX_IMG, x: 0.75, y: 1.95, w: 8.3, h: 4.85 });

  slide.addShape(pptx.ShapeType.rect, { x: 9.35, y: 1.75, w: 3.45, h: 5.2, fill: { color: '111827' }, line: { color: '111827' } });
  slide.addText('How to use', { x: 9.6, y: 2.05, w: 3.0, h: 0.3, fontSize: 14, bold: true, color: 'FFFFFF' });
  slide.addText(
    [
      'Top-right: audit & mitigate first',
      'High spend + medium risk: monitor closely',
      'Low spend + high risk: targeted actions',
      'Use drill-down for root causes (E/S/G, audits, incidents)',
    ].join('\n'),
    {
      x: 9.6,
      y: 2.45,
      w: 3.0,
      h: 4.3,
      fontSize: 12,
      color: 'FFFFFF',
      bullet: { indent: 14 },
      paraSpaceAfter: 6,
    }
  );
  addFooter(slide, 'Matrix shown as an illustrative static view; Tableau version enables drill-down.');
  slide.addNotes(`
[Sources]\n- Simulated dataset generated for portfolio.\n[/Sources]\n`);
}

// =============== Slide 6: Recommendations
{
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };
  addHeader(slide, 'Operational recommendations');
  addSubheader(slide, 'Turn ESG reporting into a controlled process and measurable actions');

  slide.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.75, w: 12.7, h: 5.2, fill: { color: 'F9FAFB' }, line: { color: 'E5E7EB' } });
  slide.addText('1) Data governance', { x: 1.0, y: 2.1, w: 5.8, h: 0.3, fontSize: 14, bold: true, color: '111827' });
  slide.addText(
    [
      'Single supplier ID across sources (ERP / questionnaires / audits)',
      'Data quality KPIs: completeness, staleness, audit trail',
      'Clear owners: collection, validation, publication',
    ].join('\n'),
    { x: 1.0, y: 2.45, w: 5.8, h: 1.6, fontSize: 12, color: '374151', bullet: { indent: 14 }, paraSpaceAfter: 5 }
  );

  slide.addText('2) Risk management', { x: 1.0, y: 4.25, w: 5.8, h: 0.3, fontSize: 14, bold: true, color: '111827' });
  slide.addText(
    [
      'Use the Risk × Spend matrix for prioritization',
      'Define thresholds per ESG pillar (avoid “compensation” effects)',
      'Link risk class to standard actions (audit, mitigation plan, monitoring)',
    ].join('\n'),
    { x: 1.0, y: 4.6, w: 5.8, h: 1.8, fontSize: 12, color: '374151', bullet: { indent: 14 }, paraSpaceAfter: 5 }
  );

  // Right side: deliverables
  slide.addShape(pptx.ShapeType.rect, { x: 7.0, y: 2.05, w: 5.9, h: 4.85, fill: { color: '111827' }, line: { color: '111827' } });
  slide.addText('Deliverables included in this repo', { x: 7.3, y: 2.3, w: 5.4, h: 0.35, fontSize: 14, bold: true, color: 'FFFFFF' });
  slide.addText(
    [
      'Simulated datasets (4 tables, 1,000 suppliers)',
      'Python notebook: scoring + exports',
      'Tableau dashboard build spec',
      'Curated outputs: risk_scores.csv',
      'This 6-slide deck',
    ].join('\n'),
    { x: 7.3, y: 2.75, w: 5.4, h: 3.9, fontSize: 12, color: 'FFFFFF', bullet: { indent: 14 }, paraSpaceAfter: 6 }
  );

  addFooter(slide, 'Next step: connect to real ERP + supplier questionnaire data and validate thresholds with stakeholders.');
  slide.addNotes(`
[Sources]\n- Simulated dataset generated for portfolio.\n[/Sources]\n`);
}

// Write file
const outPath = path.join(ROOT, 'presentation.pptx');
pptx.writeFile({ fileName: outPath });
