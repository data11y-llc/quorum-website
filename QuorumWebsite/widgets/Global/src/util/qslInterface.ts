//this file is for dev purposes only, will not go on canvas
// this file helps with giving the QSL functions names so ts doesnt say they arent found
//added types for the used functions and methods from QuorumStandardLibrary add more if needed

type chartControlType =
  quorum_Libraries_Interface_Controls_Charts_BoxPlot_
  | quorum_Libraries_Interface_Controls_Charts_Histogram_
  | quorum_Libraries_Interface_Controls_Charts_ScatterPlot_
  | quorum_Libraries_Interface_Controls_Charts_BarChart_
  | quorum_Libraries_Interface_Controls_Charts_PieChart_

type svgWriterType = quorum_Libraries_Interface_Controls_Charts_BarChartWriter_
  | quorum_Libraries_Interface_Controls_Charts_BoxPlotWriter_
  | quorum_Libraries_Interface_Controls_Charts_ScatterPlotWriter_
  | quorum_Libraries_Interface_Controls_Charts_HistogramWriter_
  | quorum_Libraries_Interface_Controls_Charts_PieChartWriter_



declare class quorum_Libraries_Compute_Statistics_DataFrame_ {
  Add$quorum_Libraries_Compute_Statistics_DataFrameSelectionListener(listener: any): void;
  AddColumn$quorum_Libraries_Compute_Statistics_DataFrameColumn(column: any): void;
  AddColumn$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(index: number, column: any): void;
  AddColumn$quorum_text$quorum_text(column: string, source: string): void;
  AddColumnOnLoad$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumn(index: number, column: any): void;
  AddSelectedCell$quorum_Libraries_Containers_Support_Pair(cell: any): void;
  AddSelectedCell$quorum_integer$quorum_integer(x: number, y: number): void;
  AddSelectedColumn$quorum_integer(index: number): void;
  AddSelectedColumnRange$quorum_integer$quorum_integer(start: number, finish: number): void;
  AddSelectedColumns$quorum_text(headers: string): void;
  AddSelectedFactor$quorum_integer(index: number): void;
  AddSelectedFactorRange$quorum_integer$quorum_integer(start: number, finish: number): void;
  AddSelectedFactors$quorum_text(headers: string): void;
  AddSelectedRow(index: number): void;
  BarChart(): Promise<quorum_Libraries_Interface_Controls_Charts_BarChart_>;
  BoxPlot(): Promise<quorum_Libraries_Interface_Controls_Charts_BoxPlot_>;
  Calculate$quorum_Libraries_Compute_Statistics_DataFrameCalculation(calculation: any): void;
  CalculateColumn(source: any): void;
  CalculateMaximumRows(): void;
  CheckDefaultSelection(): void;
  Compare$quorum_Libraries_Language_Object(object: any): void;
  CompareSelectedColumnToMean$quorum_integer(mean: number): void;
  CompareSelectedColumns(): void;
  CompareSelectedCounts(): void;
  CompareSelectedDistributionsToNormal(): void;
  CompareSelectedRankedGroupToMedian$quorum_number(median: number): void;
  CompareSelectedRankedGroups(): void;
  CompareSelectedRelatedColumns(): void;
  CompareSelectedRelatedRankedGroups(): void;
  CompareSelectedRelatedVariances(): void;
  CompareSelectedVariances(): void;
  ConvertToMatrix(): void;
  Copy(): quorum_Libraries_Compute_Statistics_DataFrame_;
  Copy$quorum_integer$quorum_integer$quorum_integer$quorum_integer(columnStart: number, columnEnd: number, rowStart: number, rowEnd: number): void;
  Copy$quorum_text(source: any): void;
  CopySelectedColumns(): void;
  CorrelateSelectedColumns(): void;
  CorrelateSelectedRankedColumns(): void;
  CorrelationMatrix(): void;
  CovarianceMatrix(): void;
  CreateChart$quorum_Libraries_Compute_Statistics_DataFrameChartCreator(creator: any): void;
  CreateChart$quorum_Libraries_Compute_Statistics_DataFrameChartCreator$quorum_boolean(creator: any, sort: boolean): void;
  CrossTab(): void;
  DonutChart(): void;
  DonutChart$quorum_number(donutHolePercent: number): void;
  EmptyColumnsOnLoad(): void;
  EmptySelectedCells(): void;
  EmptySelectedColumns(): void;
  EmptySelectedFactors(): void;
  EmptySelectedRows(): void;
  Equals$quorum_Libraries_Language_Object(object: any): boolean;
  Filter$quorum_text(source: string): Promise<void>;
  GeoMap(): void;
  GeoMap$quorum_text(mapBoundaryFilePath: any): void;
  GetColumn$quorum_integer(index: number): quorum_Libraries_Compute_Statistics_Columns_TextColumn_; //TODO: change to more generic
  GetColumn$quorum_text(header: any): any;
  GetColumnOnLoad$quorum_integer(index: number): any;
  GetColumns(): any;
  GetColumnsFromHeaderNames$quorum_text(headers: string): any;
  GetHashCode(): number;
  GetHeaders(): quorum_Libraries_Containers_Array_;
  GetListeners(): any;
  GetResultFromColumn$quorum_Libraries_Compute_Statistics_DataFrameColumn$quorum_integer(column: any, row: number): any;
  GetSelectedColumnSize(): number;
  GetSelectedFactorSize(): number;
  GetSelection(): any;
  GetSize(): number;
  GetSortingTuple$quorum_Libraries_Containers_Array$quorum_integer(sortOrder: any, row: number): any;
  GetTypeFromColumn$quorum_Libraries_Compute_Statistics_DataFrameColumn(column: any): any;
  Get_Libraries_Compute_Statistics_DataFrame__columnsOnLoad_(): any;
  Get_Libraries_Compute_Statistics_DataFrame__columns_(): any;
  Get_Libraries_Compute_Statistics_DataFrame__selection_(): any;
  HasAnotherRow$quorum_Libraries_Compute_Statistics_DataFrame$quorum_integer(frame: any, row: number): boolean;
  HasColumn$quorum_text(header: any): boolean;
  Histogram(): Promise<quorum_Libraries_Interface_Controls_Charts_Histogram_>;
  Histogram$quorum_integer(binWidth: number): void;
  Histogram$quorum_number(binWidth: number): void;
  InterQuartileRange(): void;
  InterQuartileRangeSelectedColumns(): void;
  IsEmpty(): boolean;
  IsInvalidSelection(): boolean;
  IsMultiColumnSelection(): boolean;
  IsMultiColumnSelection$quorum_integer(columns: number): boolean;
  IsSingleColumnSelection(): boolean;
  Kurtosis(): void;
  KurtosisSelectedColumns(): void;
  LineChart(): any;
  Load$quorum_Libraries_Compute_Statistics_DataFrameLoader(loader: any): void;
  Load$quorum_Libraries_System_File(file: any): void;
  Load$quorum_Libraries_System_File$quorum_Libraries_Compute_Statistics_DataFrameLoader(file: any, loader: any): void;
  Load$quorum_text(location: any): void;
  LoadFromCommaSeparatedValue$quorum_text(value: any): void;
  Mean(): void;
  MeanSelectedColumns(): void;
  Median(): void;
  MedianSelectedColumns(): void;
  Merge$quorum_Libraries_Containers_Array$quorum_Libraries_Compute_Statistics_DataFrame$quorum_integer$quorum_integer$quorum_integer(sortOrder: any, temp: any, left: number, center: number, right: number): void;
  MergeSort$quorum_Libraries_Containers_Array$quorum_Libraries_Compute_Statistics_DataFrame$quorum_integer$quorum_integer(sortOrder: any, temp: any, left: number, right: number): void;
  MoveRow$quorum_Libraries_Compute_Statistics_DataFrame$quorum_integer$quorum_integer$quorum_Libraries_Containers_Array$quorum_boolean(frame: any, row: number, skip: number, sizes: any, markForRemoval: boolean): void;
  MoveRow$quorum_integer$quorum_integer(row1: number, row2: number): void;
  NormalityCheckChart(): void;
  PieChart(): Promise<quorum_Libraries_Interface_Controls_Charts_PieChart_>;
  RegressionOnSelected(): void;
  Remove$quorum_Libraries_Compute_Statistics_DataFrameSelectionListener(listener: any): void;
  RemoveColumnAt$quorum_integer(index: number): void;
  RemoveColumnOnLoad$quorum_integer(index: number): void;
  RemoveSelectedCell$quorum_Libraries_Containers_Support_Pair(index: any): void;
  RemoveSelectedCellAt$quorum_integer(index: number): void;
  RemoveSelectedColumn(index: number): void;
  RemoveSelectedColumnAt(index: number): void;
  RemoveSelectedColumnRange$quorum_integer$quorum_integer(start: number, finish: number): void;
  RemoveSelectedColumns$quorum_text(headers: any): void;
  RemoveSelectedFactor(index: number): void;
  RemoveSelectedFactorAt(index: number): void;
  RemoveSelectedFactorRange$quorum_integer$quorum_integer(start: number, finish: number): void;
  RemoveSelectedFactors(headers: any): void;
  RemoveSelectedRow(index: number): void;
  RemoveSelectedRowAt(index: number): void;
  RemoveUndefinedRows(): void;
  RemoveUndefinedRowsFromSelectedColumns(): void;
  ReplaceUndefined$quorum_text(value: any): void;
  ReplaceUndefinedFromSelectedColumns$quorum_text(value: any): void;
  Save$quorum_Libraries_System_File$quorum_Libraries_Compute_Statistics_DataFrameSaver(file: any, saver: any): void;
  Save$quorum_text(location: any): void;
  ScatterPlot(): Promise<quorum_Libraries_Interface_Controls_Charts_ScatterPlot_>;
  ScreePlot(): void;
  SelectAllColumns(): void;
  SetColumns$quorum_Libraries_Containers_Array(columns: any): void;
  SetRow$quorum_Libraries_Compute_Statistics_DataFrame$quorum_integer$quorum_integer(frame: any, to: number, from: number): void;
  SetSelectedColumnRange$quorum_integer$quorum_integer(start: number, finish: number): void;
  SetSelectedColumns$quorum_text(headers: any): void;
  SetSelectedFactorRange$quorum_integer$quorum_integer(start: number, finish: number): void;
  SetSelectedFactors(headers: any): void;
  Set_Libraries_Compute_Statistics_DataFrame__columnsOnLoad_(value: any): void;
  Set_Libraries_Compute_Statistics_DataFrame__columns_(value: any): void;
  Set_Libraries_Compute_Statistics_DataFrame__selection_(value: any): void;
  SetupRuntime$quorum_Libraries_Compute_Statistics_Transforms_DataFrameExpressionListener$quorum_Libraries_Language_Compile_Interpreter_Runtime$quorum_Libraries_Compute_Statistics_DataFrame$quorum_integer(listener: any, runtime: any, frame: any, row: number): void;
  Skew(): void;
  SkewSelectedColumns(): void;
  Sort$quorum_text(headers: any): void;
  SplitSelectedColumns$quorum_Libraries_Containers_Array$quorum_text(headers: any, delimiter: any): void;
  SplitSelectedColumns$quorum_Libraries_Containers_Array$quorum_text$quorum_boolean(headers: any, delimiter: any, includeUndefined: boolean): void;
  SplitSelectedColumnsRandomlyByRows(): void;
  SplitSelectedColumnsRandomlyByRows$quorum_number(percent: number): Promise<void>;
  SplitSelectedColumnsRandomlyByRows$quorum_number$quorum_number(percent: number, seed: number): void;
  StandardDeviation(): void;
  StandardDeviationSelectedColumns(): void;
  Summarize(): void;
  SummarizeSelectedColumns(): void;
  ToText(): void;
  ToText$quorum_integer(rows: number): void;
  ToText$quorum_integer$quorum_boolean(rows: number, header: boolean): void;
  Transform$quorum_Libraries_Compute_Statistics_DataFrameTransform(transform: any): void;
  Variance(): void;
  VarianceSelectedColumns(): void;
  ViolinPlot(): void;
}



declare class quorum_Libraries_Interface_Controls_Charts_BarChartWriter_ {
  SetChartHeight$quorum_integer(Y: number): any;
  SetChartWidth$quorum_integer(X: number): any;
  WriteOutChart$quorum_Libraries_Interface_Controls_Charts_Chart$quorum_integer$quorum_integer(chart: any, X: number, Y: number): any;
  constructor();
}


declare class quorum_Libraries_Interface_Controls_Charts_BoxPlotWriter_ {
  SetChartHeight$quorum_integer(Y: number): any;
  SetChartWidth$quorum_integer(X: number): any;
  WriteOutChart$quorum_Libraries_Interface_Controls_Charts_Chart$quorum_integer$quorum_integer(chart: any, X: number, Y: number): any;
  constructor();
}
declare class quorum_Libraries_Interface_Controls_Charts_ScatterPlotWriter_ {
  SetChartHeight$quorum_integer(Y: number): any;
  SetChartWidth$quorum_integer(X: number): any;
  WriteOutChart$quorum_Libraries_Interface_Controls_Charts_Chart$quorum_integer$quorum_integer(chart: any, X: number, Y: number): any;
  constructor();
}
declare class quorum_Libraries_Interface_Controls_Charts_HistogramWriter_ {
  SetChartHeight$quorum_integer(Y: number): any;
  SetChartWidth$quorum_integer(X: number): any;
  WriteOutChart$quorum_Libraries_Interface_Controls_Charts_Chart$quorum_integer$quorum_integer(chart: any, X: number, Y: number): any;
  constructor();
}
declare class quorum_Libraries_Interface_Controls_Charts_PieChartWriter_ {
  SetChartHeight$quorum_integer(Y: number): any;
  SetChartWidth$quorum_integer(X: number): any;
  WriteOutChart$quorum_Libraries_Interface_Controls_Charts_Chart$quorum_integer$quorum_integer(chart: any, X: number, Y: number): any;
  constructor();
}

declare class quorum_Libraries_Game_GameStateManager_ {
  GetCurrentState(): any;
  GetGame(): quorum_Libraries_Interface_Controls_Charts_ChartDisplay_;
  SetCurrentState$quorum_Libraries_Game_GameState(state: any): any;
  GetApplication(): any;
  constructor();

}


declare class quorum_Libraries_Interface_Controls_Charts_ChartDisplay_ {
  Add$quorum_Libraries_Game_Graphics_DirectionalLight(light: any): void;
  Add$quorum_Libraries_Game_Graphics_PointLight(light: any): void;
  Add$quorum_Libraries_Interface_Item2D(item: any): void;
  Add$quorum_Libraries_Interface_Item3D(item: any): void;
  AddCollisionListener$quorum_Libraries_Interface_Events_CollisionListener2D(listener: any): void;
  AddCollisionListener$quorum_Libraries_Interface_Events_CollisionListener3D(listener: any): void;
  AddControlActivationListener$quorum_Libraries_Interface_Events_ControlActivationListener(listener: any): void;
  AddFocusListener$quorum_Libraries_Interface_Events_FocusListener(listener: any): void;
  AddGestureListener$quorum_Libraries_Interface_Events_GestureListener(listener: any): void;
  AddInputTable$quorum_Libraries_Game_InputTable(table: any): void;
  AddKeyboardListener$quorum_Libraries_Interface_Events_KeyboardListener(listener: any): void;
  AddLayer$quorum_Libraries_Game_Layer(layer: any): void;
  AddLayer$quorum_integer$quorum_Libraries_Game_Layer(index: any, layer: any): void;
  AddMenuChangeListener$quorum_Libraries_Interface_Events_MenuChangeListener(listener: any): void;
  AddMouseListener$quorum_Libraries_Interface_Events_MouseListener(listener: any): void;
  AddMouseMovementListener$quorum_Libraries_Interface_Events_MouseMovementListener(listener: any): void;
  AddMouseWheelListener$quorum_Libraries_Interface_Events_MouseWheelListener(listener: any): void;
  AddResizeListener$quorum_Libraries_Interface_Events_ResizeListener(listener: any): void;
  AddScreenshotListener$quorum_Libraries_Interface_Events_ScreenshotListener(listener: any): void;
  AddSelectionListener$quorum_Libraries_Interface_Events_SelectionListener(listener: any): void;
  AddTabChangeListener$quorum_Libraries_Interface_Events_TabChangeListener(listener: any): void;
  AddTextChangeListener$quorum_Libraries_Interface_Events_TextChangeListener(listener: any): void;
  AddTextInputListener$quorum_Libraries_Interface_Events_TextInputListener(listener: any): void;
  AddTouchListener$quorum_Libraries_Interface_Events_TouchListener(listener: any): void;
  AddTreeChangeListener$quorum_Libraries_Interface_Events_TreeChangeListener(listener: any): void;
  AddWindowFocusListener$quorum_Libraries_Interface_Events_WindowFocusListener(listener: any): void;
  ClearScreen(): void;
  Compare$quorum_Libraries_Language_Object(object: any): any;
  CompleteInitialSetup$quorum_Libraries_Game_Application(application: any): void;
  ContinueGame(): void;
  CreateDefaultInputTables(): void;
  CreateGame(): void;
  DrawAll(): void;
  EnablePhysics2D$quorum_boolean(flag: any): void;
  EnablePhysics3D$quorum_boolean(flag: any): void;
  EnableResizing$quorum_boolean(resize: any): void;
  EnableTextureAutoResizing$quorum_boolean(resize: any): void;
  Equals$quorum_Libraries_Language_Object(object: any): any;
  Exit(): void;
  FindItem2DByName$quorum_text(name: any): void;
  FindItem3DByName$quorum_text(name: any): void;
  FocusWindow(): void;
  GetAccessibility(): any;
  GetAmbientLight(): any;
  GetAndroidConfiguration(): any;
  GetAvailableResolutions(): any;
  GetCamera2D(): any;
  GetCamera3D(): any;
  GetChart(): any;
  GetClipboard(): any;
  GetCurrentLayer2D(): any;
  GetCurrentLayer3D(): any;
  GetDefaultInputTable(): any;
  GetDesktopConfiguration(): any;
  GetDesktopConfiguration(): void;
  GetDesktopResolution(): void;
  GetDialogLayerPool(): void;
  GetDirectionalLight$quorum_integer(index: number): void;
  GetDirectionalLights(): void;
  GetEditManager(): void;
  GetExitOnStart(): void;
  GetFirstLetterNavigationTime(): void;
  GetFocus(): void;
  GetFocusManager(): void;
  GetFontManager(): void;
  GetGameName(): void;
  GetHashCode(): void;
  GetInputTable$quorum_text(key: string): void;
  GetInterfaceOptions(): void;
  GetInterfaceScale(): void;
  GetLayerIterator(): void;
  GetLayout(): void;
  GetPointLight$quorum_integer(index: number): void;
  GetPointLights(): void;
  GetSceneManager(): void;
  GetScreenHeight(): void;
  GetScreenResolution(): void;
  GetScreenWidth(): void;
  GetSecondsBetweenFrames(): void;
  GetSimulationThreshold2D(): void;
  GetSkybox(): void;
  GetWebConfiguration(): void;
  Get_Libraries_Game_Game__ANDROID_APPLICATION_(): void;
  Get_Libraries_Game_Game__DESKTOP_APPLICATION_(): void;
  Get_Libraries_Game_Game__IOS_APPLICATION_(): void;
  Get_Libraries_Game_Game__WEB_APPLICATION_(): void;
  Get_Libraries_Game_Game__accessibility_(): void;
  Get_Libraries_Game_Game__androidConfig_(): void;
  Get_Libraries_Game_Game__applicationType_(): void;
  Get_Libraries_Game_Game__collide_(): void;
  Get_Libraries_Game_Game__currentLayer2D_(): void;
  Get_Libraries_Game_Game__currentLayer3D_(): void;
  Get_Libraries_Game_Game__desktopConfig_(): void;
  Get_Libraries_Game_Game__dialogLayerPool_(): void;
  Get_Libraries_Game_Game__editManager_(): void;
  Get_Libraries_Game_Game__exitRequested_(): void;
  Get_Libraries_Game_Game__firstLetterNavigationTime_(): void;
  Get_Libraries_Game_Game__focusManager_(): void;
  Get_Libraries_Game_Game__gameInput_(): void;
  Get_Libraries_Game_Game__gl20_(): void;
  Get_Libraries_Game_Game__interfaceOptions_(): void;
  Get_Libraries_Game_Game__iosConfig_(): void;
  Get_Libraries_Game_Game__layers_(): void;
  Get_Libraries_Game_Game__manager_(): void;
  Get_Libraries_Game_Game__pendingScreenshots_(): void;
  Get_Libraries_Game_Game__sceneManager_(): void;
  Get_Libraries_Game_Game__webConfig_(): void;
  Get_Libraries_Interface_Controls_Charts_ChartDisplay__chart_(): void;
  Get_Libraries_Interface_Controls_Charts_ChartDisplay__exitOnStart_(): void;
  Get_Libraries_Interface_Controls_Charts_ChartDisplay__frame_(): void;
  InitializeLayers(): void;
  IsColliding(): void;
  IsWindowFocused(): void;
  IsWindowMaximized(): void;
  IsWindowMinimized(): void;
  Libraries_Game_Game__(): void;
  LoadScene$quorum_Libraries_Game_Scenes_Scene(scene: any): void;
  LoadScene$quorum_Libraries_System_File(file: any): void;
  LoadScene$quorum_text(path: string): void;
  OnExit(): void;
  ProcessInputEvents(): void;
  ProcessScreenshots(): void;
  Remove$quorum_Libraries_Game_Graphics_DirectionalLight(light: any): void;
  Remove$quorum_Libraries_Game_Graphics_PointLight(light: any): void;
  Remove$quorum_Libraries_Interface_Item2D(item: any): void;
  Remove$quorum_Libraries_Interface_Item3D(item: any): void;
  RemoveAmbientLight(): void;
  RemoveCollisionListener$quorum_Libraries_Interface_Events_CollisionListener2D(listener: any): void;
  RemoveCollisionListener$quorum_Libraries_Interface_Events_CollisionListener3D(listener: any): void;
  RemoveControlActivationListener$quorum_Libraries_Interface_Events_ControlActivationListener(listener: any): void;
  RemoveFocusListener$quorum_Libraries_Interface_Events_FocusListener(listener: any): void;
  RemoveGestureListener$quorum_Libraries_Interface_Events_GestureListener(listener: any): void;
  RemoveInputTable$quorum_text(key: any): void;
  RemoveKeyboardListener$quorum_Libraries_Interface_Events_KeyboardListener(listener: any): void;
  RemoveLayer$quorum_Libraries_Game_Layer(layer: any): void;
  RemoveLayer$quorum_integer(index: any): void;
  RemoveMenuChangeListener$quorum_Libraries_Interface_Events_MenuChangeListener(listener: any): void;
  RemoveMouseListener$quorum_Libraries_Interface_Events_MouseListener(listener: any): void;
  RemoveMouseMovementListener$quorum_Libraries_Interface_Events_MouseMovementListener(listener: any): void;
  RemoveMouseWheelListener$quorum_Libraries_Interface_Events_MouseWheelListener(listener: any): void;
  RemoveResizeListener$quorum_Libraries_Interface_Events_ResizeListener(listener: any): void;
  RemoveScreenshotListener$quorum_Libraries_Interface_Events_ScreenshotListener(listener: any): void;
  RemoveSelectionListener$quorum_Libraries_Interface_Events_SelectionListener(listener: any): void;
  RemoveTabChangeListener$quorum_Libraries_Interface_Events_TabChangeListener(listener: any): void;
  RemoveTextChangeListener$quorum_Libraries_Interface_Events_TextChangeListener(listener: any): void;
  RemoveTextInputListener$quorum_Libraries_Interface_Events_TextInputListener(listener: any): void;
  RemoveTouchListener$quorum_Libraries_Interface_Events_TouchListener(listener: any): void;
  RemoveTreeChangeListener$quorum_Libraries_Interface_Events_TreeChangeListener(listener: any): void;
  RemoveWindowFocusListener$quorum_Libraries_Interface_Events_WindowFocusListener(listener: any): void;
  ResetDepthBuffer(): void;
  SaveScene(): void;
  SaveScene$quorum_Libraries_System_File(file: any): void;
  Screenshot(): void;
  Screenshot$quorum_Libraries_Interface_Events_ScreenshotListener(callback: any): void;
  Screenshot$quorum_integer$quorum_integer$quorum_integer$quorum_integer(x: any, y: any, width: any, height: any): void;
  Screenshot$quorum_integer$quorum_integer$quorum_integer$quorum_integer$quorum_Libraries_Interface_Events_ScreenshotListener(x: any, y: any, width: any, height: any, callback: any): void;
  SelectApplicationType(): void;
  SelectApplicationTypeNative(): void;
  SetAccessibility$quorum_Libraries_Interface_Accessibility(accessibilityManager: any): void;
  SetAmbientLight$quorum_Libraries_Game_Graphics_AmbientLight(light: any): void;
  SetApplicationIcon$quorum_Libraries_System_File(file: any): void;
  SetCamera2D$quorum_Libraries_Game_Graphics_Camera(cam: any): void;
  SetCamera3D$quorum_Libraries_Game_Graphics_Camera(cam: any): void;
  SetChart$quorum_Libraries_Interface_Controls_Charts_Chart(chart: any): void;
  SetClipboard$quorum_text(value: any): void;
  SetColliding$quorum_boolean(collide: any): void;
  SetColorFilter$quorum_Libraries_Game_Graphics_Color(color: any): void;
  SetColorFilter$quorum_number$quorum_number$quorum_number$quorum_number(red: any, green: any, blue: any, alpha: any): void;
  SetConfiguration$quorum_Libraries_Game_AndroidConfiguration(config: any): void;
  SetConfiguration$quorum_Libraries_Game_DesktopConfiguration(config: any): void;
  SetConfiguration$quorum_Libraries_Game_WebConfiguration(config: any): void;
  SetCurrentLayer2D$quorum_Libraries_Game_Layer2D(layer: any): void;
  SetCurrentLayer3D$quorum_Libraries_Game_Layer3D(layer: any): void;
  SetDefaultInputTable$quorum_Libraries_Game_InputTable(table: any): void;
  SetEditManager$quorum_Libraries_Interface_Undo_EditManager(edits: any): void;
  SetExitOnStart$quorum_boolean(exitOnStart: any): void;
  SetFirstLetterNavigationTime$quorum_number(firstLetterNavigationTime: any): void;
  SetFocus$quorum_Libraries_Interface_Item(item: any): void;
  SetFocusManager$quorum_Libraries_Game_FocusManager(focus: any): void;
  SetFontManager$quorum_Libraries_Game_Graphics_Fonts_FontManager(fontManager: any): void;
  SetFullScreen$quorum_boolean(fullScreen: any): void;
  SetGameName$quorum_text(name: any): void;
  SetGravity2D$quorum_Libraries_Compute_Vector2(gravity: any): void;
  SetGravity2D$quorum_number$quorum_number(gravityX: any, gravityY: any): void;
  SetGravity3D$quorum_Libraries_Compute_Vector3(gravity: any): void;
  SetGravity3D$quorum_number$quorum_number$quorum_number(gravityX: any, gravityY: any, gravityZ: any): void;
  SetInterfaceOptions$quorum_Libraries_Interface_Options_InterfaceOptions(options: any): void;
  SetInterfaceScale$quorum_number(scale: any): void;
  SetLayer$quorum_integer$quorum_Libraries_Game_Layer(index: any, layer: any): void;
  SetLayout$quorum_Libraries_Interface_Layouts_Layout(layout: any): void;
  SetSceneManager$quorum_Libraries_Game_Scenes_SceneManager(scene: any): void;
  SetScreenResolution$quorum_Libraries_Game_ScreenResolution(resolution: any): void;
  SetScreenResolution$quorum_Libraries_Game_ScreenResolution$quorum_boolean(resolution: any, adjustCameras: any): void;
  SetScreenSize$quorum_integer$quorum_integer(width: any, height: any): void;
  SetScreenSize$quorum_integer$quorum_integer$quorum_boolean(width: any, height: any, adjustCameras: any): void;
  SetSimulationThreshold2D$quorum_number(threshold: any): void;
  SetSkybox(skybox: any): void;
  SetVSync(vSync: boolean): void;
  SetWebContainerID(id: string): void;
  SetWindowMaximized(maximized: boolean): void;
  SetWindowMinimized(minimized: boolean): void;
  Set_Libraries_Game_Game__ANDROID_APPLICATION_(value: any): void;
  Set_Libraries_Game_Game__DESKTOP_APPLICATION_(value: any): void;
  Set_Libraries_Game_Game__IOS_APPLICATION_(value: any): void;
  Set_Libraries_Game_Game__WEB_APPLICATION_(value: any): void;
  Set_Libraries_Game_Game__accessibility_(value: any): void;
  Set_Libraries_Game_Game__androidConfig_(value: any): void;
  Set_Libraries_Game_Game__applicationType_(value: any): void;
  Set_Libraries_Game_Game__collide_(value: any): void;
  Set_Libraries_Game_Game__currentLayer2D_(value: any): void;
  Set_Libraries_Game_Game__currentLayer3D_(value: any): void;
  Set_Libraries_Game_Game__desktopConfig_(value: any): void;
  Set_Libraries_Game_Game__dialogLayerPool_(value: any): void;
  Set_Libraries_Game_Game__editManager_(value: any): void;
  Set_Libraries_Game_Game__exitRequested_(value: any): void;
  Set_Libraries_Game_Game__firstLetterNavigationTime_(value: any): void;
  Set_Libraries_Game_Game__focusManager_(value: any): void;
  Set_Libraries_Game_Game__gameInput_(value: any): void;
  Set_Libraries_Game_Game__gl20_(value: any): void;
  Set_Libraries_Game_Game__interfaceOptions_(value: any): void;
  Set_Libraries_Game_Game__iosConfig_(value: any): void;
  Set_Libraries_Game_Game__layers_(value: any): void;
  Set_Libraries_Game_Game__manager_(value: any): void;
  Set_Libraries_Game_Game__pendingScreenshots_(value: any): void;
  Set_Libraries_Game_Game__sceneManager_(value: any): void;
  Set_Libraries_Game_Game__webConfig_(value: any): void;
  Set_Libraries_Interface_Controls_Charts_ChartDisplay__chart_(value: any): void;
  Set_Libraries_Interface_Controls_Charts_ChartDisplay__exitOnStart_(value: any): void;
  Set_Libraries_Interface_Controls_Charts_ChartDisplay__frame_(value: any): void;
  StartAndroidGame(): void;
  StartGame(): void;
  TestForCollisions(seconds: number): void;
  Update(seconds: number): void;
  UpdateAll(): void;
  UseDesktopResolution(adjustCameras?: boolean): void;
}

declare class QuorumError {
  Compare$quorum_Libraries_Language_Object(object: any): any;
  Equals$quorum_Libraries_Language_Object(object: any): any;
  GetErrorMessage(): string;
  GetHashCode(): any;
  GetStackTrace(): any;
  GetStackTraceMessage(): any;
  Get_Libraries_Language_Errors_Error__errorMessage_(): any;
  Get_Libraries_Language_Errors_Error__stackTrace_(): any;
  OutputStackTrace(): any;
  SetErrorMessage$quorum_text(message: string): void;
  SetStackTrace$quorum_Libraries_Containers_Array(trace: any): void;
  Set_Libraries_Language_Errors_Error__errorMessage_(value: any): void;
  Set_Libraries_Language_Errors_Error__stackTrace_(value: any): void;
  errorMessage: string;
}

declare class quorum_Libraries_Game_WebConfiguration_ {
  Compare$quorum_Libraries_Language_Object(object: any): any;
  Equals$quorum_Libraries_Language_Object(object: any): any;
  GetHashCode(): any;
  Get_Libraries_Game_ApplicationConfiguration__a_(): any;
  Get_Libraries_Game_ApplicationConfiguration__b_(): any;
  Get_Libraries_Game_ApplicationConfiguration__depth_(): any;
  Get_Libraries_Game_ApplicationConfiguration__g_(): any;
  Get_Libraries_Game_ApplicationConfiguration__r_(): any;
  Get_Libraries_Game_ApplicationConfiguration__samples_(): any;
  Get_Libraries_Game_ApplicationConfiguration__stencil_(): any;
  Get_Libraries_Game_WebConfiguration__capFramesPerSecond_(): any;
  Get_Libraries_Game_WebConfiguration__containerID_(): any;
  Get_Libraries_Game_WebConfiguration__disableContextMenu_(): any;
  Get_Libraries_Game_WebConfiguration__focusButtonName_(): any;
  Get_Libraries_Game_WebConfiguration__framesPerSecondLimit_(): any;
  Get_Libraries_Game_WebConfiguration__multipleClickTimer_(): any;
  Get_Libraries_Game_WebConfiguration__multipleKeyPressTimer_(): any;
  Get_Libraries_Game_WebConfiguration__title_(): any;
  Libraries_Game_ApplicationConfiguration__(): any;
  Set_Libraries_Game_ApplicationConfiguration__a_(value: any): any;
  Set_Libraries_Game_ApplicationConfiguration__b_(value: any): any;
  Set_Libraries_Game_ApplicationConfiguration__depth_(value: any): any;
  Set_Libraries_Game_ApplicationConfiguration__g_(value: any): any;
  Set_Libraries_Game_ApplicationConfiguration__r_(value: any): any;
  Set_Libraries_Game_ApplicationConfiguration__samples_(value: any): any;
  Set_Libraries_Game_ApplicationConfiguration__stencil_(value: any): any;
  Set_Libraries_Game_WebConfiguration__capFramesPerSecond_(value: any): any;
  Set_Libraries_Game_WebConfiguration__containerID_(value: any): any;
  Set_Libraries_Game_WebConfiguration__disableContextMenu_(value: any): any;
  Set_Libraries_Game_WebConfiguration__focusButtonName_(value: any): any;
  Set_Libraries_Game_WebConfiguration__framesPerSecondLimit_(value: any): any;
  Set_Libraries_Game_WebConfiguration__multipleClickTimer_(value: any): any;
  Set_Libraries_Game_WebConfiguration__multipleKeyPressTimer_(value: any): any;
  Set_Libraries_Game_WebConfiguration__title_(value: any): any;
  capFramesPerSecond: boolean;
  containerID: string;
  disableContextMenu: boolean;
  focusButtonName: any;
  framesPerSecondLimit: number;
  multipleClickTimer: number;
  multipleKeyPressTimer: number;
  myHash: number;
}

declare class quorum_Libraries_Interface_Controls_Charts_BarChart_ {
  SetLegendLabelFontSize$quorum_integer(size: number): any
  SetTitleFontSize$quorum_integer(size: number): any
  SetXAxisTitle$quorum_text(title: string): any
  SetYTickInterval$quorum_integer(interval: number): any
  SetYAxisTitle$quorum_text(title: string): any
  SetYAxisMaximum$quorum_number(max: number): any
  HideOutliers(): any
  LockRegressionYIntercept$quorum_number(arg0: number): any
  SetColorPaletteToCalm(): any
  SetColorPaletteToColorgorical(): any
  SetColorPaletteToCoolScale(): any
  SetColorPaletteToDisturbing(): any
  SetColorPaletteToExciting(): any
  SetColorPaletteToGrayScale(): any
  SetColorPaletteToMagma(): any
  SetColorPaletteToNegative(): any
  SetColorPaletteToPlayful(): any
  SetColorPaletteToPositive(): any
  SetColorPaletteToSerious(): any
  SetColorPaletteToTrustworthy(): any
  SetColorPaletteToWarmScale(): any
  SetHeight$quorum_number(Y: number): any
  SetLegendLocationToBottom(): void;
  SetLegendLocationToLeft(): void;
  SetLegendLocationToRight(): void;
  SetLegendLocationToTop(): void;
  ShowMovableRegressionLine$quorum_boolean(checked: boolean): any
  SetOrientationToHorizontal(): any
  SetOrientationToVertical(): any
  SetPercentageHeight$quorum_number(height: number): any;
  SetPercentageWidth$quorum_number(width: number): any;
  SetTitle$quorum_text(value: string | undefined): any
  SetWidth$quorum_number(X: number): any
  SetXLabelFontSize$quorum_integer(size: number): any;
  SetXTickInterval$quorum_integer(arg0: number): any
  ShowAnnotations$quorum_boolean(checked: boolean | undefined): any
  ShowLegend$quorum_boolean(show: boolean): any;
  ShowLinearRegression$quorum_boolean(checked: boolean): any
  ShowSquaresOfResiduals$quorum_boolean(checked: boolean): any
  constructor();
}
declare class quorum_Libraries_Interface_Controls_Charts_BoxPlot_ {
  HideOutliers(): any
  LockRegressionYIntercept$quorum_number(arg0: number): any
  SetColorPaletteToCalm(): any
  SetColorPaletteToColorgorical(): any
  SetColorPaletteToCoolScale(): any
  SetColorPaletteToDisturbing(): any
  SetColorPaletteToExciting(): any
  SetColorPaletteToGrayScale(): any
  SetColorPaletteToMagma(): any
  SetColorPaletteToNegative(): any
  SetColorPaletteToPlayful(): any
  SetColorPaletteToPositive(): any
  SetColorPaletteToSerious(): any
  SetColorPaletteToTrustworthy(): any
  SetColorPaletteToWarmScale(): any
  SetHeight$quorum_number(Y: number): any
  SetLegendLocationToBottom(): void;
  SetLegendLocationToLeft(): void;
  SetLegendLocationToRight(): void;
  SetLegendLocationToTop(): void;
  ShowMovableRegressionLine$quorum_boolean(checked: boolean): any
  SetOrientationToHorizontal(): any
  SetOrientationToVertical(): any
  SetPercentageHeight$quorum_number(height: number): any;
  SetPercentageWidth$quorum_number(width: number): any;
  SetTitle$quorum_text(value: string | undefined): any
  SetWidth$quorum_number(X: number): any
  SetXTickInterval$quorum_integer(arg0: number): any
  ShowAnnotations$quorum_boolean(checked: boolean | undefined): any
  ShowLegend$quorum_boolean(show: boolean): any;
  ShowLinearRegression$quorum_boolean(checked: boolean): any
  ShowSquaresOfResiduals$quorum_boolean(checked: boolean): any
  constructor();
}
declare class quorum_Libraries_Interface_Controls_Charts_Histogram_ {
  HideOutliers(): any
  LockRegressionYIntercept$quorum_number(arg0: number): any
  SetColorPaletteToCalm(): any
  SetColorPaletteToColorgorical(): any
  SetColorPaletteToCoolScale(): any
  SetColorPaletteToDisturbing(): any
  SetColorPaletteToExciting(): any
  SetColorPaletteToGrayScale(): any
  SetColorPaletteToMagma(): any
  SetColorPaletteToNegative(): any
  SetColorPaletteToPlayful(): any
  SetColorPaletteToPositive(): any
  SetColorPaletteToSerious(): any
  SetColorPaletteToTrustworthy(): any
  SetColorPaletteToWarmScale(): any
  SetHeight$quorum_number(Y: number): any
  SetLegendLocationToBottom(): void;
  SetLegendLocationToLeft(): void;
  SetLegendLocationToRight(): void;
  SetLegendLocationToTop(): void;
  ShowMovableRegressionLine$quorum_boolean(checked: boolean): any
  SetOrientationToHorizontal(): any
  SetOrientationToVertical(): any
  SetPercentageHeight$quorum_number(height: number): any;
  SetPercentageWidth$quorum_number(width: number): any;
  SetTitle$quorum_text(value: string | undefined): any
  SetWidth$quorum_number(X: number): any
  SetXTickInterval$quorum_integer(arg0: number): any
  ShowAnnotations$quorum_boolean(checked: boolean | undefined): any
  ShowLegend$quorum_boolean(show: boolean): any;
  ShowLinearRegression$quorum_boolean(checked: boolean): any
  ShowSquaresOfResiduals$quorum_boolean(checked: boolean): any
  constructor();
}
declare class quorum_Libraries_Interface_Controls_Charts_PieChart_ {
  HideOutliers(): any
  LockRegressionYIntercept$quorum_number(arg0: number): any
  SetColorPaletteToCalm(): any
  SetColorPaletteToColorgorical(): any
  SetColorPaletteToCoolScale(): any
  SetColorPaletteToDisturbing(): any
  SetColorPaletteToExciting(): any
  SetColorPaletteToGrayScale(): any
  SetColorPaletteToMagma(): any
  SetColorPaletteToNegative(): any
  SetColorPaletteToPlayful(): any
  SetColorPaletteToPositive(): any
  SetColorPaletteToSerious(): any
  SetColorPaletteToTrustworthy(): any
  SetColorPaletteToWarmScale(): any
  SetHeight$quorum_number(Y: number): any
  SetLegendLocationToBottom(): void;
  SetLegendLocationToLeft(): void;
  SetLegendLocationToRight(): void;
  SetLegendLocationToTop(): void;
  ShowMovableRegressionLine$quorum_boolean(checked: boolean): any
  SetOrientationToHorizontal(): any
  SetOrientationToVertical(): any
  SetPercentageHeight$quorum_number(height: number): any;
  SetPercentageWidth$quorum_number(width: number): any;
  SetTitle$quorum_text(value: string | undefined): any
  SetWidth$quorum_number(X: number): any
  SetXTickInterval$quorum_integer(arg0: number): any
  ShowAnnotations$quorum_boolean(checked: boolean | undefined): any
  ShowLegend$quorum_boolean(show: boolean): any;
  ShowLinearRegression$quorum_boolean(checked: boolean): any
  ShowSquaresOfResiduals$quorum_boolean(checked: boolean): any
  constructor();
}
declare class quorum_Libraries_Interface_Controls_Charts_ScatterPlot_ {
  HideOutliers(): any
  LockRegressionYIntercept$quorum_number(arg0: number): any
  SetColorPaletteToCalm(): any
  SetColorPaletteToColorgorical(): any
  SetColorPaletteToCoolScale(): any
  SetColorPaletteToDisturbing(): any
  SetColorPaletteToExciting(): any
  SetColorPaletteToGrayScale(): any
  SetColorPaletteToMagma(): any
  SetColorPaletteToNegative(): any
  SetColorPaletteToPlayful(): any
  SetColorPaletteToPositive(): any
  SetColorPaletteToSerious(): any
  SetColorPaletteToTrustworthy(): any
  SetColorPaletteToWarmScale(): any
  SetHeight$quorum_number(Y: number): any
  SetLegendLocationToBottom(): void;
  SetLegendLocationToLeft(): void;
  SetLegendLocationToRight(): void;
  SetLegendLocationToTop(): void;
  ShowMovableRegressionLine$quorum_boolean(checked: boolean): any
  SetOrientationToHorizontal(): any
  SetOrientationToVertical(): any
  SetPercentageHeight$quorum_number(height: number): any;
  SetPercentageWidth$quorum_number(width: number): any;
  SetTitle$quorum_text(value: string | undefined): any
  SetWidth$quorum_number(X: number): any
  SetXTickInterval$quorum_integer(arg0: number): any
  ShowAnnotations$quorum_boolean(checked: boolean | undefined): any
  ShowLegend$quorum_boolean(show: boolean): any;
  ShowLinearRegression$quorum_boolean(checked: boolean): any
  ShowSquaresOfResiduals$quorum_boolean(checked: boolean): any
  constructor();
}

declare class plugins_quorum_Libraries_Sound_Audio_ {
  static StopAllSources: any;
}
/**
 * Globals empty shared classes
 */
declare function global_Empty_Shared_Classes(): any;

declare class quorum_Libraries_Web_Page_WebTable_ {
  Add$quorum_Libraries_Compute_Matrix(): any;
  Add$quorum_Libraries_Web_Page_Attribute(): any;
  Add$quorum_Libraries_Web_Page_ColumnGroup(): any;
  Add$quorum_Libraries_Web_Page_TableBody(): any;
  Add$quorum_Libraries_Web_Page_TableCaption(): any;
  Add$quorum_Libraries_Web_Page_TableFooter(): any;
  Add$quorum_Libraries_Web_Page_TableHeader(): any;
  Add$quorum_Libraries_Web_Page_TableRow(): any;
  AddAttribute$quorum_text$quorum_text(text: string): any;
  AddClassAttribute$quorum_text(text: string): any;
  AddNestedTag$quorum_Libraries_Web_Page_WebTag(): any;
  AddText$quorum_text(text: string): any;
  Compare$quorum_Libraries_Language_Object(): any;
  Equals$quorum_Libraries_Language_Object(): any;
  Generate(): any;
  GenerateAttributes(): any;
  GenerateNestedTags(): any;
  GetAccessKey(): any;
  GetAttribute$quorum_text(text: string): any;
  GetAttributeValue$quorum_text(text: string): any;
  GetAttributes(): any;
  GetBorder(): any;
  GetClassAttribute(): any;
  GetContentEditable(): any;
  GetContextMenu(): any;
  GetDraggable(): any;
  GetDropZone(): any;
  GetHashCode(): any;
  GetHidden(): any;
  GetIdentifier(): any;
  GetIterator(): any;
  GetLanguage(): any;
  GetNumberOfAttributes(): any;
  GetNumberOfNestedTags(): any;
  GetSpellcheck(): any;
  GetStyle(): any;
  GetTabIndex(): any;
  GetTag$quorum_integer(): any;
  GetTextDirection(): any;
  GetTitle(): any;
  Get_Libraries_Web_Page_AttributeAccepter__attributes_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__accessKey_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__classAttribute_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__contentEditable_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__contextMenu_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__draggable_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__dropZone_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__hidden_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__identifier_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__language_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__spellcheck_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__style_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__tabIndex_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__textDirection_(): any;
  Get_Libraries_Web_Page_GlobalAttributeAccepter__title_(): any;
  Get_Libraries_Web_Page_WebTable__border_(): any;
  Get_Libraries_Web_Page_WebTag__tags_(): any;
  HasAttribute$quorum_text(text: string): any;
  Libraries_Language_Object__(): any;
  Libraries_Web_Page_AttributeAccepter__(): any;
  Libraries_Web_Page_GlobalAttributeAccepter__(): any;
  Libraries_Web_Page_WebTag__(): any;
  Remove$quorum_Libraries_Web_Page_WebTag(): any;
  RemoveAttribute$quorum_text(text: string): any;
  SetAccessKey$quorum_text(text: string): any;
  SetBorder$quorum_boolean(bool: boolean): any;
  SetClassAttribute$quorum_text(text: string): any;
  SetContentEditable$quorum_text(text: string): any;
  SetContextMenu$quorum_text(text: string): any;
  SetDraggable$quorum_boolean(bool: boolean): any;
  SetDropZone$quorum_text(text: string): any;
  SetHidden$quorum_boolean(bool: boolean): any;
  SetIdentifier$quorum_text(text: string): any;
  SetLanguage$quorum_text(text: string): any;
  SetSpellcheck$quorum_boolean(bool: boolean): any;
  SetStyle$quorum_text(text: string): any;
  SetTabIndex$quorum_text(text: string): any;
  SetTextDirection$quorum_text(text: string): any;
  SetTitle$quorum_text(text: string): any;
  Set_Libraries_Web_Page_AttributeAccepter__attributes_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__accessKey_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__classAttribute_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__contentEditable_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__contextMenu_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__draggable_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__dropZone_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__hidden_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__identifier_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__language_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__spellcheck_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__style_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__tabIndex_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__textDirection_(): any;
  Set_Libraries_Web_Page_GlobalAttributeAccepter__title_(): any;
  Set_Libraries_Web_Page_WebTable__border_(): any;
  Set_Libraries_Web_Page_WebTag__tags_(): any;
}

declare class quorum_Libraries_Compute_Matrix_ {
  Add$quorum_number(number: number): any;
  AddElements$quorum_Libraries_Compute_Matrix(): any;
  Calculate$quorum_Libraries_Compute_MatrixTransform_MatrixCalculation(): any;
  CheckReference$quorum_integer$quorum_integer(integer: number): any;
  CheckSameDimensions$quorum_Libraries_Compute_Matrix(): any;
  Compare$quorum_Libraries_Language_Object(): any;
  Copy(): any;
  Divide$quorum_number(number: number): any;
  DivideElements$quorum_Libraries_Compute_Matrix(): any;
  Equals$quorum_Libraries_Language_Object(): any;
  Fill$quorum_integer$quorum_integer$quorum_number(number: number): any;
  Fill$quorum_number(number: number): any;
  FillByColumn$quorum_integer$quorum_Libraries_Compute_Matrix(): any;
  FillByColumn$quorum_integer$quorum_Libraries_Containers_Array(): any;
  FillByRow$quorum_integer$quorum_Libraries_Compute_Matrix(): any;
  FillByRow$quorum_integer$quorum_Libraries_Containers_Array(): any;
  FlipHorizontal(): any;
  FlipVertical(): any;
  Get$quorum_integer$quorum_integer(integer: number): any;
  GetColumn$quorum_integer(integer: number): any;
  GetColumnArray$quorum_integer(integer: number): any;
  GetColumnMajorArray(): any;
  GetColumns(): any;
  GetHashCode(): any;
  GetMaximum(): any;
  GetMean(): any;
  GetMedian(): any;
  GetMinimum(): any;
  GetModes(): any;
  GetModesAsText(): any;
  GetPercentile$quorum_number(number: number): any;
  GetRow$quorum_integer(integer: number): any;
  GetRowArray$quorum_integer(integer: number): any;
  GetRowMajorArray(): any;
  GetRows(): any;
  GetSize(): any;
  GetStandardDeviation(): any;
  GetSubMatrix$quorum_integer$quorum_integer$quorum_integer$quorum_integer(integer: number): any;
  GetTotal(): any;
  GetVariance(): any;
  Get_Libraries_Compute_Matrix__math_(): any;
  Get_Libraries_Compute_Matrix__table_(): any;
  Identity(): any;
  Libraries_Language_Object__(): any;
  Multiply$quorum_Libraries_Compute_Matrix(): any;
  Multiply$quorum_Libraries_Compute_Vector(): any;
  Multiply$quorum_number(number: number): any;
  MultiplyElements$quorum_Libraries_Compute_Matrix(): any;
  Reshape$quorum_integer$quorum_integer$quorum_integer$quorum_integer$quorum_number(number: number): any;
  RotateLeft(): any;
  RotateRight(): any;
  Set$quorum_integer$quorum_integer$quorum_number(number: number): any;
  SetColumn$quorum_integer$quorum_Libraries_Compute_Matrix(): any;
  SetColumn$quorum_integer$quorum_Libraries_Containers_Array(): any;
  SetColumn$quorum_integer$quorum_number(number: number): any;
  SetLowerThreshold$quorum_number$quorum_number(number: number): any;
  SetRow$quorum_integer$quorum_Libraries_Compute_Matrix(): any;
  SetRow$quorum_integer$quorum_Libraries_Containers_Array(): any;
  SetRow$quorum_integer$quorum_number(number: number): any;
  SetSize$quorum_Libraries_Compute_Matrix(): any;
  SetSize$quorum_integer$quorum_integer(integer: number): any;
  SetUpperThreshold$quorum_number$quorum_number(number: number): any;
  Set_Libraries_Compute_Matrix__math_(): any;
  Set_Libraries_Compute_Matrix__table_(): any;
  Shift$quorum_integer$quorum_integer$quorum_number(number: number): any;
  Subtract$quorum_number(number: number): any;
  SubtractElements$quorum_Libraries_Compute_Matrix(): any;
  ToText(): any;
  Transform$quorum_Libraries_Compute_MatrixTransform_MatrixTransform(): any;
  Transpose(): any;
  math(): any;
  parentNames_(): any;
  prototype(): any;
  table(): any;
}

declare class quorum_Libraries_Containers_Array_ {
  Add$quorum_Libraries_Language_Object(value: any): any;
  Add$quorum_integer$quorum_Libraries_Language_Object(num: number, value: any): any;
  AddNative$quorum_Libraries_Language_Object(value: any): any;
  AddNative$quorum_integer$quorum_Libraries_Language_Object(num: number, value: any): any;
  AddToEnd$quorum_Libraries_Language_Object(value: any): any;
  AddToFront$quorum_Libraries_Language_Object(value: any): any;
  ClearContents$quorum_integer$quorum_integer(integer: number): any;
  Compare$quorum_Libraries_Language_Object(): any;
  Copy(): any;
  CopyToArray(): any;
  Empty$quorum_boolean(): any;
  Empty(): any;
  Equals$quorum_Libraries_Language_Object(): any;
  Get$quorum_integer(integer: number): any;
  GetAutoResize(): any;
  GetFirstLocation$quorum_Libraries_Language_Object(): any;
  GetFromEnd(): any;
  GetFromFront(): any;
  GetHashCode(): any;
  GetIterator(): any;
  GetLastLocation$quorum_Libraries_Language_Object(): any;
  GetMaxSize(): any;
  GetNative$quorum_integer(integer: number): quorum_Libraries_Language_Types_Text_;
  GetSize(): number;
  Has$quorum_Libraries_Language_Object(): any;
  IsEmpty(): any;
  Libraries_Language_Object__(): any;
  Merge$quorum_Libraries_Containers_Array$quorum_Libraries_Containers_Array$quorum_integer$quorum_integer$quorum_integer$quorum_Libraries_Containers_Support_Comparison(): any;
  Merge$quorum_Libraries_Containers_Array$quorum_Libraries_Containers_Array$quorum_integer$quorum_integer$quorum_integer(integer: number): any;
  MergeSort$quorum_Libraries_Containers_Array$quorum_Libraries_Containers_Array$quorum_integer$quorum_integer$quorum_Libraries_Containers_Support_Comparison(): any;
  MergeSort$quorum_Libraries_Containers_Array$quorum_Libraries_Containers_Array$quorum_integer$quorum_integer(integer: number): any;
  Remove$quorum_Libraries_Language_Object(): any;
  RemoveAll$quorum_Libraries_Language_Object(): any;
  RemoveAt$quorum_integer(integer: number): any;
  RemoveAtNative$quorum_integer(integer: number): any;
  RemoveFromEnd(): any;
  RemoveFromFront(): any;
  Set$quorum_integer$quorum_Libraries_Language_Object(): any;
  SetAutoResize$quorum_boolean(): any;
  SetMaxSize$quorum_integer(integer: number): any;
  SetNative$quorum_integer$quorum_Libraries_Language_Object(): any;
  SetSize$quorum_integer(integer: number): any;
  SetSizeNative$quorum_integer(integer: number): any;
  SetSizeNoFillNative$quorum_integer(integer: number): any;
  Shuffle$quorum_integer$quorum_integer$quorum_boolean$quorum_number(): any;
  Shuffle$quorum_integer$quorum_integer$quorum_number(): any;
  Shuffle$quorum_integer$quorum_integer(integer: number): any;
  Shuffle$quorum_number(): any;
  Shuffle(): any;
  Sort$quorum_Libraries_Containers_Support_Comparison$quorum_Libraries_Containers_Array(): any;
  Sort$quorum_Libraries_Containers_Support_Comparison(): any;
  Sort(): any;
}

declare class quorum_LabelSort_ {
  Compare$quorum_Libraries_Language_Object(): any;
  Compare$quorum_Libraries_Language_Object$quorum_Libraries_Language_Object(): any;
  Equals$quorum_Libraries_Language_Object(): any;
  GetHashCode(): any;
  GetLabels(): any;
  Get_LabelSort__index_(): any;
  Get_LabelSort__labels_(): any;
  Get_Libraries_Containers_Support_Comparison__EQUAL_(): any;
  Get_Libraries_Containers_Support_Comparison__LARGER_(): any;
  Get_Libraries_Containers_Support_Comparison__SMALLER_(): any;
  Libraries_Containers_Support_Comparison__(): any;
  Libraries_Language_Object__(): any;
  SetLabels$quorum_Libraries_Containers_Array(array: quorum_Libraries_Containers_Array_): any;
  Set_LabelSort__index_(): any;
  Set_LabelSort__labels_(): any;
  Set_Libraries_Containers_Support_Comparison__EQUAL_(): any;
  Set_Libraries_Containers_Support_Comparison__LARGER_(): any;
  Set_Libraries_Containers_Support_Comparison__SMALLER_(): any;
  index(): any;
  constructor();
}

declare class quorum_Libraries_Compute_Statistics_DataFrameColumn_ {
  Add$quorum_text(): any;
  AddAsResult$quorum_Libraries_Language_Compile_Interpreter_Result(): any;
  Calculate$quorum_Libraries_Compute_Statistics_DataFrameColumnCalculation(): any;
  CalculateValueCountAsText(): any;
  CanConvertToVector(): any;
  Compare$quorum_Libraries_Language_Object(): any;
  Compare$quorum_Libraries_Language_Object$quorum_Libraries_Language_Object(): any;
  ConvertColumn$quorum_Libraries_Compute_Statistics_DataFrameColumn(): any;
  ConvertToBooleanColumn(): any;
  ConvertToIntegerColumn(): any;
  ConvertToNumberColumn(): any;
  ConvertToTextColumn(): any;
  ConvertToVector(): any;
  Copy(): any;
  Copy$quorum_boolean$quorum_boolean(): any;
  Copy$quorum_integer$quorum_integer(): any;
  Copy$quorum_integer$quorum_integer$quorum_boolean$quorum_boolean(): any;
  CopyEmpty(): any;
  CopyToRow$quorum_Libraries_Compute_Statistics_DataFrameColumn$quorum_integer$quorum_integer(): any;
  Equals$quorum_Libraries_Language_Object(): any;
  GetAsBoolean$quorum_integer(): any;
  GetAsDateTime$quorum_integer(): any;
  GetAsInteger$quorum_integer(): any;
  GetAsNumber$quorum_integer(): any;
  GetAsText$quorum_integer(): any;
  GetHashCode(): any;
  GetHeader(): string;
  GetSize(): number;
  GetSortComparison(): any;
  GetUndefinedSize(): any;
  GetUndefinedText(): any;
  Get_Libraries_Compute_Statistics_DataFrameColumn__comparison_(): any;
  Get_Libraries_Compute_Statistics_DataFrameColumn__header_(): any;
  Get_Libraries_Compute_Statistics_DataFrameColumn__undefinedSize_(): any;
  Get_Libraries_Containers_Support_Comparison__EQUAL_(): any;
  Get_Libraries_Containers_Support_Comparison__LARGER_(): any;
  Get_Libraries_Containers_Support_Comparison__SMALLER_(): any;
  IsBooleanColumn(): boolean;
  IsDateTimeColumn(): boolean;
  IsIntegerColumn(): boolean;
  IsNumberColumn(): boolean;
  IsResultCheckable$quorum_Libraries_Language_Compile_Interpreter_Result(): boolean;
  IsTextColumn(): boolean;
  IsUndefined(): boolean;
  IsUndefined$quorum_integer(): boolean;
  Libraries_Containers_Support_Comparison__(): any;
  Libraries_Language_Object__(): any;
  Move$quorum_integer$quorum_integer(): any;
  ReplaceUndefined$quorum_text(): any;
  SendValueTo$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumnCalculation(): any;
  SetAsBoolean$quorum_integer$quorum_boolean(): any;
  SetAsInteger$quorum_integer$quorum_integer(): any;
  SetAsNumber$quorum_integer$quorum_number(): any;
  SetAsResult$quorum_integer$quorum_Libraries_Language_Compile_Interpreter_Result(): any;
  SetAsText$quorum_integer$quorum_text(): any;
  SetHeader$quorum_text(): any;
  SetSize$quorum_integer(): any;
  SetSortComparison$quorum_Libraries_Containers_Support_Comparison(sort: quorum_LabelSort_): any;
  Set_Libraries_Compute_Statistics_DataFrameColumn__comparison_(): any;
  Set_Libraries_Compute_Statistics_DataFrameColumn__header_(): any;
  Set_Libraries_Compute_Statistics_DataFrameColumn__undefinedSize_(): any;
  Set_Libraries_Containers_Support_Comparison__EQUAL_(): any;
  Set_Libraries_Containers_Support_Comparison__LARGER_(): any;
  Set_Libraries_Containers_Support_Comparison__SMALLER_(): any;
  SplitByRows$quorum_Libraries_Containers_Array(): any;
  Swap$quorum_integer$quorum_integer(): any;
  ToText(): any;
  comparison(): any;
  header(): any;
}

declare class quorum_Libraries_Language_Types_Text_ {
  Compare$quorum_Libraries_Language_Object(object: any): number;
  CompareIgnoringCase$quorum_Libraries_Language_Object(object: any): number;
  CompareInt$quorum_text$quorum_text$quorum_boolean(left: Text, right: Text, isIgnoringCase: boolean): number;
  Contains$quorum_text(val: Text): boolean;
  ContainsNative$quorum_text$quorum_text(lhv: Text, rhv: Text): boolean;
  EndsWith$quorum_text(suffix: Text): boolean;
  EndsWithNative$quorum_text$quorum_text(left: Text, suffix: Text): boolean;
  Equals$quorum_Libraries_Language_Object(object: any): boolean;
  EqualsIgnoringCase$quorum_Libraries_Language_Object(object: any): boolean;
  EqualsIgnoringCaseNative$quorum_text$quorum_text(left: Text, right: Text): boolean;
  GetCarriageReturn(): Text;
  GetCharacter$quorum_integer(index: number): Text;
  GetCharacterNative$quorum_integer(index: number): Text;
  GetDoubleQuote(): Text;
  GetHashCode(): number;
  GetLineFeed(): Text;
  GetSize(): number;
  GetSubstringNative$quorum_integer$quorum_integer(startIndex: number, endIndex: number): Text;
  GetSubtext$quorum_integer(startIndex: number): Text;
  GetSubtext$quorum_integer$quorum_integer(startIndex: number, endIndex: number): Text;
  GetSubtextNative$quorum_text$quorum_integer(left: Text, start: number): Text;
  GetTab(): Text;
  GetUnicodeInteger$quorum_integer(index: number): number;
  GetUnicodeValue$quorum_integer(twosCompliment: number): number;
  GetValue(): string;
  Get_Libraries_Language_Types_Text__value_(): string;
  IndexOf$quorum_text(subText: Text): number;
  IndexOf$quorum_text$quorum_integer(subText: Text, index: number): number;
  IndexOfNative$quorum_text$quorum_text(left: Text, prefix: Text): number;
  IndexOfNative$quorum_text$quorum_text$quorum_integer(left: Text, prefix: Text, index: number): number;
  IsEmpty(): boolean;
  IsEmptyNative$quorum_text(left: Text): boolean;
  ParseBoolean(): boolean;
  ParseInteger(): number;
  ParseNumber(): number;
  Replace$quorum_text$quorum_text(old: Text, replacement: Text): Text;
  ReplaceNative$quorum_text$quorum_text$quorum_text(left: Text, old: Text, replacement: Text): Text;
  SetValue$quorum_text(i: Text): void;
  SetValueNative$quorum_text(value: Text): void;
  Set_Libraries_Language_Types_Text__value_(value: string): void;
  Split$quorum_text(delimiter: Text): Text[];
  Split$quorum_text$quorum_boolean(delimiter: Text, include: boolean): Text[];
  SplitIntoLines(): Text[];
  StartsWith$quorum_text(prefix: Text): boolean;
  StartsWithNative$quorum_text$quorum_text(left: Text, prefix: Text): boolean;
  ToLowerCase(): Text;
  ToUpperCase(): Text;
  Trim(): Text;
  TrimNative$quorum_text(left: Text): Text;
}


declare class quorum_Libraries_Compute_Statistics_Columns_NumberColumn_ {
  Add$quorum_number(value: number): void;
  Add$quorum_text(value: string): void;
  AddAsResult$quorum_Libraries_Language_Compile_Interpreter_Result(value: any): void;
  Calculate$quorum_Libraries_Compute_Statistics_DataFrameColumnCalculation(calculation: any): void;
  CalculateValueCount(): void;
  CalculateValueCount$quorum_Libraries_Containers_Array(values: quorum_Libraries_Containers_Array_): void;
  CalculateValueCountAsText(): void;
  CanConvertToVector(): void;
  Compare$quorum_Libraries_Language_Object(object: any): void;
  Compare$quorum_Libraries_Language_Object$quorum_Libraries_Language_Object(a: any, b: any): void;
  Compare$quorum_boolean$quorum_boolean(a: boolean, b: boolean): void;
  Compare$quorum_integer$quorum_integer(a: number, b: number): void;
  Compare$quorum_number$quorum_number(a: number, b: number): void;
  ConvertColumn$quorum_Libraries_Compute_Statistics_DataFrameColumn(column: any): void;
  ConvertToBooleanColumn(): void;
  ConvertToIntegerColumn(): void;
  ConvertToNumberColumn(): void;
  ConvertToTextColumn(): quorum_Libraries_Compute_Statistics_Columns_TextColumn_;
  ConvertToVector(): void;
  Copy(): void;
  Copy$quorum_boolean$quorum_boolean(sort: boolean, unique: boolean): void;
  Copy$quorum_integer$quorum_integer(rowStart: number, rowEnd: number): void;
  Copy$quorum_integer$quorum_integer$quorum_boolean$quorum_boolean(rowStart: number, rowEnd: number, sort: boolean, unique: boolean): void;
  CopyEmpty(): void;
  CopyToRow$quorum_Libraries_Compute_Statistics_DataFrameColumn$quorum_integer$quorum_integer(column: any, to: number, from: number): void;
  Equals$quorum_Libraries_Language_Object(object: any): void;
  Get$quorum_integer(row: number): void;
  GetAsBoolean$quorum_integer(index: number): void;
  GetAsDateTime$quorum_integer(index: number): void;
  GetAsInteger$quorum_integer(index: number): void;
  GetAsNumber$quorum_integer(index: number): void;
  GetAsText$quorum_integer(index: number): void;
  GetHashCode(): void;
  GetHeader(): string;
  GetSize(): number;
  GetSortComparison(): void;
  GetUndefinedSize(): void;
  GetUndefinedText(): void;
  GetUnique(): void;
  GetUnique$quorum_Libraries_Containers_Array(array: any[]): void;
  Get_Libraries_Compute_Statistics_Columns_NumberColumn__rows_(): void;
  Get_Libraries_Compute_Statistics_DataFrameColumn__comparison_(): void;
  Get_Libraries_Compute_Statistics_DataFrameColumn__header_(): void;
  Get_Libraries_Compute_Statistics_DataFrameColumn__undefinedSize_(): void;
  Get_Libraries_Containers_Support_Comparison__EQUAL_(): void;
  Get_Libraries_Containers_Support_Comparison__LARGER_(): void;
  Get_Libraries_Containers_Support_Comparison__SMALLER_(): void;
  IsBooleanColumn(): boolean;
  IsDateTimeColumn(): boolean;
  IsIntegerColumn(): boolean;
  IsNumberColumn(): boolean;
  IsResultCheckable$quorum_Libraries_Language_Compile_Interpreter_Result(value: any): void;
  IsTextColumn(): boolean;
  IsUndefined(): boolean;
  IsUndefined$quorum_integer(row: number): void;
  Move$quorum_integer$quorum_integer(left: number, right: number): void;
  ReplaceUndefined$quorum_text(value: string): void;
  SendValueTo$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumnCalculation(index: number, calculation: any): void;
  SetAsBoolean$quorum_integer$quorum_boolean(index: number, value: boolean): void;
  SetAsInteger$quorum_integer$quorum_integer(index: number, value: number): void;
  SetAsNumber$quorum_integer$quorum_Libraries_Language_Types_Number(index: number, value: any): void;
  SetAsNumber$quorum_integer$quorum_number(index: number, value: number): void;
  SetAsResult$quorum_integer$quorum_Libraries_Language_Compile_Interpreter_Result(index: number, value: any): void;
  SetAsText$quorum_integer$quorum_text(index: number, value: string): void;
  SetHeader$quorum_text(header: string): void;
  SetSize$quorum_integer(size: number): void;
  SetSortComparison$quorum_Libraries_Containers_Support_Comparison(comparison: any): void;
  Set_Libraries_Compute_Statistics_Columns_NumberColumn__rows(value: any): void;
  Set_Libraries_Compute_Statistics_DataFrameColumn__comparison_(value: any): void;
  Set_Libraries_Compute_Statistics_DataFrameColumn__header_(value: any): void;
  Set_Libraries_Compute_Statistics_DataFrameColumn__undefinedSize_(value: any): void;
  Set_Libraries_Containers_Support_Comparison__EQUAL_(value: any): void;
  Set_Libraries_Containers_Support_Comparison__LARGER_(value: any): void;
  Set_Libraries_Containers_Support_Comparison__SMALLER_(value: any): void;
  SplitByRows$quorum_Libraries_Containers_Array(sortedArray: any[]): void;
  Subtract$quorum_Libraries_Compute_Statistics_Columns_NumberColumn(column: any): void;
  Swap$quorum_integer$quorum_integer(left: number, right: number): void;
  ToText(): void;
}

declare class quorum_Libraries_Compute_Statistics_Columns_TextColumn_ {
  Add$quorum_text(value: string): void;
  AddAsResult$quorum_Libraries_Language_Compile_Interpreter_Result(value: any): void;
  Calculate$quorum_Libraries_Compute_Statistics_DataFrameColumnCalculation(calculation: any): void;
  CalculateValueCount(): void;
  CalculateValueCount$quorum_Libraries_Containers_Array(values: any[]): void;
  CalculateValueCountAsText(): void;
  CanConvertToVector(): void;
  Compare$quorum_Libraries_Language_Object(object: any): void;
  Compare$quorum_Libraries_Language_Object$quorum_Libraries_Language_Object(a: any, b: any): void;
  Compare$quorum_boolean$quorum_boolean(a: boolean, b: boolean): void;
  Compare$quorum_integer$quorum_integer(a: number, b: number): void;
  Compare$quorum_number$quorum_number(a: number, b: number): void;
  ConvertColumn$quorum_Libraries_Compute_Statistics_DataFrameColumn(column: any): void;
  ConvertToBooleanColumn(): void;
  ConvertToIntegerColumn(): void;
  ConvertToNumberColumn(): quorum_Libraries_Compute_Statistics_Columns_NumberColumn_;
  ConvertToTextColumn(): quorum_Libraries_Compute_Statistics_Columns_TextColumn_;
  ConvertToVector(): void;
  Copy(): void;
  Copy$quorum_boolean$quorum_boolean(sort: boolean, unique: boolean): void;
  Copy$quorum_integer$quorum_integer(rowStart: number, rowEnd: number): void;
  Copy$quorum_integer$quorum_integer$quorum_boolean$quorum_boolean(rowStart: number, rowEnd: number, sort: boolean, unique: boolean): void;
  CopyEmpty(): void;
  CopyToColumns$quorum_boolean$quorum_boolean(sort: boolean, unique: boolean): void;
  CopyToRow$quorum_Libraries_Compute_Statistics_DataFrameColumn$quorum_integer$quorum_integer(column: any, to: number, from: number): void;
  Equals$quorum_Libraries_Language_Object(object: any): void;
  Get$quorum_integer(row: number): void;
  GetAsBoolean$quorum_integer(index: number): void;
  GetAsDateTime$quorum_integer(index: number): void;
  GetAsInteger$quorum_integer(index: number): void;
  GetAsNumber$quorum_integer(index: number): void;
  GetAsText$quorum_integer(index: number): void;
  GetHashCode(): void;
  GetHeader(): string;
  GetSize(): number;
  GetSortComparison(): void;
  GetUndefinedSize(): void;
  GetUndefinedText(): void;
  GetUnique(): void;
  GetUnique$quorum_Libraries_Containers_Array(array: any[]): void;
  Get_Libraries_Compute_Statistics_Columns_TextColumn__rows_(): void;
  Get_Libraries_Compute_Statistics_DataFrameColumn__comparison_(): void;
  Get_Libraries_Compute_Statistics_DataFrameColumn__header_(): void;
  Get_Libraries_Compute_Statistics_DataFrameColumn__undefinedSize_(): void;
  Get_Libraries_Containers_Support_Comparison__EQUAL_(): void;
  Get_Libraries_Containers_Support_Comparison__LARGER_(): void;
  Get_Libraries_Containers_Support_Comparison__SMALLER_(): void;
  IsBooleanColumn(): boolean;
  IsDateTimeColumn(): boolean;
  IsIntegerColumn(): boolean;
  IsNumberColumn(): boolean;
  IsResultCheckable$quorum_Libraries_Language_Compile_Interpreter_Result(value: any): void;
  IsTextColumn(): boolean;
  IsUndefined(): boolean;
  IsUndefined$quorum_integer(row: number): void;
  Move$quorum_integer$quorum_integer(left: number, right: number): void;
  ReplaceUndefined$quorum_text(value: string): void;
  SendValueTo$quorum_integer$quorum_Libraries_Compute_Statistics_DataFrameColumnCalculation(index: number, calculation: any): void;
  SetAsBoolean$quorum_integer$quorum_boolean(index: number, value: boolean): void;
  SetAsInteger$quorum_integer$quorum_integer(index: number, value: number): void;
  SetAsNumber$quorum_integer$quorum_number(index: number, value: number): void;
  SetAsText$quorum_integer$quorum_Libraries_Language_Types_Text(index: number, value: any): void;
  SetAsText$quorum_integer$quorum_text(index: number, value: string): void;
  SetHeader$quorum_text(header: string): void;
  SetSize$quorum_integer(size: number): void;
  SetSortComparison$quorum_Libraries_Containers_Support_Comparison(comparison: any): void;
  Set_Libraries_Compute_Statistics_Columns_TextColumn__rows_(value: any): void;
  Set_Libraries_Compute_Statistics_DataFrameColumn__comparison_(value: any): void;
  Set_Libraries_Compute_Statistics_DataFrameColumn__header_(value: any): void;
  Set_Libraries_Compute_Statistics_DataFrameColumn__undefinedSize_(value: any): void;
  Set_Libraries_Containers_Support_Comparison__EQUAL_(value: any): void;
  Set_Libraries_Containers_Support_Comparison__LARGER_(value: any): void;
  Set_Libraries_Containers_Support_Comparison__SMALLER_(value: any): void;
  SplitByRows$quorum_Libraries_Containers_Array(sortedArray: any[]): void;
  Swap$quorum_integer$quorum_integer(left: number, right: number): void;
  ToText(): void;
}


declare class quorum_Libraries_Interface_Events_ScreenshotListener_ {
  Compare$quorum_Libraries_Language_Object(object: any): void;
  Equals$quorum_Libraries_Language_Object(object: any): void;
  GetHashCode(): void;
  OnScreenshot$quorum_Libraries_Interface_Events_ScreenshotEvent(event: any): void;
}

declare class quorum_Libraries_Interface_Events_ScreenshotEvent_ {
  Compare$quorum_Libraries_Language_Object(object: any): void;
  Equals$quorum_Libraries_Language_Object(object: any): void;
  GetHashCode(): void;
  GetHeight(): void;
  GetScreenshot(): void;
  GetWidth(): void;
  GetX(): void;
  GetY(): void;
  Get_Libraries_Interface_Events_ScreenshotEvent__height_(): void;
  Get_Libraries_Interface_Events_ScreenshotEvent__screenshot_(): void;
  Get_Libraries_Interface_Events_ScreenshotEvent__width_(): void;
  Get_Libraries_Interface_Events_ScreenshotEvent__x_(): void;
  Get_Libraries_Interface_Events_ScreenshotEvent__y_(): void;
  SetDimensions$quorum_integer$quorum_integer$quorum_integer$quorum_integer(x: any, y: any, width: any, height: any): void;
  SetScreenshot$quorum_Libraries_Game_Graphics_PixelMap(screenshot: any): void;
  Set_Libraries_Interface_Events_ScreenshotEvent__height_(value: any): void;
  Set_Libraries_Interface_Events_ScreenshotEvent__screenshot_(value: any): void;
  Set_Libraries_Interface_Events_ScreenshotEvent__width_(value: any): void;
  Set_Libraries_Interface_Events_ScreenshotEvent__x_(value: any): void;
  Set_Libraries_Interface_Events_ScreenshotEvent__y_(value: any): void;
}
// export everything in this file
