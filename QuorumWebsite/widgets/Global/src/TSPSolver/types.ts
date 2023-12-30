import { Algorithms } from "./Settings";

export type NewLevelButtonClickEventDetail = { buttonId: string };
export type ResetButtonClickEventDetail = { buttonId: string };
export type AlgorithmChangeEventDetail = { dropdownId: string, value: Algorithms };
export type CityAmountChangeEventDetail = { dropdownId: string, value: number };

export type NewLevelButtonClickEvent = CustomEvent<NewLevelButtonClickEventDetail>;
export type ResetButtonClickEvent = CustomEvent<ResetButtonClickEventDetail>;
export type AlgorithmChangeEvent = CustomEvent<AlgorithmChangeEventDetail>;
export type CityAmountChangeEvent = CustomEvent<CityAmountChangeEventDetail>;

