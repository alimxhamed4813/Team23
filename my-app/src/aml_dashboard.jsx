import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
//  DATA: SOURCES
// ═══════════════════════════════════════════════════════════════
const SOURCES = {
  "FINTRAC-GUC": {
    id: "FINTRAC-GUC",
    org: "FINTRAC",
    title: "Guideline on the Characteristics of Unusual Transactions",
    url: "https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/indicators-indicateurs/msb_mltf-eng",
    url2: "https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/str-dod/str-dod-eng",
    type: "Regulatory",
    country: "Canada",
    year: 2021,
  },
  "FINTRAC-ML": {
    id: "FINTRAC-ML",
    org: "FINTRAC",
    title: "Money Laundering and Terrorist Financing Indicators – Financial Entities",
    url: "https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/indicators-indicateurs/fin_mltf-eng",
    type: "Regulatory",
    country: "Canada",
    year: 2023,
  },
  "FINTRAC-OCG": {
    id: "FINTRAC-OCG",
    org: "FINTRAC",
    title: "Indicators: The financing of domestic organized crime groups",
    url: "https://www.canada.ca/en/department-finance/programs/financial-sector-policy/updated-assessment-inherent-risks-money-laundering-terrorist-financing-canada.html",
    url2: "https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/indicators-indicateurs/fin_mltf-eng",
    type: "Regulatory",
    country: "Canada",
    year: 2023,
  },
  "FINTRAC-TFSB": {
    id: "FINTRAC-TFSB",
    org: "FINTRAC",
    title: "Terrorist Financing and Sanctions Bulletins",
    url: "https://fintrac-canafe.canada.ca/intel/bulletins/sanctions-eng",
    type: "Regulatory",
    country: "Canada",
    year: 2023,
  },
  "FATF-RBA": {
    id: "FATF-RBA",
    org: "FATF",
    title: "Risk-Based Approach Guidance for the Banking Sector",
    url: "https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Risk-based-approach-banking-sector.html",
    type: "International Standard",
    country: "International",
    year: 2014,
  },
  "FATF-OCG": {
    id: "FATF-OCG",
    org: "FATF",
    title: "Money Laundering and Terrorist Financing Vulnerabilities of Legal Persons",
    url: "https://www.fatf-gafi.org/en/publications/Methodsandtrends/Mltf-vulnerabilities-legal-professionals.html",
    type: "International Standard",
    country: "International",
    year: 2010,
  },
  "FATF-WIRE": {
    id: "FATF-WIRE",
    org: "FATF",
    title: "FATF Guidance on the Risk-Based Approach – Wire Transfers",
    url: "https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Rba-money-or-value-transfer.html",
    type: "International Standard",
    country: "International",
    year: 2013,
  },
  "FINCEN-SAR": {
    id: "FINCEN-SAR",
    org: "FinCEN",
    title: "SAR Activity Review – Trends, Tips & Issues",
    url: "https://www.fincen.gov/sar-activity-review-trends-tips-issues",
    type: "Regulatory",
    country: "USA",
    year: 2022,
  },
  "FINCEN-STRUCT": {
    id: "FINCEN-STRUCT",
    org: "FinCEN",
    title: "Advisory on Structuring",
    url: "https://www.fincen.gov/resources/statutes-regulations/administrative-rulings/suspicious-activity-reporting-structuring",
    type: "Regulatory",
    country: "USA",
    year: 2019,
  },
  "JULLUM2020": {
    id: "JULLUM2020",
    org: "Academic",
    title: "Detecting Money Laundering Transactions with Machine Learning",
    url: "https://doi.org/10.1108/JMLC-07-2019-0055",
    type: "Academic",
    country: "Norway (DNB)",
    year: 2020,
    authors: "Jullum et al.",
    journal: "Journal of Money Laundering Control, 23(1)",
  },
  "TFFEAT2023": {
    id: "TFFEAT2023",
    org: "Academic",
    title: "A Time-Frequency Based Suspicious Activity Detection for Anti-Money Laundering",
    url: null,
    type: "Academic",
    country: "—",
    year: 2023,
    authors: "et al.",
    file: "A_Time-Frequency_Based_Suspicious_Activity_Detection_for_Anti-Money_Laundering.pdf",
  },
  "UNSUP2022": {
    id: "UNSUP2022",
    org: "Academic",
    title: "Anomaly Detection Using Unsupervised Machine Learning Algorithms",
    url: null,
    type: "Academic",
    country: "—",
    year: 2022,
    authors: "et al.",
    file: "Anomaly detection using unsupervised machine learning algorithms.pdf",
  },
  "FEENG2023": {
    id: "FEENG2023",
    org: "Academic",
    title: "Feature Engineering for Transaction Anomalies",
    url: null,
    type: "Academic",
    country: "—",
    year: 2023,
    authors: "et al.",
    file: "FeatureEngineeringforTransactionAnomalies.pdf",
  },
  "SCORE2021": {
    id: "SCORE2021",
    org: "Academic",
    title: "Developing a Scoring Model for Managing Money Laundering Transactions Using ML",
    url: null,
    type: "Academic",
    country: "—",
    year: 2021,
    authors: "et al.",
    file: "developing a scoring model for managing money laundering transactions using machine learning.pdf",
  },
  "PCMLTFA": {
    id: "PCMLTFA",
    org: "Government of Canada",
    title: "Proceeds of Crime (Money Laundering) and Terrorist Financing Act",
    url: "https://laws-lois.justice.gc.ca/eng/acts/P-24.501/",
    type: "Legislation",
    country: "Canada",
    year: 2023,
  },
};

// ═══════════════════════════════════════════════════════════════
//  DATA: TYPOLOGIES
// ═══════════════════════════════════════════════════════════════
const TYPOLOGIES = [
  {
    id: "TYP-01",
    name: "Pass-Through / Shell Entity",
    stage: "Layering",
    customerType: ["Individual", "Business"],
    description: "Funds are received and rapidly re-sent with minimal residual balance. The account functions as a conduit, not a genuine economic actor. Common in organized crime group networks where funds move through multiple shell entities before integration.",
    indicators: ["IND-01", "IND-02", "IND-03", "IND-10"],
    features: ["channel_concentration", "churn_ratio", "churn_symmetry_count", "wire_preference", "wu_preference"],
    sources: ["FINTRAC-OCG", "FATF-OCG", "FINCEN-SAR"],
    severity: "Extremely High",
  },
  {
    id: "TYP-02",
    name: "Structuring (Smurfing)",
    stage: "Placement",
    customerType: ["Individual"],
    description: "Multiple transactions just below reporting thresholds ($10,000 CAD) designed to avoid STR/CTR triggers. Often involves multiple accounts or agents splitting a larger criminal amount. A primary technique for organized crime cash placement.",
    indicators: ["IND-04", "IND-05", "IND-06"],
    features: ["total_trans_count", "avg_trans_volume", "channel_diversity", "velocity_variance_7day"],
    sources: ["FINTRAC-GUC", "FINCEN-STRUCT", "PCMLTFA"],
    severity: "High",
  },
  {
    id: "TYP-03",
    name: "Transaction Burst / Layering Event",
    stage: "Layering",
    customerType: ["Individual", "Business"],
    description: "Sudden surge in transaction frequency or volume after a dormant period. Funds cycle rapidly through wire transfers or EFT before moving internationally. Time-frequency analysis detects the energy burst invisible to static monthly summaries.",
    indicators: ["IND-07", "IND-08", "IND-09"],
    features: ["tf_kurt", "disc_time", "disc_tf", "velocity_variance_7day", "sparsity_tf"],
    sources: ["TFFEAT2023", "JULLUM2020", "FATF-WIRE"],
    severity: "High",
  },
  {
    id: "TYP-04",
    name: "Unexplained Wealth / Income Mismatch",
    stage: "Integration",
    customerType: ["Individual"],
    description: "Transaction volumes or outbound flows vastly exceed declared income or occupation-expected wealth. A key red flag under FINTRAC guidance and PCMLTFA 'know your client' obligations. Particularly prevalent in integration-stage laundering.",
    indicators: ["IND-11", "IND-12"],
    features: ["outbound_to_income_ratio", "ttl_volume_to_income", "avg_volume_to_income", "trans_count_to_income"],
    sources: ["FINTRAC-ML", "FINTRAC-GUC", "PCMLTFA", "SCORE2021"],
    severity: "High",
  },
  {
    id: "TYP-05",
    name: "Business Revenue Mismatch",
    stage: "Integration",
    customerType: ["Business"],
    description: "Small business transaction flows significantly exceed industry-typical revenue. Cash-intensive businesses (restaurants, car washes, nail salons) are used as fronts to co-mingle criminal proceeds with legitimate sales revenue.",
    indicators: ["IND-11", "IND-13"],
    features: ["revenue_capacity_ratio", "ttl_volume_to_sales", "trans_count_to_sales"],
    sources: ["FINTRAC-OCG", "FATF-RBA", "SCORE2021"],
    severity: "High",
  },
  {
    id: "TYP-06",
    name: "Dormant Account Activation",
    stage: "Placement",
    customerType: ["Individual", "Business"],
    description: "Accounts with long periods of inactivity suddenly become high-volume transaction accounts. Associated with account takeover, purchased account credentials sold within OCG networks, or pre-established shell accounts activated for a specific laundering operation.",
    indicators: ["IND-14", "IND-15"],
    features: ["sparsity_tf", "activity_density", "account_age", "account_activity_days"],
    sources: ["FINTRAC-ML", "FINTRAC-OCG", "UNSUP2022"],
    severity: "Medium",
  },
  {
    id: "TYP-07",
    name: "International Wire / MSB Concentration",
    stage: "Layering",
    customerType: ["Individual", "Business"],
    description: "Disproportionate reliance on international wire transfers or money service businesses (Western Union) relative to peer accounts. High channel concentration index with near-total preference for high-risk payment rails.",
    indicators: ["IND-01", "IND-16", "IND-17"],
    features: ["wire_preference", "wu_preference", "channel_concentration", "amount_concentration"],
    sources: ["FATF-WIRE", "FINTRAC-ML", "FINCEN-SAR", "JULLUM2020"],
    severity: "High",
  },
];

// ═══════════════════════════════════════════════════════════════
//  DATA: INDICATORS (Red Flags)
// ═══════════════════════════════════════════════════════════════
const INDICATORS = [
  {
    id: "IND-01",
    category: "Channel Behavior",
    name: "Extreme single-channel concentration",
    description: "Customer routes ≥80% of total transaction volume through a single payment rail (e.g., exclusively wire or Western Union), inconsistent with legitimate retail/business behavior.",
    detection: "HHI channel_concentration ≥ 0.75",
    threshold: "HHI ≥ 0.75 (flag); HHI ≥ 0.90 (critical)",
    sources: ["FINTRAC-ML", "FATF-WIRE", "FEENG2023"],
    typologies: ["TYP-01", "TYP-07"],
    customerType: ["Individual", "Business"],
    modelFeature: "channel_concentration",
    dataChannel: ["wire", "westernunion"],
  },
  {
    id: "IND-02",
    category: "Flow Pattern",
    name: "Near-perfect inflow/outflow symmetry (7-day window)",
    description: "The 7-day rolling outbound amount equals inflow within ±10% (churn ratio 0.90–1.10). Funds enter and exit rapidly with no meaningful economic retention, indicating a pass-through conduit.",
    detection: "churn_ratio ∈ [0.90, 1.10]",
    threshold: "churn_ratio ∈ [0.90, 1.10] with ≥3 occurrences",
    sources: ["FINTRAC-OCG", "SCORE2021"],
    typologies: ["TYP-01"],
    customerType: ["Individual", "Business"],
    modelFeature: "churn_symmetry_count",
    dataChannel: ["all"],
  },
  {
    id: "IND-03",
    category: "Flow Pattern",
    name: "Statistically anomalous churn volatility",
    description: "The account's 7-day churn ratio deviates more than 3 standard deviations from its own historical mean — indicating sudden and unexpected shifts in the inflow/outflow balance.",
    detection: "churn_z_score > 3",
    threshold: "Z-score > 3 (≥ 2 events flags the account)",
    sources: ["SCORE2021", "UNSUP2022"],
    typologies: ["TYP-01", "TYP-03"],
    customerType: ["Individual", "Business"],
    modelFeature: "churn_anomaly_count",
    dataChannel: ["all"],
  },
  {
    id: "IND-04",
    category: "Structuring",
    name: "High-frequency low-denomination transactions",
    description: "Unusually high count of transactions with average amounts below reporting thresholds. Consistent with structuring (smurfing) to avoid CTR/STR triggers under PCMLTFA s.12.",
    detection: "total_trans_count in top 5th percentile with avg_trans_volume < $9,500",
    threshold: "Top 5% count + avg < $9,500 CAD",
    sources: ["FINTRAC-GUC", "FINCEN-STRUCT", "PCMLTFA"],
    typologies: ["TYP-02"],
    customerType: ["Individual"],
    modelFeature: "total_trans_count",
    dataChannel: ["abm", "card", "emt"],
  },
  {
    id: "IND-05",
    category: "Structuring",
    name: "Elevated transaction velocity variance",
    description: "High variance in 7-day rolling transaction counts. Structured depositors alternate between bursts and silence to mimic irregular but innocent behavior while avoiding pattern detection.",
    detection: "velocity_variance_7day in top 10th percentile",
    threshold: "velocity_variance_7day > 150 (normalized)",
    sources: ["JULLUM2020", "FINTRAC-GUC"],
    typologies: ["TYP-02", "TYP-03"],
    customerType: ["Individual"],
    modelFeature: "velocity_variance_7day",
    dataChannel: ["all"],
  },
  {
    id: "IND-06",
    category: "Structuring",
    name: "Multi-channel volume diversity (smurfing signature)",
    description: "Unlike TYP-01, smurfing accounts spread activity evenly across many channels to appear normal. Low HHI combined with high total count is a distinguishing signature.",
    detection: "channel_diversity ≥ 5 AND channel_concentration < 0.25",
    threshold: "5+ active channels with HHI < 0.25",
    sources: ["FINTRAC-GUC", "FINCEN-STRUCT", "FEENG2023"],
    typologies: ["TYP-02"],
    customerType: ["Individual"],
    modelFeature: "channel_diversity",
    dataChannel: ["all"],
  },
  {
    id: "IND-07",
    category: "Time-Frequency",
    name: "Burst energy in STFT low-frequency band",
    description: "Short-Time Fourier Transform reveals concentrated energy at low frequencies (0–0.05 cyc/day) within specific time windows — the mathematical signature of periodic layering events invisible to rolling averages.",
    detection: "tf_kurt > 6.0 AND disc_time > 8.0",
    threshold: "tf_kurt > 6.0 (burst); > 10.0 (severe burst)",
    sources: ["TFFEAT2023", "UNSUP2022"],
    typologies: ["TYP-03"],
    customerType: ["Individual", "Business"],
    modelFeature: "tf_kurt",
    dataChannel: ["all"],
  },
  {
    id: "IND-08",
    category: "Time-Frequency",
    name: "High temporal discontinuity (day-to-day volume shock)",
    description: "Mean absolute difference in STFT energy between adjacent time bins is abnormally high. Captures sudden 'switches on' and 'switches off' in transaction activity — associated with scripted layering runs.",
    detection: "disc_time in top 10th percentile",
    threshold: "disc_time > 9.0 (normalized)",
    sources: ["TFFEAT2023"],
    typologies: ["TYP-03"],
    customerType: ["Individual", "Business"],
    modelFeature: "disc_time",
    dataChannel: ["wire", "eft", "westernunion"],
  },
  {
    id: "IND-09",
    category: "Time-Frequency",
    name: "Low signal entropy (scripted / rigid behavior)",
    description: "Shannon entropy of the time-frequency energy distribution is abnormally low. A rigid, deterministic transaction pattern suggests scripted or automated fund movement rather than organic economic activity.",
    detection: "tf_entropy < 0.35",
    threshold: "tf_entropy < 0.35 (suspicious); < 0.20 (critical)",
    sources: ["TFFEAT2023", "UNSUP2022"],
    typologies: ["TYP-03", "TYP-01"],
    customerType: ["Individual", "Business"],
    modelFeature: "tf_entropy",
    dataChannel: ["all"],
  },
  {
    id: "IND-10",
    category: "Flow Pattern",
    name: "Minimal economic retention (near-zero net flow)",
    description: "Total inbound minus outbound over the observation window is near zero despite high gross volume. Distinguishes genuine business accounts (positive net accumulation) from conduit accounts.",
    detection: "Derived from total_outbound_amount ≈ total_trans_volume",
    threshold: "Net retention < 3% of gross volume",
    sources: ["FINTRAC-OCG", "FATF-OCG"],
    typologies: ["TYP-01"],
    customerType: ["Business"],
    modelFeature: "total_outbound_amount",
    dataChannel: ["wire", "eft"],
  },
  {
    id: "IND-11",
    category: "KYC / Income Mismatch",
    name: "Outbound volume exceeds declared income/sales (period-adjusted)",
    description: "Total outbound amount over the observation period exceeds the pro-rated declared income (individuals) or reported sales (businesses). A primary FINTRAC/PCMLTFA 'know your client' red flag.",
    detection: "outbound_to_income_ratio > 2.0 OR revenue_capacity_ratio > 2.0",
    threshold: "Ratio > 2× (flag); > 5× (critical SAR consideration)",
    sources: ["FINTRAC-ML", "FINTRAC-GUC", "PCMLTFA", "SCORE2021"],
    typologies: ["TYP-04", "TYP-05"],
    customerType: ["Individual", "Business"],
    modelFeature: "outbound_to_income_ratio",
    dataChannel: ["all"],
  },
  {
    id: "IND-12",
    category: "KYC / Income Mismatch",
    name: "Total transaction volume inconsistent with occupation",
    description: "Gross transaction volume (not just outbound) normalized to income is extreme. Students, unemployed, or retired individuals with high gross volumes are a priority FINTRAC flag.",
    detection: "ttl_volume_to_income > 3.0 for high-risk occupation codes",
    threshold: "ttl_volume_to_income > 3.0 for UNEMPLOYED/STUDENT/RETIRED",
    sources: ["FINTRAC-ML", "PCMLTFA"],
    typologies: ["TYP-04"],
    customerType: ["Individual"],
    modelFeature: "ttl_volume_to_income",
    dataChannel: ["all"],
  },
  {
    id: "IND-13",
    category: "KYC / Income Mismatch",
    name: "Business sales-to-transaction ratio anomaly",
    description: "Businesses in low-revenue industry codes (e.g., small retail, food service) show transaction volumes multiples above industry-median sales, suggesting co-mingling of criminal proceeds.",
    detection: "revenue_capacity_ratio > 3.0 for low-median-sales industries",
    threshold: "revenue_capacity_ratio > 3.0",
    sources: ["FINTRAC-OCG", "FATF-RBA", "SCORE2021"],
    typologies: ["TYP-05"],
    customerType: ["Business"],
    modelFeature: "revenue_capacity_ratio",
    dataChannel: ["all"],
  },
  {
    id: "IND-14",
    category: "Account Behavior",
    name: "Dormant-then-active pattern",
    description: "Account has long inactivity stretches (high sparsity_tf) followed by a concentrated burst of activity near observation end. Characteristic of pre-positioned accounts activated for a specific criminal operation.",
    detection: "sparsity_tf > 0.70 AND activity_density in bottom quartile AND recent burst",
    threshold: "sparsity_tf > 0.70 with final-30d activity spike",
    sources: ["FINTRAC-ML", "FINTRAC-OCG"],
    typologies: ["TYP-06"],
    customerType: ["Individual", "Business"],
    modelFeature: "sparsity_tf",
    dataChannel: ["all"],
  },
  {
    id: "IND-15",
    category: "Account Behavior",
    name: "New account with disproportionate high-risk transaction volumes",
    description: "Account age under 90 days combined with significant wire/WU volumes. New accounts are disproportionately used for rapid fund movement before detection systems build baseline profiles.",
    detection: "account_age < 90 AND (wire_sum > $50,000 OR wu_sum > $30,000)",
    threshold: "account_age < 90 days with high-risk channel volume",
    sources: ["FINTRAC-ML", "FINTRAC-GUC", "FATF-RBA"],
    typologies: ["TYP-06", "TYP-07"],
    customerType: ["Individual", "Business"],
    modelFeature: "account_age",
    dataChannel: ["wire", "westernunion"],
  },
  {
    id: "IND-16",
    category: "Channel Behavior",
    name: "Disproportionate Western Union / MSB usage",
    description: "A significant share of total transaction volume flows through money service businesses (Western Union). MSBs are high-risk channels due to cash proximity and international reach — flagged explicitly in FINTRAC ML indicators.",
    detection: "wu_preference > 0.40",
    threshold: "wu_preference > 0.40 (40% of volume through WU/MSB)",
    sources: ["FINTRAC-ML", "FINTRAC-TFSB", "FATF-WIRE"],
    typologies: ["TYP-07"],
    customerType: ["Individual"],
    modelFeature: "wu_preference",
    dataChannel: ["westernunion"],
  },
  {
    id: "IND-17",
    category: "Channel Behavior",
    name: "Disproportionate international wire transfer usage",
    description: "Wire transfers represent a dominant share of the customer's transaction volume without a business justification. FATF Recommendation 16 (wire transfers) requires enhanced due diligence for cross-border transfers.",
    detection: "wire_preference > 0.60",
    threshold: "wire_preference > 0.60 (60% of volume via wire)",
    sources: ["FATF-WIRE", "FINTRAC-ML", "JULLUM2020"],
    typologies: ["TYP-07"],
    customerType: ["Individual", "Business"],
    modelFeature: "wire_preference",
    dataChannel: ["wire"],
  },
];

// ═══════════════════════════════════════════════════════════════
//  DATA: FEATURE-TO-INDICATOR MAP
// ═══════════════════════════════════════════════════════════════
const FEATURE_MAP = [
  { feature: "channel_concentration", type: "Channel", description: "HHI of transaction count across 7 payment channels", indicators: ["IND-01", "IND-06"], sources: ["FEENG2023", "FATF-WIRE"] },
  { feature: "amount_concentration", type: "Channel", description: "HHI of transaction volume across 7 payment channels", indicators: ["IND-01"], sources: ["FEENG2023"] },
  { feature: "channel_diversity", type: "Channel", description: "Count of channels with at least 1 transaction", indicators: ["IND-06"], sources: ["FEENG2023"] },
  { feature: "wire_preference", type: "Channel", description: "Wire volume / total volume", indicators: ["IND-01", "IND-17"], sources: ["JULLUM2020", "FATF-WIRE"] },
  { feature: "wu_preference", type: "Channel", description: "Western Union volume / total volume", indicators: ["IND-01", "IND-16"], sources: ["FINTRAC-ML", "FATF-WIRE"] },
  { feature: "churn_ratio", type: "Flow", description: "7-day rolling outbound / inbound", indicators: ["IND-02"], sources: ["SCORE2021", "FINTRAC-OCG"] },
  { feature: "churn_symmetry_count", type: "Flow", description: "Count of periods where churn_ratio ∈ [0.90, 1.10]", indicators: ["IND-02"], sources: ["SCORE2021"] },
  { feature: "churn_anomaly_count", type: "Flow", description: "Count of periods where churn Z-score > 3", indicators: ["IND-03"], sources: ["SCORE2021", "UNSUP2022"] },
  { feature: "total_outbound_amount", type: "Flow", description: "Sum of all debit transactions", indicators: ["IND-10", "IND-11"], sources: ["FINTRAC-ML"] },
  { feature: "total_trans_count", type: "Volume", description: "Total count of transactions across all channels", indicators: ["IND-04"], sources: ["JULLUM2020"] },
  { feature: "avg_trans_volume", type: "Volume", description: "Mean transaction amount", indicators: ["IND-04"], sources: ["JULLUM2020"] },
  { feature: "velocity_variance_7day", type: "Volume", description: "Variance of 7-day rolling transaction count", indicators: ["IND-05"], sources: ["JULLUM2020", "FINTRAC-GUC"] },
  { feature: "tf_kurt", type: "Time-Frequency", description: "STFT kurtosis — tailedness of energy distribution", indicators: ["IND-07"], sources: ["TFFEAT2023"] },
  { feature: "disc_time", type: "Time-Frequency", description: "Mean |ΔSTFT| between adjacent time bins", indicators: ["IND-08"], sources: ["TFFEAT2023"] },
  { feature: "disc_tf", type: "Time-Frequency", description: "Joint time-frequency discontinuity", indicators: ["IND-08", "IND-09"], sources: ["TFFEAT2023"] },
  { feature: "tf_entropy", type: "Time-Frequency", description: "Shannon entropy of STFT energy", indicators: ["IND-09"], sources: ["TFFEAT2023", "UNSUP2022"] },
  { feature: "sparsity_tf", type: "Time-Frequency", description: "Fraction of time-freq cells with near-zero energy", indicators: ["IND-14"], sources: ["TFFEAT2023"] },
  { feature: "outbound_to_income_ratio", type: "KYC", description: "Period-adjusted outbound / declared income (individuals)", indicators: ["IND-11"], sources: ["FINTRAC-ML", "PCMLTFA", "SCORE2021"] },
  { feature: "ttl_volume_to_income", type: "KYC", description: "Total gross volume / declared income", indicators: ["IND-12"], sources: ["FINTRAC-ML"] },
  { feature: "revenue_capacity_ratio", type: "KYC", description: "Period-adjusted outbound / reported sales (businesses)", indicators: ["IND-11", "IND-13"], sources: ["FINTRAC-OCG", "SCORE2021"] },
  { feature: "account_age", type: "KYC", description: "Days since onboarding (or first transaction)", indicators: ["IND-15"], sources: ["FINTRAC-ML", "FATF-RBA"] },
  { feature: "activity_density", type: "Activity", description: "Unique active days / account activity days", indicators: ["IND-14"], sources: ["UNSUP2022"] },
];

// ═══════════════════════════════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════════════════════════════
const C = {
  bg: "#f8f7f4",
  bgCard: "#ffffff",
  bgSide: "#1a1f2e",
  text: "#1e2535",
  muted: "#6b7280",
  border: "#e5e7eb",
  amber: "#d97706",
  amberLight: "#fef3c7",
  amberBorder: "#fbbf24",
  red: "#dc2626",
  redLight: "#fef2f2",
  redBorder: "#fca5a5",
  green: "#15803d",
  greenLight: "#f0fdf4",
  blue: "#1d4ed8",
  blueLight: "#eff6ff",
  purple: "#7c3aed",
  purpleLight: "#f5f3ff",
  orange: "#c2410c",
  orangeLight: "#fff7ed",
  mono: "'Courier New', Courier, monospace",
  sans: "'Segoe UI', system-ui, sans-serif",
};

const SEVERITY_STYLE = {
  "Extremely High": { bg: "#fef2f2", border: "#fca5a5", text: "#dc2626" },
  High:             { bg: "#fff7ed", border: "#fdba74", text: "#c2410c" },
  Medium:           { bg: "#fefce8", border: "#fde047", text: "#a16207" },
  Low:              { bg: "#f0fdf4", border: "#86efac", text: "#15803d" },
};

const STAGE_STYLE = {
  Placement: { bg: "#fef2f2", text: "#dc2626" },
  Layering:  { bg: "#fff7ed", text: "#c2410c" },
  Integration: { bg: "#fefce8", text: "#a16207" },
};

const CAT_COLORS = {
  "Channel Behavior":      C.blue,
  "Flow Pattern":          C.amber,
  "Structuring":           C.red,
  "Time-Frequency":        C.purple,
  "KYC / Income Mismatch": C.orange,
  "Account Behavior":      C.green,
};

const TYPE_COLORS = {
  "Channel":        C.blue,
  "Flow":           C.amber,
  "Volume":         C.red,
  "Time-Frequency": C.purple,
  "KYC":            C.orange,
  "Activity":       C.green,
};

const SOURCE_TYPE_STYLE = {
  Regulatory:             { bg: "#eff6ff", text: "#1d4ed8" },
  "International Standard":{ bg: "#f5f3ff", text: "#7c3aed" },
  Academic:               { bg: "#f0fdf4", text: "#15803d" },
  Legislation:            { bg: "#fef2f2", text: "#dc2626" },
};

// ═══════════════════════════════════════════════════════════════
//  COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Tag({ label, color, bg }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 7px", borderRadius: 3,
      fontSize: 10, fontWeight: 600, letterSpacing: "0.04em",
      background: bg || "#f3f4f6", color: color || C.muted,
      border: `1px solid ${color || C.border}30`,
      fontFamily: C.mono,
    }}>{label}</span>
  );
}

function SourceBadge({ sourceId }) {
  const s = SOURCES[sourceId];
  if (!s) return null;
  const style = SOURCE_TYPE_STYLE[s.type] || { bg: "#f3f4f6", text: C.muted };
  return (
    <span
      title={s.title}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "2px 7px", borderRadius: 3, fontSize: 10, fontWeight: 600,
        background: style.bg, color: style.text, cursor: "default",
        border: `1px solid ${style.text}30`, fontFamily: C.mono,
      }}
    >
      [{s.org}]
    </span>
  );
}

function IndicatorRef({ id }) {
  const ind = INDICATORS.find(i => i.id === id);
  if (!ind) return null;
  return (
    <span style={{
      display: "inline-block", padding: "2px 7px", borderRadius: 3,
      fontSize: 10, background: CAT_COLORS[ind.category] + "15",
      color: CAT_COLORS[ind.category], border: `1px solid ${CAT_COLORS[ind.category]}30`,
      fontFamily: C.mono, fontWeight: 700,
    }} title={ind.name}>{id}</span>
  );
}

function FeatureChip({ feature }) {
  const fm = FEATURE_MAP.find(f => f.feature === feature);
  const color = fm ? TYPE_COLORS[fm.type] : C.muted;
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: 12,
      fontSize: 10, background: color + "12",
      color: color, border: `1px solid ${color}25`,
      fontFamily: C.mono,
    }}>{feature}</span>
  );
}

function SectionTitle({ label, count }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.text, fontFamily: C.sans }}>{label}</h2>
      {count !== undefined && (
        <span style={{ fontSize: 11, color: C.muted, fontFamily: C.mono }}>{count} entries</span>
      )}
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "Search…"}
      style={{
        width: "100%", padding: "7px 12px", fontSize: 13,
        border: `1px solid ${C.border}`, borderRadius: 5,
        outline: "none", fontFamily: C.sans, color: C.text,
        background: C.bgCard, boxSizing: "border-box",
      }}
    />
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "4px 12px", fontSize: 11, cursor: "pointer", borderRadius: 20,
      border: active ? `1px solid ${C.amber}` : `1px solid ${C.border}`,
      background: active ? C.amberLight : C.bgCard,
      color: active ? C.amber : C.muted, fontFamily: C.sans, fontWeight: 600,
      transition: "all 0.1s",
    }}>{label}</button>
  );
}

// ═══════════════════════════════════════════════════════════════
//  VIEWS
// ═══════════════════════════════════════════════════════════════

function TypologyView() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All");
  const [selected, setSelected] = useState(null);

  const stages = ["All", "Placement", "Layering", "Integration"];
  const filtered = TYPOLOGIES.filter(t => {
    if (stage !== "All" && t.stage !== stage) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const detail = selected ? TYPOLOGIES.find(t => t.id === selected) : null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: detail ? "1fr 420px" : "1fr", gap: 20 }}>
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}><SearchBar value={search} onChange={setSearch} placeholder="Search typologies…" /></div>
          {stages.map(s => <FilterPill key={s} label={s} active={stage === s} onClick={() => setStage(s)} />)}
        </div>
        <SectionTitle label="AML Typologies" count={filtered.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(t => {
            const sev = SEVERITY_STYLE[t.severity];
            const stg = STAGE_STYLE[t.stage];
            return (
              <div key={t.id} onClick={() => setSelected(selected === t.id ? null : t.id)} style={{
                background: C.bgCard, border: `1px solid ${selected === t.id ? C.amber : C.border}`,
                borderLeft: `4px solid ${sev.text}`,
                borderRadius: 6, padding: "14px 18px", cursor: "pointer",
                boxShadow: selected === t.id ? `0 0 0 2px ${C.amberBorder}40` : "0 1px 3px rgba(0,0,0,0.06)",
                transition: "all 0.15s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: C.mono, fontSize: 11, color: C.muted }}>{t.id}</span>
                      <Tag label={t.stage} color={stg.text} bg={stg.bg} />
                      <Tag label={t.severity} color={sev.text} bg={sev.bg} />
                      {t.customerType.map(ct => <Tag key={ct} label={ct} color={C.muted} />)}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 6 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{t.description}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                      {t.indicators.map(i => <IndicatorRef key={i} id={i} />)}
                      {t.sources.map(s => <SourceBadge key={s} sourceId={s} />)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {detail && (
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, position: "sticky", top: 80, maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: C.mono, fontSize: 11, color: C.muted }}>{detail.id}</span>
            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: C.muted }}>✕</button>
          </div>
          <h3 style={{ margin: "0 0 10px 0", fontSize: 15, color: C.text }}>{detail.name}</h3>
          <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            <Tag label={detail.stage} color={STAGE_STYLE[detail.stage].text} bg={STAGE_STYLE[detail.stage].bg} />
            <Tag label={detail.severity} color={SEVERITY_STYLE[detail.severity].text} bg={SEVERITY_STYLE[detail.severity].bg} />
          </div>
          <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.7, marginBottom: 16 }}>{detail.description}</p>

          <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Red Flag Indicators</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
            {detail.indicators.map(id => {
              const ind = INDICATORS.find(i => i.id === id);
              return ind ? (
                <div key={id} style={{ padding: "8px 10px", background: CAT_COLORS[ind.category] + "10", borderLeft: `3px solid ${CAT_COLORS[ind.category]}`, borderRadius: "0 4px 4px 0" }}>
                  <div style={{ fontFamily: C.mono, fontSize: 10, color: CAT_COLORS[ind.category], marginBottom: 2 }}>{ind.id} · {ind.category}</div>
                  <div style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{ind.name}</div>
                  <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, marginTop: 2 }}>Threshold: {ind.threshold}</div>
                </div>
              ) : null;
            })}
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Model Features</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
            {detail.features.map(f => <FeatureChip key={f} feature={f} />)}
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Sources</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {detail.sources.map(sid => {
              const s = SOURCES[sid];
              const style = SOURCE_TYPE_STYLE[s.type] || {};
              return (
                <div key={sid} style={{
                  display: "flex", flexDirection: "column", padding: "7px 10px",
                  background: style.bg, borderRadius: 4,
                  border: `1px solid ${style.text}20`,
                }}>
                  <span style={{ fontFamily: C.mono, fontSize: 10, color: style.text, fontWeight: 700, marginBottom: 3 }}>[{s.org}] · {s.type} · {s.year}</span>
                  <span style={{ fontSize: 11, color: C.text, marginBottom: 5, lineHeight: 1.4 }}>{s.title}</span>
                  {s.url && <a href={s.url} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: C.blue, textDecoration: "none", fontFamily: C.mono }}>🔗 {s.url.length > 50 ? s.url.slice(0, 50) + "…" : s.url}</a>}
                  {s.url2 && <a href={s.url2} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: C.blue, textDecoration: "none", fontFamily: C.mono, marginTop: 2 }}>🔗 {s.url2.length > 50 ? s.url2.slice(0, 50) + "…" : s.url2}</a>}
                  {s.file && <a href={`${process.env.PUBLIC_URL}/${s.file}`} download={s.file} style={{ fontSize: 10, color: C.green, textDecoration: "none", fontFamily: C.mono, marginTop: 2 }}>⬇ {s.file}</a>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function IndicatorView() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [cType, setCType] = useState("All");
  const [selected, setSelected] = useState(null);

  const categories = ["All", ...Array.from(new Set(INDICATORS.map(i => i.category)))];
  const filtered = INDICATORS.filter(ind => {
    if (cat !== "All" && ind.category !== cat) return false;
    if (cType !== "All" && !ind.customerType.includes(cType)) return false;
    if (search && !ind.name.toLowerCase().includes(search.toLowerCase()) &&
        !ind.description.toLowerCase().includes(search.toLowerCase()) &&
        !ind.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const detail = selected ? INDICATORS.find(i => i.id === selected) : null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: detail ? "1fr 400px" : "1fr", gap: 20 }}>
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}><SearchBar value={search} onChange={setSearch} placeholder="Search indicators, descriptions, IND-IDs…" /></div>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {categories.map(c => <FilterPill key={c} label={c} active={cat === c} onClick={() => setCat(c)} />)}
          <div style={{ width: 1, background: C.border, margin: "0 4px" }} />
          {["All", "Individual", "Business"].map(t => <FilterPill key={t} label={t} active={cType === t} onClick={() => setCType(t)} />)}
        </div>
        <SectionTitle label="Red Flag Indicators" count={filtered.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(ind => {
            const catColor = CAT_COLORS[ind.category] || C.muted;
            return (
              <div key={ind.id} onClick={() => setSelected(selected === ind.id ? null : ind.id)} style={{
                background: C.bgCard, border: `1px solid ${selected === ind.id ? catColor : C.border}`,
                borderLeft: `4px solid ${catColor}`,
                borderRadius: 6, padding: "12px 16px", cursor: "pointer",
                boxShadow: selected === ind.id ? `0 0 0 2px ${catColor}20` : "0 1px 2px rgba(0,0,0,0.05)",
                transition: "all 0.15s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: C.mono, fontSize: 11, color: catColor, fontWeight: 700 }}>{ind.id}</span>
                      <Tag label={ind.category} color={catColor} bg={catColor + "12"} />
                      {ind.customerType.map(t => <Tag key={t} label={t} color={C.muted} />)}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>{ind.name}</div>
                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{ind.description}</div>
                    <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <FeatureChip feature={ind.modelFeature} />
                      <span style={{ fontSize: 10, fontFamily: C.mono, color: C.muted, padding: "2px 0" }}>Threshold: <span style={{ color: C.text }}>{ind.threshold}</span></span>
                    </div>
                    <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                      {ind.sources.map(s => <SourceBadge key={s} sourceId={s} />)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {detail && (
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, position: "sticky", top: 80, maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontFamily: C.mono, fontSize: 11, color: CAT_COLORS[detail.category] || C.muted, fontWeight: 700 }}>{detail.id}</span>
            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: C.muted }}>✕</button>
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, fontFamily: C.mono }}>{detail.category}</div>
          <h3 style={{ margin: "0 0 10px 0", fontSize: 14, color: C.text }}>{detail.name}</h3>
          <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>{detail.description}</p>

          <div style={{ padding: "10px 12px", background: C.amberLight, border: `1px solid ${C.amberBorder}`, borderRadius: 5, marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.amber, fontFamily: C.mono, marginBottom: 3 }}>DETECTION RULE</div>
            <div style={{ fontFamily: C.mono, fontSize: 11, color: C.text }}>{detail.detection}</div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, marginTop: 4 }}>Threshold: {detail.threshold}</div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Model Feature</div>
          <div style={{ marginBottom: 14 }}><FeatureChip feature={detail.modelFeature} /></div>

          <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Relevant Channels</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
            {detail.dataChannel.map(c => <Tag key={c} label={c} color={C.blue} bg={C.blueLight} />)}
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Related Typologies</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {detail.typologies.map(tid => {
              const t = TYPOLOGIES.find(x => x.id === tid);
              return t ? <Tag key={tid} label={`${tid}: ${t.name}`} color={SEVERITY_STYLE[t.severity].text} bg={SEVERITY_STYLE[t.severity].bg} /> : null;
            })}
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Source Citations</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {detail.sources.map(sid => {
              const s = SOURCES[sid];
              const st = SOURCE_TYPE_STYLE[s.type] || {};
              return (
                <div key={sid} style={{
                  display: "flex", flexDirection: "column", padding: "7px 10px",
                  background: st.bg, borderRadius: 4,
                  border: `1px solid ${st.text}20`,
                }}>
                  <span style={{ fontFamily: C.mono, fontSize: 10, color: st.text, fontWeight: 700, marginBottom: 3 }}>[{s.org}] {s.type} · {s.year}</span>
                  <span style={{ fontSize: 11, color: C.text, marginBottom: 5, lineHeight: 1.4 }}>{s.title}</span>
                  {s.url && <a href={s.url} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: C.blue, textDecoration: "none", fontFamily: C.mono }}>🔗 {s.url.length > 50 ? s.url.slice(0, 50) + "…" : s.url}</a>}
                  {s.url2 && <a href={s.url2} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: C.blue, textDecoration: "none", fontFamily: C.mono, marginTop: 2 }}>🔗 {s.url2.length > 50 ? s.url2.slice(0, 50) + "…" : s.url2}</a>}
                  {s.file && <a href={`${process.env.PUBLIC_URL}/${s.file}`} download={s.file} style={{ fontSize: 10, color: C.green, textDecoration: "none", fontFamily: C.mono, marginTop: 2 }}>⬇ {s.file}</a>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureMapView() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const types = ["All", ...Array.from(new Set(FEATURE_MAP.map(f => f.type)))];
  const filtered = FEATURE_MAP.filter(f => {
    if (type !== "All" && f.type !== type) return false;
    if (search && !f.feature.toLowerCase().includes(search.toLowerCase()) &&
        !f.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}><SearchBar value={search} onChange={setSearch} placeholder="Search features…" /></div>
        {types.map(t => <FilterPill key={t} label={t} active={type === t} onClick={() => setType(t)} />)}
      </div>
      <SectionTitle label="Feature → Indicator Mapping" count={filtered.length} />
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#f3f4f6", borderBottom: `2px solid ${C.border}` }}>
              {["Feature Name", "Type", "Description", "AML Indicators", "Sources"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontFamily: C.sans, fontWeight: 700, color: C.text, fontSize: 11, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => {
              const color = TYPE_COLORS[f.type] || C.muted;
              return (
                <tr key={f.feature} style={{ background: i % 2 === 0 ? C.bgCard : "#fafaf9", borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px 14px", fontFamily: C.mono, fontSize: 11, color, fontWeight: 700, whiteSpace: "nowrap" }}>{f.feature}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <Tag label={f.type} color={color} bg={color + "12"} />
                  </td>
                  <td style={{ padding: "10px 14px", color: C.muted, maxWidth: 280 }}>{f.description}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {f.indicators.map(id => <IndicatorRef key={id} id={id} />)}
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {f.sources.map(s => <SourceBadge key={s} sourceId={s} />)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SourcesView() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const types = ["All", ...Array.from(new Set(Object.values(SOURCES).map(s => s.type)))];
  const filtered = Object.values(SOURCES).filter(s => {
    if (type !== "All" && s.type !== type) return false;
    if (search && !s.title.toLowerCase().includes(search.toLowerCase()) &&
        !s.org.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}><SearchBar value={search} onChange={setSearch} placeholder="Search sources, organizations…" /></div>
        {types.map(t => <FilterPill key={t} label={t} active={type === t} onClick={() => setType(t)} />)}
      </div>
      <SectionTitle label="Source Registry" count={filtered.length} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 10 }}>
        {filtered.map(s => {
          const st = SOURCE_TYPE_STYLE[s.type] || {};
          const usedBy = INDICATORS.filter(i => i.sources.includes(s.id));
          return (
            <div key={s.id} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 5 }}>
                    <span style={{ fontFamily: C.mono, fontSize: 10, background: st.bg, color: st.text, padding: "2px 6px", borderRadius: 3, fontWeight: 700 }}>{s.org}</span>
                    <span style={{ fontFamily: C.mono, fontSize: 10, color: C.muted }}>{s.type}</span>
                    <span style={{ fontFamily: C.mono, fontSize: 10, color: C.muted }}>{s.year}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.text, lineHeight: 1.4 }}>{s.title}</div>
                  {s.authors && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{s.authors} · {s.journal}</div>}
                  {s.country !== "—" && <div style={{ fontSize: 10, color: C.muted, fontFamily: C.mono, marginTop: 2 }}>Jurisdiction: {s.country}</div>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {usedBy.map(i => (
                  <span key={i.id} style={{ fontFamily: C.mono, fontSize: 9, padding: "1px 5px", borderRadius: 2, background: CAT_COLORS[i.category] + "12", color: CAT_COLORS[i.category] }}>{i.id}</span>
                ))}
                {usedBy.length === 0 && <span style={{ fontSize: 10, color: C.muted }}>Referenced in typologies</span>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {s.url && (
                  <a href={s.url} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: C.blue, textDecoration: "none", fontFamily: C.mono }}>
                    🔗 {s.url.length > 60 ? s.url.slice(0, 60) + "…" : s.url}
                  </a>
                )}
                {s.url2 && (
                  <a href={s.url2} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: C.blue, textDecoration: "none", fontFamily: C.mono }}>
                    🔗 {s.url2.length > 60 ? s.url2.slice(0, 60) + "…" : s.url2}
                  </a>
                )}
                {s.file && (
                  <a
                    href={`${process.env.PUBLIC_URL}/${s.file}`}
                    download={s.file}
                    style={{ fontSize: 10, color: C.green, textDecoration: "none", fontFamily: C.mono, display: "flex", alignItems: "center", gap: 4 }}
                  >
                    ⬇ {s.file}
                  </a>
                )}
                {!s.url && !s.file && (
                  <span style={{ fontSize: 10, color: C.muted, fontFamily: C.mono }}>No URL available</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReadmeView() {
  const sections = [
    {
      title: "Overview",
      content: `The AML Knowledge Library is a structured, source-traceable reference system for Anti-Money Laundering intelligence. It maps regulatory red flag indicators and academic AML typologies directly to the model features used in the Isolation Forest detection pipeline.

The library supports three use cases: (1) modelling experts building or auditing detection features, (2) AML investigators writing SARs and explaining alerts, and (3) compliance officers verifying regulatory alignment.`,
    },
    {
      title: "User Manual",
      subsections: [
        { sub: "For Modelling Experts", text: "Use the FEATURE MAP tab to trace each engineered feature (e.g., channel_concentration, tf_kurt) to the AML indicator it targets and the source that defines it. Use INDICATORS to validate detection thresholds against regulatory guidance. All feature-to-indicator links are bidirectional." },
        { sub: "For AML Investigators", text: "Start in TYPOLOGIES. Select a typology (e.g., 'Pass-Through / Shell Entity') to see the exact red flag indicators, model features, and regulatory citations. Use this to structure SAR narratives: each indicator card provides the detection rule and relevant FINTRAC/FATF guidance reference." },
        { sub: "For Compliance / Audit", text: "Use the SOURCES tab to verify the regulatory basis for each detection rule. Every indicator links to at least one primary source (FINTRAC, FATF, PCMLTFA, or FinCEN). Source IDs appear on every card for full traceability." },
      ],
    },
    {
      title: "Methodology",
      content: `The library follows a four-layer architecture:
      
1. SOURCE REGISTRY: Primary regulatory sources (FINTRAC, FATF, FinCEN, PCMLTFA) and academic literature catalogued with type, jurisdiction, year, and URL.

2. INDICATORS: 17 red flag indicators derived from those sources. Each specifies: detection logic (feature threshold), the model feature that operationalises it, relevant payment channels, and applicable customer types.

3. TYPOLOGIES: 7 AML typologies (placement/layering/integration stage) assembling multiple indicators into a coherent money laundering pattern. Each typology maps to model features and sources.

4. FEATURE MAP: The bridge between academic/regulatory knowledge and the Isolation Forest model — every engineered feature is linked to the indicator(s) it detects and its source basis.`,
    },
    {
      title: "Data Sources",
      items: [
        "FINTRAC — Money Laundering Indicators for Financial Entities (2023)",
        "FINTRAC — Indicators: Financing of Domestic Organized Crime Groups (2023)",
        "FINTRAC — Guideline on Unusual Transactions (2021)",
        "FATF — Risk-Based Approach Guidance: Banking Sector (2014)",
        "FATF — Wire Transfer Guidance / Recommendation 16 (2013)",
        "FinCEN — SAR Activity Review & Structuring Advisory",
        "Government of Canada — PCMLTFA (Proceeds of Crime Act)",
        "Jullum et al. (2020) — Detecting ML Transactions with ML, JMLC 23(1)",
        "STFT-based Suspicious Activity Detection paper (project file)",
        "Feature Engineering for Transaction Anomalies (project file)",
        "Scoring Model for AML Transactions (project file)",
        "Anomaly Detection with Unsupervised ML (project file)",
      ],
    },
    {
      title: "Design Decisions & Assumptions",
      items: [
        "Indicators are operationalised using features from the existing Isolation Forest pipeline — no new data sources are required.",
        "Income/sales thresholds are pro-rated to the 91-day observation window (Nov 2024 – Jan 2025) to prevent seasonal distortion.",
        "Occupation codes UNEMPLOYED, RETIRED, STUDENT are assigned $0 income; others receive occupation-group median imputation.",
        "STFT window of 30 days chosen to capture weekly periodicity (7-day multiples) while remaining responsive to burst events.",
        "HHI contamination threshold of 5% reflects estimated SAR filing rate in Canadian financial institutions per FINTRAC annual report.",
        "All thresholds are indicative starting points — final calibration requires backtesting against labelled SAR data.",
      ],
    },
    {
      title: "Setup & Run Instructions",
      content: `# Requirements
node >= 16, npm >= 8

# Install dependencies
npm install recharts

# Run (development)
npm start

# The library is a single self-contained React component (aml_knowledge_library.jsx).
# Import and mount as: import AMLLibrary from './aml_knowledge_library'; <AMLLibrary />

# No external API calls. All data is embedded in the component.
# To extend: add entries to SOURCES, INDICATORS, TYPOLOGIES, or FEATURE_MAP arrays.`,
      isCode: true,
    },
  ];

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ background: C.amberLight, border: `1px solid ${C.amberBorder}`, borderRadius: 8, padding: "14px 18px", marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 4 }}>README / User Manual</div>
        <div style={{ fontSize: 12, color: "#78350f" }}>AML Knowledge Library v1.0 · Isolation Forest Pipeline · Feature-to-Indicator Mapping</div>
      </div>
      {sections.map(sec => (
        <div key={sec.title} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, borderBottom: `2px solid ${C.border}`, paddingBottom: 8, marginBottom: 12 }}>{sec.title}</h3>
          {sec.content && !sec.isCode && <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.8, whiteSpace: "pre-line", margin: 0 }}>{sec.content}</p>}
          {sec.isCode && (
            <pre style={{ background: "#1a1f2e", color: "#e2e8f0", padding: 16, borderRadius: 6, fontSize: 11, fontFamily: C.mono, lineHeight: 1.6, overflow: "auto", margin: 0 }}>{sec.content}</pre>
          )}
          {sec.subsections && sec.subsections.map(ss => (
            <div key={ss.sub} style={{ marginBottom: 12, paddingLeft: 14, borderLeft: `3px solid ${C.amberBorder}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>{ss.sub}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>{ss.text}</div>
            </div>
          ))}
          {sec.items && (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {sec.items.map((item, i) => (
                <li key={i} style={{ fontSize: 12, color: C.muted, lineHeight: 1.8 }}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════════
export default function AMLLibrary() {
  const [tab, setTab] = useState("readme");

  const tabs = [
    { id: "readme", label: "README" },
    { id: "typologies", label: "Typologies", count: TYPOLOGIES.length },
    { id: "indicators", label: "Indicators", count: INDICATORS.length },
    { id: "featuremap", label: "Feature Map", count: FEATURE_MAP.length },
    { id: "sources", label: "Sources", count: Object.keys(SOURCES).length },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: C.sans }}>
      {/* Header */}
      <div style={{ background: C.bgSide, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 0" }}>
          <div style={{ width: 30, height: 30, background: C.amber, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, color: "#fff" }}>⬡</div>
          <div>
            <div style={{ color: "#f1f5f9", fontSize: 14, fontWeight: 800, letterSpacing: "0.05em" }}>AML Knowledge Library · Team 23</div>
            <div style={{ color: "#475569", fontSize: 10, fontFamily: C.mono }}>FINTRAC · FATF · FinCEN · PCMLTFA · Academic Research</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 10, fontFamily: C.mono }}>
          <span style={{ color: "#475569" }}>TYPOLOGIES: <span style={{ color: "#f59e0b" }}>{TYPOLOGIES.length}</span></span>
          <span style={{ color: "#475569" }}>INDICATORS: <span style={{ color: "#f59e0b" }}>{INDICATORS.length}</span></span>
          <span style={{ color: "#475569" }}>FEATURES: <span style={{ color: "#f59e0b" }}>{FEATURE_MAP.length}</span></span>
          <span style={{ color: "#475569" }}>SOURCES: <span style={{ color: "#f59e0b" }}>{Object.keys(SOURCES).length}</span></span>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ background: C.bgCard, borderBottom: `1px solid ${C.border}`, padding: "0 28px", display: "flex", gap: 2 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "12px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer",
            background: "none", border: "none",
            borderBottom: tab === t.id ? `2px solid ${C.amber}` : "2px solid transparent",
            color: tab === t.id ? C.amber : C.muted,
            display: "flex", alignItems: "center", gap: 6, fontFamily: C.sans,
            transition: "all 0.1s",
          }}>
            {t.label}
            {t.count !== undefined && (
              <span style={{ background: tab === t.id ? C.amberLight : "#f3f4f6", color: tab === t.id ? C.amber : C.muted, padding: "1px 6px", borderRadius: 10, fontSize: 10, fontFamily: C.mono }}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
        {tab === "typologies" && <TypologyView />}
        {tab === "indicators" && <IndicatorView />}
        {tab === "featuremap" && <FeatureMapView />}
        {tab === "sources" && <SourcesView />}
        {tab === "readme" && <ReadmeView />}
      </div>

      {/* Footer */}
      <div style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, padding: "8px 28px", display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, fontFamily: C.mono }}>
        <span>AML KNOWLEDGE LIBRARY · TEAM 23 · All indicators traceable to primary regulatory sources</span>
        <span>PCMLTFA · FINTRAC · FATF · FinCEN</span>
      </div>
    </div>
  );
}