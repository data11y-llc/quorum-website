export interface AccessChartType {
  game: quorum_Libraries_Interface_Controls_Charts_ChartDisplay_ | null,
  chart: chartControlType | null,
  currentChart: chartControlType | null,
  frameOptions: quorum_Libraries_Game_WebConfiguration_ | null,
  HeaderOptions: string[], // used for the dropdown menu
  frame: quorum_Libraries_Compute_Statistics_DataFrame_ | null, // frame for the quorum environment
  randomizedFrame: quorum_Libraries_Compute_Statistics_DataFrame_ | null,
  filteredFrame: quorum_Libraries_Compute_Statistics_DataFrame_ | null,
  csvText: string,
  oldCsv: string,
  originalFrame: quorum_Libraries_Compute_Statistics_DataFrame_ | null,
  inputValues: inputValuesType,
}

interface inputValuesType {
  FilterText: string,
  RandomizerText: string,
  ChartType: string
  Factor1: string
  Factor2: string
  IntervalSize: string
  ColorPallete: string
  ValueX: string
  ValueY: string
  Legend: string
}
