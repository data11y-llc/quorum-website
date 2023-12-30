import { LoadScript } from '../util/helper';
import { QUORUM_LOAD, QUORUM_STANDARD_LIBRARY } from '../util/versionNumbers';
import { CipherGlobals } from './Globals.js';
import { letterButtonType, alphabetCharType } from './Types.js';

enum BarChartColumn {
  Letters,
  StandardEnglish,
  OriginalMessage
}

let frequencyFrame: quorum_Libraries_Compute_Statistics_DataFrame_ | null = null;
let frequencyBarChart: quorum_Libraries_Interface_Controls_Charts_BarChart_ | null = null;
let currentFrequencyChart: chartControlType | null = null;
let frequencyGame: quorum_Libraries_Interface_Controls_Charts_ChartDisplay_ | null = null;
let frameFrequencyOptions: quorum_Libraries_Game_WebConfiguration_ | null = null;

export async function createChart() {
  //import embed.js

  LoadScript(QUORUM_LOAD).then(() => {
    setTimeout(() => {
      LoadScript(QUORUM_STANDARD_LIBRARY).then(() => {
        const dataArray: [string, number | string, number | string][] = [];

        const originalRow = document.getElementById('lockedRow');
        const originalLetters = originalRow?.getElementsByTagName(
          'button'
        ) as HTMLCollectionOf<letterButtonType>;

        dataArray.push(['Letter', 'Standard English', 'Original Message']);

        for (const letter of originalLetters) {
          let stdEnglish =
            CipherGlobals.STD_ENGLISH_FREQUENCY[
            letter.dataset.currentLetter as alphabetCharType
            ];
          stdEnglish = stdEnglish ? stdEnglish * 100 : 0;
          dataArray.push([
            letter.dataset.letterOG,
            stdEnglish,
            +letter.dataset.ogFrequency,
          ]);
        }

        for (let i = 1; i < dataArray.length; i++) {
          const row = dataArray[i] as [string, number, number];
          if (
            row.length !== 3 ||
            typeof row[0] !== 'string' ||
            typeof row[1] !== 'number' ||
            typeof row[2] !== 'number'
          ) {
            throw new Error(`Invalid row structure at index ${i}`);
          }
        }

        const dataFrameText = dataArray.join('\n');
        frequencyFrame = new quorum_Libraries_Compute_Statistics_DataFrame_();
        frequencyFrame.LoadFromCommaSeparatedValue$quorum_text(dataFrameText);

        frequencyFrame.AddSelectedFactor$quorum_integer(BarChartColumn.Letters);
        frequencyFrame.AddSelectedColumn$quorum_integer(
          BarChartColumn.OriginalMessage
        );
        frequencyFrame.AddSelectedColumn$quorum_integer(
          BarChartColumn.StandardEnglish
        );

        const category = frequencyFrame.GetColumn$quorum_integer(
          BarChartColumn.Letters
        );

        const names = new quorum_Libraries_Containers_Array_();
        //put the chart column in the order we want
        for (const ogLetter of originalLetters) {
          names.Add$quorum_Libraries_Language_Object(ogLetter.dataset.letterOG);
        }

        const sort: quorum_LabelSort_ = new quorum_LabelSort_();
        sort.SetLabels$quorum_Libraries_Containers_Array(names);
        category.SetSortComparison$quorum_Libraries_Containers_Support_Comparison(
          sort
        );

        frequencyBarChart = frequencyFrame.BarChart();
        if (frequencyBarChart) {
          frequencyBarChart.SetTitle$quorum_text('Letter Frequency');
          frequencyBarChart.SetTitleFontSize$quorum_integer(20);
          console.log(frequencyBarChart);
          frequencyBarChart.SetLegendLocationToTop();

          frequencyBarChart.SetXAxisTitle$quorum_text('Letters');
          frequencyBarChart.SetXLabelFontSize$quorum_integer(25);

          frequencyBarChart.SetYAxisTitle$quorum_text('Frequency %');
          frequencyBarChart.SetLegendLabelFontSize$quorum_integer(16);

          frequencyBarChart.ShowAnnotations$quorum_boolean(false);

          displayFrequencyChart(frequencyBarChart);
        }
      });
    }, 1000);
  });
}

async function displayFrequencyChart(
  chart: quorum_Libraries_Interface_Controls_Charts_BarChart_ | null
) {
  if (frequencyGame == null && chart) {
    try {
      frameFrequencyOptions = new quorum_Libraries_Game_WebConfiguration_();
      await frameFrequencyOptions.Set_Libraries_Game_WebConfiguration__capFramesPerSecond_(
        true
      );
      await frameFrequencyOptions.Set_Libraries_Game_WebConfiguration__framesPerSecondLimit_(
        15
      );
      frequencyGame =
        new quorum_Libraries_Interface_Controls_Charts_ChartDisplay_();
      await frequencyGame.SetConfiguration$quorum_Libraries_Game_WebConfiguration(
        frameFrequencyOptions
      );
      await frequencyGame.SetChart$quorum_Libraries_Interface_Controls_Charts_Chart(
        chart
      );
      frequencyGame.StartGame();
    } catch (e) {
      console.log(e);
    }
    currentFrequencyChart = chart;
  } else {
    try {
      if (chart && currentFrequencyChart && frequencyGame) {
        await chart.SetPercentageWidth$quorum_number(1);
        await chart.SetPercentageHeight$quorum_number(1);
        await frequencyGame.Remove$quorum_Libraries_Interface_Item2D(
          currentFrequencyChart
        );
        await frequencyGame.Add$quorum_Libraries_Interface_Item2D(chart);
      }
    } catch (e) {
      console.log(e);
    }
    currentFrequencyChart = chart;
  }
}

///*******************
//  Quorum Sort Functions
//********************/
function quorum_LabelSort_(this: any, parents: null | undefined) {
  this.prototype = this;
  this.parentNames_ = [
    'Libraries.Containers.Support.Comparison',
    'Libraries.Language.Object',
    'LabelSort',
  ];
  this.Libraries_Containers_Support_Comparison__ = null;
  this.Libraries_Language_Object__ = null;
  this.Equals$quorum_Libraries_Language_Object = function(object: any) {
    return this.Libraries_Language_Object__.Equals$quorum_Libraries_Language_Object(
      object
    );
  };
  this.GetHashCode = function() {
    return this.Libraries_Language_Object__.GetHashCode();
  };
  this.Compare$quorum_Libraries_Language_Object = function(object: any) {
    return this.Libraries_Language_Object__.Compare$quorum_Libraries_Language_Object(
      object
    );
  };
  this.Main = function() { };
  this.Compare$quorum_Libraries_Language_Object$quorum_Libraries_Language_Object =
    function(a: any, b: any) {
      //@ts-ignore
      const l = global_CheckCast(a, 'Libraries.Language.Types.Text');
      //@ts-ignore
      const r = global_CheckCast(b, 'Libraries.Language.Types.Text');
      const left = l.GetValue();
      const right = r.GetValue();
      //@ts-ignore
      let has =
        this.Get_LabelSort__index_().HasKey$quorum_Libraries_Language_Object(
          new quorum_Libraries_Language_Types_Text_(false, left)
        );
      if (!has) {
        return 0;
      }
      //@ts-ignore
      const keyLeft = global_GetValue_(
        this.Get_LabelSort__index_().GetValue$quorum_Libraries_Language_Object(
          new quorum_Libraries_Language_Types_Text_(false, left)
        ),
        'integer'
      );
      //@ts-ignore
      has =
        this.Get_LabelSort__index_().HasKey$quorum_Libraries_Language_Object(
          new quorum_Libraries_Language_Types_Text_(false, right)
        );
      if (!has) {
        return 1;
      }
      //@ts-ignore
      const keyRight = global_GetValue_(
        this.Get_LabelSort__index_().GetValue$quorum_Libraries_Language_Object(
          new quorum_Libraries_Language_Types_Text_(false, right)
        ),
        'integer'
      );
      if (keyLeft > keyRight) {
        return 1;
      } else if (keyLeft == keyRight) {
        return 0;
      } else {
        return -1;
      }
    };
  this.GetLabels = function() {
    return this.Get_LabelSort__labels_();
  };
  //TODO notify this line was an issue
  // var value = global_GetValue_(labels.Get$quorum_integer(i), "text");
  this.SetLabels$quorum_Libraries_Containers_Array = function(
    labels: quorum_Libraries_Containers_Array_
  ) {
    this.labels = labels;
    this.Get_LabelSort__index_().Empty();
    let i = 0;
    while (i < labels.GetSize()) {
      const value = labels.Get$quorum_integer(i);
      //@ts-ignore
      this.Get_LabelSort__index_().Add$quorum_Libraries_Language_Object$quorum_Libraries_Language_Object(
        new quorum_Libraries_Language_Types_Text_(false, value),
        new quorum_Libraries_Language_Types_Integer_(false, i)
      );
      i = i + 1;
    }
  };
  this.Get_LabelSort__index_ = function() {
    return this.index;
  };
  this.Set_LabelSort__index_ = function(value: any) {
    this.index = value;
  };
  this.Get_LabelSort__labels_ = function() {
    return this.labels;
  };
  this.Set_LabelSort__labels_ = function(value: any) {
    this.labels = value;
  };
  this.Get_Libraries_Containers_Support_Comparison__SMALLER_ = function() {
    return this.Libraries_Containers_Support_Comparison__.Get_Libraries_Containers_Support_Comparison__SMALLER_();
  };
  this.Set_Libraries_Containers_Support_Comparison__SMALLER_ = function(
    value: any
  ) {
    this.Libraries_Containers_Support_Comparison__.Set_Libraries_Containers_Support_Comparison__SMALLER_(
      value
    );
  };
  this.Get_Libraries_Containers_Support_Comparison__LARGER_ = function() {
    return this.Libraries_Containers_Support_Comparison__.Get_Libraries_Containers_Support_Comparison__LARGER_();
  };
  this.Set_Libraries_Containers_Support_Comparison__LARGER_ = function(
    value: any
  ) {
    this.Libraries_Containers_Support_Comparison__.Set_Libraries_Containers_Support_Comparison__LARGER_(
      value
    );
  };
  this.Get_Libraries_Containers_Support_Comparison__EQUAL_ = function() {
    return this.Libraries_Containers_Support_Comparison__.Get_Libraries_Containers_Support_Comparison__EQUAL_();
  };
  this.Set_Libraries_Containers_Support_Comparison__EQUAL_ = function(
    value: any
  ) {
    this.Libraries_Containers_Support_Comparison__.Set_Libraries_Containers_Support_Comparison__EQUAL_(
      value
    );
  };
  if (parents == null) {
    //@ts-ignore
    this.Libraries_Language_Object__ = new quorum_Libraries_Language_Object_(
      false
    );
    //@ts-ignore
    this.Libraries_Containers_Support_Comparison__ =
      new quorum_Libraries_Containers_Support_Comparison_(false);
    this.Libraries_Containers_Support_Comparison__.Libraries_Language_Object__ =
      this.Libraries_Language_Object__;
    this.Libraries_Containers_Support_Comparison__.prototype = this;
  }
  this.labels = null;
  //@ts-ignore
  this.index = new quorum_Libraries_Containers_HashTable_();

  if (parents == null) {
  }
}

