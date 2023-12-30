import { CsvColOptions } from "../UiKit/molecules/modals/csvSettings.js";
import { ColorPalette, LegendTypes } from "./globals.js";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;
export interface QuorumChartProperties {
  csvData: string;
  frame: quorum_Libraries_Compute_Statistics_DataFrame_ | undefined;
  game: quorum_Libraries_Interface_Controls_Charts_ChartDisplay_ | undefined;
  frameOptions: quorum_Libraries_Game_WebConfiguration_;
  columnOptions: CsvColOptions | undefined;
  chart: chartControlType | undefined;
  color: ColorPalette;
  legendPos: LegendTypes;
  chartTitle: string | undefined;
  factor1: string | undefined;
  factor2: string | undefined;
  valueX: string | undefined;
  valueY: string | undefined;
  valueZ: string | undefined;
  uniqueId: string;
  graphicContainer: HTMLDivElement | undefined;
  headers: string[];
  OGHeaders: string[];
  statusPTag: HTMLParagraphElement | undefined;
  statusText: string;
  OGFrame: quorum_Libraries_Compute_Statistics_DataFrame_ | undefined;

  randomValue: number | undefined;
  filterValue: string | undefined;

  interval: number | undefined;
  //checkboxes
  showLabels: boolean;
  outliers: boolean;
  leastSquaresLine: boolean;
  movableLine: boolean;
  squareOfResiduals: boolean;
  interceptLock: boolean;
  horizontalLayout: boolean;
}


export function quorumChartProperties<TBase extends Constructor>(Base: TBase): TBase & Constructor<QuorumChartProperties> {
  class QuorumChartPropertiesMixin extends Base implements QuorumChartProperties {
    _csvData = '';
    _frame: quorum_Libraries_Compute_Statistics_DataFrame_ | undefined;
    _game: quorum_Libraries_Interface_Controls_Charts_ChartDisplay_ | undefined;
    _frameOptions: quorum_Libraries_Game_WebConfiguration_ | undefined;
    _columnOptions: CsvColOptions | undefined;
    _chart: chartControlType | undefined;
    _color: ColorPalette = ColorPalette.Colorgorical;
    _legendPos: LegendTypes = LegendTypes.None;
    _chartTitle: string | undefined;
    _factor1: string | undefined;
    _factor2: string | undefined;
    _valueX: string | undefined;
    _valueY: string | undefined;
    _valueZ: string | undefined;
    _uniqueId = '';
    //graphic container
    _graphicContainer: HTMLDivElement | undefined;
    _statusPTag: HTMLParagraphElement | undefined;
    _OGFrame: quorum_Libraries_Compute_Statistics_DataFrame_ | undefined;

    _randomValue: number | undefined;
    _filterValue: string | undefined;

    _interval: number | undefined;
    //checkboxes
    _showLabels = false;
    _outliers = false;
    _leastSquaresLine = false;
    _movableLine = false;
    _squareOfResiduals = false;
    _interceptLock = false;
    _horizontalLayout = false;

    get statusPTag(): HTMLParagraphElement | undefined {
      return this._statusPTag;
    }

    set statusPTag(statusPTag: HTMLParagraphElement | undefined) {
      this._statusPTag = statusPTag;
    }

    set statusText(text: string) {
      if (this._statusPTag) {
        this._statusPTag.innerText = text;
      }
    }

    get showLabels(): boolean {
      return this._showLabels;
    }

    set showLabels(showLabels: boolean) {
      this._showLabels = showLabels;
    }

    get outliers(): boolean {
      return this._outliers;
    }

    set outliers(outliers: boolean) {
      this._outliers = outliers;
    }

    get leastSquaresLine(): boolean {
      return this._leastSquaresLine;
    }

    set leastSquaresLine(leastSquaresLine: boolean) {
      this._leastSquaresLine = leastSquaresLine;
    }

    get movableLine(): boolean {
      return this._movableLine;
    }

    set movableLine(movableLine: boolean) {
      this._movableLine = movableLine;
    }

    get squareOfResiduals(): boolean {
      return this._squareOfResiduals;
    }

    set squareOfResiduals(squareOfResiduals: boolean) {
      this._squareOfResiduals = squareOfResiduals;
    }

    get interceptLock(): boolean {
      return this._interceptLock;
    }

    set interceptLock(interceptLock: boolean) {
      this._interceptLock = interceptLock;
    }

    get horizontalLayout(): boolean {
      return this._horizontalLayout;
    }

    set horizontalLayout(horizontalLayout: boolean) {
      this._horizontalLayout = horizontalLayout;
    }

    get graphicContainer(): HTMLDivElement | undefined {
      return this._graphicContainer;
    }

    set graphicContainer(graphicContainer: HTMLDivElement | undefined) {
      this._graphicContainer = graphicContainer;
    }

    get uniqueId(): string {
      if (this._uniqueId === undefined) {
        throw new Error('uniqueId is undefined');
      }
      return this._uniqueId;
    }

    set uniqueId(uniqueId: string) {
      this._uniqueId = uniqueId;
    }

    get game(): quorum_Libraries_Interface_Controls_Charts_ChartDisplay_ | undefined {
      return this._game;
    }

    set game(game: quorum_Libraries_Interface_Controls_Charts_ChartDisplay_ | undefined) {
      this._game = game;
      // console.log('game', this._game);
    }

    get frameOptions(): quorum_Libraries_Game_WebConfiguration_ {
      if (this._frameOptions === undefined) {
        throw new Error('frameOptions is undefined');
      }
      return this._frameOptions;
    }

    set frameOptions(frameOptions: quorum_Libraries_Game_WebConfiguration_) {
      this._frameOptions = frameOptions;
      // console.log('frameOptions', this._frameOptions);
    }

    get interval(): number | undefined {
      return this._interval;
    }

    set interval(interval: number | undefined) {
      this._interval = interval;
      // console.log('interval', this._interval);
    }

    get csvData(): string {
      return this._csvData;
    }

    set csvData(csvData: string) {
      // console.log('csvData changed');
      this._csvData = csvData;
    }

    get frame(): quorum_Libraries_Compute_Statistics_DataFrame_ | undefined {
      return this._frame;

    }

    set frame(frame: quorum_Libraries_Compute_Statistics_DataFrame_ | undefined) {
      this._frame = frame;
    }

    get OGFrame(): quorum_Libraries_Compute_Statistics_DataFrame_ | undefined {
      return this._OGFrame;
    }

    set OGFrame(OGFrame: quorum_Libraries_Compute_Statistics_DataFrame_ | undefined) {
      this._OGFrame = OGFrame;
      console.log('OGFrame', this._OGFrame);
    }

    get headers(): string[] {
      if (this.frame === undefined) {
        throw new Error('frame is undefined');
      }
      if (this.frame.GetHeaders().GetSize() === 0) {
        throw new Error('headers is undefined');
      }
      const headers: string[] = [];
      const length = this.frame.GetHeaders().GetSize();

      for (let i = 0; i < length; i++) {
        const column = this.frame.GetColumn$quorum_integer(i);
        headers[i] = column.GetHeader();
      }
      return headers;
    }

    get OGHeaders(): string[] {
      if (this.OGFrame === undefined) {
        throw new Error('OGFrame is undefined');
      }
      if (this.OGFrame.GetHeaders().GetSize() === 0) {
        throw new Error('OGHeaders is undefined');
      }
      const headers: string[] = [];
      const length = this.OGFrame.GetHeaders().GetSize();

      for (let i = 0; i < length; i++) {
        const column = this.OGFrame.GetColumn$quorum_integer(i);
        headers[i] = column.GetHeader();
      }
      return headers;
    }

    get columnOptions(): CsvColOptions {
      if (this._columnOptions === undefined) {
        throw new Error('columnOptions is undefined');
      }
      return this._columnOptions;
    }

    set columnOptions(columnOptions: CsvColOptions) {
      this._columnOptions = columnOptions;
      console.log('columnOptions', this._columnOptions);
    }

    get randomValue(): number | undefined {
      return this._randomValue;
    }

    set randomValue(randomValue: number | undefined) {
      this._randomValue = randomValue;
      console.log('randomValue', this._randomValue);
    }

    get filterValue(): string | undefined {
      return this._filterValue;
    }

    set filterValue(filterValue: string | undefined) {
      this._filterValue = filterValue;
      console.log('filterValue', this._filterValue);
    }

    get chart(): chartControlType {
      if (this._chart === undefined) {
        throw new Error('chart is undefined');
      }
      return this._chart;
    }

    set chart(chart: chartControlType) {
      this._chart = chart;
      console.log('quorum chart class changed');
    }

    get chartTitle(): string | undefined {
      return this._chartTitle;
    }

    set chartTitle(chartTitle: string | undefined) {
      this._chartTitle = chartTitle;
      console.log('chartTitle', this._chartTitle);
    }

    get color(): ColorPalette {
      return this._color;
    }

    set color(color: ColorPalette) {
      console.log('color', color);
      this._color = color;
    }

    get legendPos(): LegendTypes {
      return this._legendPos;
    }

    set legendPos(lengendPos: LegendTypes) {
      console.log('lengendPos', lengendPos);
      this._legendPos = lengendPos;
    }

    get factor1(): string | undefined {
      return this._factor1;
    }

    set factor1(factor1: string | undefined) {
      console.log('factor1', factor1);
      this._factor1 = factor1;
    }

    get factor2(): string | undefined {
      return this._factor2;
    }

    set factor2(factor2: string | undefined) {
      console.log('factor2', factor2);
      this._factor2 = factor2;
    }

    get valueX(): string | undefined {
      return this._valueX;
    }

    set valueX(valueX: string | undefined) {
      console.log('valueX', valueX);
      this._valueX = valueX;
    }

    get valueY(): string | undefined {
      return this._valueY;
    }

    set valueY(valueY: string | undefined) {
      this._valueY = valueY;
      console.log('valueY', this._valueY);
    }

    get valueZ(): string | undefined {
      return this._valueZ;
    }

    set valueZ(valueZ: string | undefined) {
      this._valueZ = valueZ;
      console.log('valueZ', this._valueZ);
    }
  }
  return QuorumChartPropertiesMixin;
}
