import { loggedMethod } from '../util/decorators.js';
import {
  ChartTypes,
  ColorPalette,
  LegendTypes,
  OPTION_FPS,
} from './globals.js';
import { quorumChartProperties } from './quorumChartProperties.js';

export class quorumChart extends quorumChartProperties(Object) {
  #chartType: ChartTypes = ChartTypes.BarChart;
  #randomValue: number = 100;
  #screenshotListener: quorum_Libraries_Interface_Events_ScreenshotListener_ | null =
    null;

  constructor() {
    super();
  }

  set randomValue(value: number) {
    this.#randomValue = value;
    this.frame = this.randomizeFrame();
  }

  get randomValue(): number {
    return this.#randomValue;
  }

  get chartType(): ChartTypes {
    return this.#chartType;
  }

  set chartType(chartType: ChartTypes) {
    this.#chartType = chartType;
    if (this.csvData !== '') {
      this.game = undefined;
      this.Stop();
      setTimeout(() => {
        this.createChart();
      }, 100);
    } else {
      console.log('no csv data');
    }
  }

  get screenshotListener(): quorum_Libraries_Interface_Events_ScreenshotListener_ | null {
    return this.#screenshotListener;
  }

  set screenshotListener(
    screenshotListener: quorum_Libraries_Interface_Events_ScreenshotListener_ | null
  ) {
    this.#screenshotListener = screenshotListener;
  }

  @loggedMethod
  public createNewFrame() {
    this.frame = new quorum_Libraries_Compute_Statistics_DataFrame_();
  }

  @loggedMethod
  public loadFrame() {
    if (this.frame) {
      this.frame.LoadFromCommaSeparatedValue$quorum_text(this.csvData);
      this.OGFrame = this.frame.Copy();
    }
  }

  @loggedMethod
  convertToNumberColumn(column: any, i: number) {
    if (this.frame && this.OGFrame) {
      const newColumn = column.ConvertToNumberColumn();
      this.frame.RemoveColumnAt$quorum_integer(i);
      this.frame.AddColumn$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(
        i,
        newColumn
      );
      this.OGFrame.RemoveColumnAt$quorum_integer(i);
      this.OGFrame.AddColumn$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(
        i,
        newColumn
      );
    }
  }

  @loggedMethod
  convertToTextColumn(column: any, i: number) {
    if (this.frame && this.OGFrame) {
      const newColumn = column.ConvertToTextColumn();
      this.frame.RemoveColumnAt$quorum_integer(i);
      this.frame.AddColumn$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(
        i,
        newColumn
      );
      this.OGFrame.RemoveColumnAt$quorum_integer(i);
      this.OGFrame.AddColumn$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(
        i,
        newColumn
      );
    }
  }

  @loggedMethod
  convertToBooleanColumn(column: any, i: number) {
    if (this.frame && this.OGFrame) {
      const newColumn = column.ConvertToBooleanColumn();
      this.frame.RemoveColumnAt$quorum_integer(i);
      this.frame.AddColumn$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(
        i,
        newColumn
      );
      this.OGFrame.RemoveColumnAt$quorum_integer(i);
      this.OGFrame.AddColumn$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(
        i,
        newColumn
      );
    }
  }

  @loggedMethod
  async switchQuorumFrame(): Promise<chartControlType> {
    if (this.frame) {
      try {
        switch (this.chartType) {
          case ChartTypes.BoxPlot:
            return await this.frame.BoxPlot();
          case ChartTypes.BarChart:
            return await this.frame.BarChart();
          case ChartTypes.Histogram:
            return await this.frame.Histogram();
          case ChartTypes.PieChart:
            return await this.frame.PieChart();
          case ChartTypes.ScatterPlot:
            return await this.frame.ScatterPlot();
          case ChartTypes.LineChart:
            return await this.frame.LineChart();
          default:
            throw new Error('Unsupported chart type');
        }
      } catch (e: any) {
        console.error(e);
        if (e.GetErrorMessage) {
          throw new Error(e.GetErrorMessage());
        } else {
          throw new Error('Unknown error');
        }
      }
    } else {
      throw new Error('No data loaded');
    }
  }

  @loggedMethod
  async switchColorPallete(chart: chartControlType) {
    try {
      switch (this.color) {
        case ColorPalette.Colorgorical:
          await chart.SetColorPaletteToColorgorical();
          break;
        case ColorPalette.Calm:
          await chart.SetColorPaletteToCalm();
          break;
        case ColorPalette.Cool:
          await chart.SetColorPaletteToCoolScale();
          break;
        case ColorPalette.Disturbing:
          await chart.SetColorPaletteToDisturbing();
          break;
        case ColorPalette.Exciting:
          await chart.SetColorPaletteToExciting();
          break;
        case ColorPalette.Magma:
          await chart.SetColorPaletteToMagma();
          break;
        case ColorPalette.Negative:
          await chart.SetColorPaletteToNegative();
          break;
        case ColorPalette.Playful:
          await chart.SetColorPaletteToPlayful();
          break;
        case ColorPalette.Positive:
          await chart.SetColorPaletteToPositive();
          break;
        case ColorPalette.Serious:
          await chart.SetColorPaletteToSerious();
          break;
        case ColorPalette.Trustworthy:
          await chart.SetColorPaletteToTrustworthy();
          break;
        case ColorPalette.Warm:
          await chart.SetColorPaletteToWarmScale();
          break;
      }
    } catch (e: any) {
      console.error(e);
      if (e.GetErrorMessage) {
        throw new Error(e.GetErrorMessage());
      }
    }
  }

  @loggedMethod
  async switchLegendPosition(chart: chartControlType) {
    const showLegend = this.legendPos !== LegendTypes.None;

    try {
      await chart.ShowLegend$quorum_boolean(showLegend);

      if (showLegend) {
        switch (this.legendPos) {
          case LegendTypes.Top:
            chart.SetLegendLocationToTop();
            break;
          case LegendTypes.Right:
            chart.SetLegendLocationToRight();
            break;
          case LegendTypes.Bottom:
            chart.SetLegendLocationToBottom();
            break;
          case LegendTypes.Left:
            chart.SetLegendLocationToLeft();
            break;
          default:
            return;
        }
      }
    } catch (e: any) {
      console.error(e);
      if (e.GetErrorMessage) {
        throw new Error(e.GetErrorMessage());
      }
    }
  }

  @loggedMethod
  public async createChart() {
    if (!this.frame || !this.OGFrame) {
      this.createNewFrame();
      return;
    }

    try {
      this.frame = await this.filterFrame();
    } catch (e: any) {
      console.error(e);
      if (e.GetErrorMessage) {
        throw new Error(e.GetErrorMessage());
      }
    }

    this.resetFrames();

    this.addFactorsAndValues();

    if (this.areFactorsOrValuesEmpty()) {
      this.displayErrorMessage('No factors or values selected\r\n');
      return;
    }

    try {
      const chart = await this.switchQuorumFrame();
      this.updateChart(chart);
    } catch (e) {
      this.displayErrorMessage(e);
    }
  }

  resetFrames() {
    if (this.frame && this.OGFrame) {
      this.frame.EmptySelectedColumns();
      this.frame.EmptySelectedFactors();
    }
  }

  addFactorsAndValues(): void {
    const addToFrames = (
      method: keyof quorum_Libraries_Compute_Statistics_DataFrame_,
      value: string
    ) => {
      if (
        method === 'AddSelectedFactors$quorum_text' ||
        method === 'AddSelectedColumns$quorum_text'
      ) {
        if (value && value !== '-' && this.frame && this.OGFrame) {
          this.frame[method](value);
          this.OGFrame[method](value);
        }
      }
    };

    addToFrames('AddSelectedFactors$quorum_text', this.factor1 as string);
    addToFrames('AddSelectedFactors$quorum_text', this.factor2 as string);
    addToFrames('AddSelectedColumns$quorum_text', this.valueX as string);
    addToFrames('AddSelectedColumns$quorum_text', this.valueY as string);
    addToFrames('AddSelectedColumns$quorum_text', this.valueZ as string);
  }

  areFactorsOrValuesEmpty(): boolean {
    if (this.frame) {
      return (
        !this.frame.GetSelectedColumnSize() &&
        !this.frame.GetSelectedFactorSize()
      );
    } else {
      return true;
    }
  }

  displayErrorMessage(message: unknown): void {
    this.Stop();
    //check if message actually is a string
    this.game = undefined;
    if (typeof message === 'string') {
      this.statusText = message.startsWith('Error:')
        ? message + '\r\n'
        : 'Error: ' + message + '\r\n';
    } else {
      this.statusText = message;
    }
    if (this.graphicContainer) {
      this.graphicContainer.querySelectorAll(':scope > *').forEach((el) => {
        if (el.id !== this.uniqueId + 'statusText') {
          el.remove();
        }
      });
    }
  }

  async updateChart(chart: chartControlType): Promise<void> {
    if (this.chartTitle) await chart.SetTitle$quorum_text(this.chartTitle);
    this.switchOptions(chart);
    this.switchLegendPosition(chart);
    this.switchColorPallete(chart);
    await this.displayChart(chart);
  }

  @loggedMethod
  async filterFrame(
    value = 'true'
  ): Promise<quorum_Libraries_Compute_Statistics_DataFrame_> {
    if (this.frame === undefined) throw new Error('OGFrame is undefined');
    const filterFrame = this.frame.Copy();
    try {
      const filterValue = this.filterValue || value;
      await filterFrame.Filter$quorum_text(filterValue);
      return filterFrame.Copy();
    } catch (e) {
      console.error(e);
      throw new Error(e.errorMessage);
    }
  }

  @loggedMethod
  randomizeFrame(): quorum_Libraries_Compute_Statistics_DataFrame_ {
    if (this.OGFrame === undefined) throw new Error('OGFrame is undefined');
    if (this.randomValue === undefined)
      throw new Error('randomValue is undefined');
    let randomFrame = this.OGFrame.Copy();
    try {
      randomFrame.SelectAllColumns();

      const value =
        randomFrame.SplitSelectedColumnsRandomlyByRows$quorum_number(
          this.randomValue / 100
        );

      randomFrame = value.Get$quorum_integer(0);

      return randomFrame.Copy();
    } catch (e) {
      console.error(e);
      throw new Error(e.errorMessage);
    }
  }

  @loggedMethod
  private async displayChart(chart: chartControlType) {
    if (!this.game) {
      try {
        this.frameOptions = new quorum_Libraries_Game_WebConfiguration_();
        this.frameOptions.Set_Libraries_Game_WebConfiguration__containerID_(
          this.uniqueId + 'graphicContainer'
        );
        await this.frameOptions.Set_Libraries_Game_WebConfiguration__capFramesPerSecond_(
          true
        );
        await this.frameOptions.Set_Libraries_Game_WebConfiguration__framesPerSecondLimit_(
          OPTION_FPS
        );
        this.game =
          new quorum_Libraries_Interface_Controls_Charts_ChartDisplay_();

        await this.game.SetConfiguration$quorum_Libraries_Game_WebConfiguration(
          this.frameOptions
        );

        await this.game.SetChart$quorum_Libraries_Interface_Controls_Charts_Chart(
          chart
        );

        await this.game.StartGame();
      } catch (e: any) {
        console.error(e);
        if (e.GetErrorMessage) {
          throw new Error(e.GetErrorMessage());
        }
      }
    } else {
      try {
        if (this.chart) {
          await chart.SetPercentageWidth$quorum_number(1);
          await chart.SetPercentageHeight$quorum_number(1);
          await this.game.Remove$quorum_Libraries_Interface_Item2D(this.chart);
          await this.game.Add$quorum_Libraries_Interface_Item2D(chart);
        }
      } catch (e: any) {
        console.error(e);
        if (e.GetErrorMessage) {
          throw new Error(e.GetErrorMessage());
        }
      }
    }
    this.chart = chart;
  }

  @loggedMethod
  async Stop() {
    try {
      const manager = new quorum_Libraries_Game_GameStateManager_();
      const game: quorum_Libraries_Interface_Controls_Charts_ChartDisplay_ =
        await manager.GetGame();
      if (game != null) {
        console.log('Stopping game');
        await game.Exit();
      } else if (
        typeof plugins_quorum_Libraries_Sound_Audio_ === 'function' &&
        typeof plugins_quorum_Libraries_Sound_Audio_.StopAllSources ===
        'function'
      ) {
        console.log('Stopping audio');
        await plugins_quorum_Libraries_Sound_Audio_.StopAllSources();
      }
      await global_Empty_Shared_Classes();
    } catch (e: any) {
      console.error(e);
      if (e.GetErrorMessage) {
        throw new Error(e.GetErrorMessage());
      }
    }
  }

  @loggedMethod
  switchOptions(chart: chartControlType) {
    switch (this.chartType) {
      case ChartTypes.BarChart:
        this.horizontalLayout
          ? chart.SetOrientationToHorizontal()
          : chart.SetOrientationToVertical();
        chart.ShowAnnotations$quorum_boolean(this.showLabels);
        break;
      case ChartTypes.BoxPlot:
        this.horizontalLayout
          ? chart.SetOrientationToHorizontal()
          : chart.SetOrientationToVertical();
        if (this.outliers) chart.HideOutliers();
        chart.ShowAnnotations$quorum_boolean(this.showLabels);
        break;
      case ChartTypes.Histogram:
        this.horizontalLayout
          ? chart.SetOrientationToHorizontal()
          : chart.SetOrientationToVertical();
        if (this.interval) chart.SetXTickInterval$quorum_integer(this.interval);
        chart.ShowAnnotations$quorum_boolean(this.showLabels);
        break;
      case ChartTypes.PieChart:
        this.horizontalLayout
          ? chart.SetOrientationToHorizontal()
          : chart.SetOrientationToVertical();
        chart.ShowAnnotations$quorum_boolean(this.showLabels);
        break;
      case ChartTypes.ScatterPlot:
        //show labels
        chart.ShowAnnotations$quorum_boolean(this.showLabels);
        // Least Squares Line
        chart.ShowLinearRegression$quorum_boolean(this.leastSquaresLine);
        //Movable Line
        chart.ShowMovableRegressionLine$quorum_boolean(this.movableLine);
        //Square of Residuals
        chart.ShowSquaresOfResiduals$quorum_boolean(this.squareOfResiduals);
        //Intercept Lock
        if (this.interceptLock)
          chart.LockRegressionYIntercept$quorum_number(0.0);
        //Horizontal Layout
        this.horizontalLayout
          ? chart.SetOrientationToHorizontal()
          : chart.SetOrientationToVertical();
        break;
      case ChartTypes.LineChart:
        this.horizontalLayout
          ? chart.SetOrientationToHorizontal()
          : chart.SetOrientationToVertical();
        chart.ShowAnnotations$quorum_boolean(this.showLabels);
        break;
    }
  }

  @loggedMethod
  saveImage() {
    if (this.game) {
      if (this.screenshotListener) {
        this.game.RemoveScreenshotListener$quorum_Libraries_Interface_Events_ScreenshotListener(
          this.screenshotListener
        );
      }

      this.screenshotListener =
        new quorum_Libraries_Interface_Events_ScreenshotListener_();
      this.screenshotListener.OnScreenshot$quorum_Libraries_Interface_Events_ScreenshotEvent =
        (event: quorum_Libraries_Interface_Events_ScreenshotEvent_) => {
          const screenshot = event.GetScreenshot();

          const manager = new quorum_Libraries_Game_GameStateManager_();
          const app = manager.GetApplication();

          //if there is a chart title, use it in the file name, otherwise just use the chart type
          let imageFileName: string = this.chartTitle
            ? `${this.chartTitle}_${this.chartType}`
            : this.chartType;
          //make any spaces in the file name underscores
          imageFileName = imageFileName.replace(/\s/g, '_');

          app.SaveImageToDownloads$quorum_Libraries_Game_Graphics_PixelMap$quorum_text(
            screenshot,
            imageFileName
          );
        };
      this.game.AddScreenshotListener$quorum_Libraries_Interface_Events_ScreenshotListener(
        this.screenshotListener
      );
      this.game.Screenshot();
    }
  }
}
