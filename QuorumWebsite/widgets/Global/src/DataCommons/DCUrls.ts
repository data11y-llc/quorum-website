import { MSDE_BASE_URL } from "../util/versionNumbers";

const DC_BASE_URL = `${MSDE_BASE_URL}/datacommons`;


//add the data commons routes
export const DC_API_VAR_GROUP_INFO = `${DC_BASE_URL}/VariableGroupInfo.quorum`;

export const DC_OBSERVATIONS_SERIES_ALL = `${DC_BASE_URL}/ObservationsSeriesAll.quorum`;

export const DC_STATS_VAR_SEARCH = `${DC_BASE_URL}/StatsVarSearch.quorum`;

export const DC_VARIABLE_PATH = `${DC_BASE_URL}/VariablePath.quorum`;

export const DC_BULK_OBSERVATIONS_SERIES = `${DC_BASE_URL}/BulkObservationsSeries.quorum`;

