/**
  option to change the amount of times the chart is updated
lower = better computer performance
higher = faster updated chart
**/
export const OPTION_FPS = 20;

export enum ChartTypes {
  BarChart = "Bar Chart",
  BoxPlot = "Box Plot",
  Histogram = "Histogram",
  PieChart = "Pie Chart",
  ScatterPlot = "Scatter Plot",
  LineChart = "Line Chart",
}

export enum LegendTypes {
  None = "None",
  Top = "Top",
  Right = "Right",
  Bottom = "Bottom",
  Left = "Left",
}

export type ChartOptions = [
  "Show Outliers",
  "Least Squares Line",
  "Movable Line",
  "Square of Residuals",
  "Intercept Lock",
  "Horizontal Layout",
  "Show Labels",
];

export const ChartOptionsArray: ChartOptions = [
  "Show Outliers",
  "Least Squares Line",
  "Movable Line",
  "Square of Residuals",
  "Intercept Lock",
  "Horizontal Layout",
  "Show Labels",
];


export enum ColorPalette {
  Colorgorical = "Colorgorical",
  Calm = "Calm",
  Cool = "Cool",
  Disturbing = "Disturbing",
  Exciting = "Exciting",
  Magma = "Magma",
  Negative = "Negative",
  Playful = "Playful",
  Positive = "Positive",
  Serious = "Serious",
  Trustworthy = "Trustworthy",
  Warm = "Warm",
}

