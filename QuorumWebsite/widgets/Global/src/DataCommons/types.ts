/**
 * Represents an individual data point in a series.
 * @typedef {Object} SeriesItem
 * @property {string} date - The date for this data point, formatted as a string.
 * @property {number} value - The value for this data point.
 */
type SeriesItem = {
  date: string;
  value: number;
};

/**
 * Represents a data item containing a facet and a series of data points.
 * @typedef {Object} DataItem
 * @property {string} facet - The facet associated with this data item.
 * @property {SeriesItem[]} series - An array of data points in the series.
 */
export type DataItem = {
  facet: string;
  series: SeriesItem[];
};

/**
 * Represents a facet with metadata about the source of data.
 * @typedef {Object} Facet
 * @property {string} importName - The name of the import source.
 * @property {string} measurementMethod - The method used to measure the data.
 * @property {string} provenanceUrl - The URL for more information about the data source.
 */
type Facet = {
  importName: string;
  measurementMethod: string;
  provenanceUrl: string;
};

/**
 * Represents a collection of data items, organized by keys.
 * @typedef {Object.<string, Object.<string, DataItem[]>>} Data
 */
type Data = {
  [key: string]: {
    [key: string]: DataItem[];
  };
};

/**
 * Represents a collection of facets, organized by keys.
 * @typedef {Object.<string, Facet>} Facets
 */
type Facets = {
  [key: string]: Facet;
};

/**
 * Represents the root object, containing data and facets.
 * @typedef {Object} RootObject
 * @property {Data} data - The collection of data items.
 * @property {Facets} facets - The collection of facets.
 */
export type RootObject = {
  data: Data;
  facets: Facets;
};




/**
  * BULK SERIES DATA
*/

/**
 * Represents an individual observation within a facet series.
 * @typedef {Object} SeriesEntry
 * @property {string} date - The date of the observation.
 * @property {number} value - The value of the observation.
 */
export type SeriesEntry = {
  date: string;
  value: number;
};

/**
 * Represents a series of observations associated with a specific facet.
 * @typedef {Object} FacetSeries
 * @property {SeriesEntry[]} series - The list of observations in the series.
 * @property {string} facet - The facet associated with this series.
 */
type FacetSeries = {
  series: SeriesEntry[];
  facet: string;
};

/**
 * Represents an entity with its corresponding series of observations per facet.
 * @typedef {Object} ObservationsByEntity
 * @property {string} entity - The entity associated with the observation series.
 * @property {FacetSeries[]} seriesByFacet - The list of facet series associated with the entity.
 */
type ObservationsByEntity = {
  entity: string;
  seriesByFacet: FacetSeries[];
};

/**
 * Represents a variable with its corresponding entities and their observations.
 * @typedef {Object} ObservationsByVariable
 * @property {string} variable - The variable associated with the observations.
 * @property {ObservationsByEntity[]} observationsByEntity - The list of entities with their corresponding observations.
 */
type ObservationsByVariable = {
  variable: string;
  observationsByEntity: ObservationsByEntity[];
};

/**
 * Represents the metadata of a facet.
 * @typedef {Object} FacetMetadata
 * @property {string} importName - The name of the data import source.
 * @property {string} measurementMethod - The method used for the data measurement.
 * @property {string} provenanceUrl - The URL for more information about the data source.
 */
type FacetMetadata = {
  importName: string;
  measurementMethod: string;
  provenanceUrl: string;
};

/**
 * Represents the root object for a bulk fetch response.
 * @typedef {Object} BulkFetchResponse
 * @property {ObservationsByVariable[]} observationsByVariable - The list of variables with their corresponding entities and observations.
 * @property {Object.<string, FacetMetadata>} facets - The collection of facet metadata, organized by facet keys.
 */
export type BulkFetchResponse = {
  observationsByVariable: ObservationsByVariable[];
  facets: { [key: string]: FacetMetadata };
};



