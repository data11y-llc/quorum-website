import { createElement } from "../util/helper";

interface CityGraphProps {
  uniqueIdPrefix: string;
}

const CITY_HEIGHT_PX = 20;  // Change this if you've defined a different height in SCSS.
const CITY_WIDTH_PX = 20;  // Change this if you've defined a different width in SCSS.
const CONTAINER_HEIGHT_PX = 500;  // Change this to match the actual height of your container.
const CONTAINER_WIDTH_PX = 1000;  // Change this to match the actual width of your container.

const CITY_HEIGHT_PERCENT = (CITY_HEIGHT_PX / CONTAINER_HEIGHT_PX) * 100;
const CITY_WIDTH_PERCENT = (CITY_WIDTH_PX / CONTAINER_WIDTH_PX) * 100;

// Now in drawLine method:

export class CityGraph {
  id: string
  uniqueIdPrefix: string
  cityGraphContainer: HTMLDivElement
  algorithm: string
  cityAmount: number
  cities: City[] = []
  startCity: City | null = null;
  selectedCity: City | null = null;
  svgContainer: SVGSVGElement;
  orderText: HTMLDivElement
  order: number = 1;
  containerHeightPx: number = 500;
  containerWidthPx: number = 1000;
  selectedCityOrder: number = 0;
  previousCity: City | null = null;
  private totalDistance: number = 0;

  constructor(props: CityGraphProps) {
    const { uniqueIdPrefix } = props;
    this.uniqueIdPrefix = uniqueIdPrefix;
    this.cityGraphContainer = this.createCityGraphContainer()

    document.addEventListener('cityClick', this.handleCityClick);

    window.addEventListener('resize', this.debounce(this.handleResize, 150, false));

    this.svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svgContainer.style.width = '100%';
    this.svgContainer.style.height = '100%';
    this.svgContainer.style.position = 'absolute';
    this.svgContainer.style.top = '0';
    this.svgContainer.style.left = '0';
    this.cityGraphContainer.appendChild(this.svgContainer);
  }

  createCityGraphContainer() {
    const cityGraphContainer = createElement('div', {
      addClass: 'tsp-city-graph-container',
      id: 'tsp-city-graph-container',
      uniqueIdPrefix: this.uniqueIdPrefix,
      textContent: 'City Graph'
    })

    // Setting position to 'relative'
    cityGraphContainer.style.position = 'relative';
    // Add width and height to your container if not specified in css
    cityGraphContainer.style.width = `${CONTAINER_WIDTH_PX}px`;
    cityGraphContainer.style.height = `${CONTAINER_HEIGHT_PX}px`;

    return cityGraphContainer
  }

  allCitiesSelected(): boolean {
    return this.cities.every(city => city.selected);
  }

  handleCityClick = (event: any) => {
    this.updateSelectedCity(event.detail.city as City);
  }

  updateSelectedCity(city: City) {
    this.selectedCityOrder = this.selectedCityOrder + 1;
    const clickedCity = city
    if (this.previousCity.isStart && clickedCity.isStart) {
      return
    }
    this.previousCity = clickedCity;
    // If all cities are visited and the start city is clicked, return
    if (this.cities.every(city => city.isCurrent || city.isStart) && clickedCity.isStart) {
      this.selectedCity = clickedCity;
      const distance = this.getDistance(this.startCity, this.selectedCity);
      console.log(`previous distance: ${this.totalDistance} + ${distance} = ${this.totalDistance + distance}`);
      this.totalDistance += distance; // Add this line
      this.drawLine(this.selectedCity, this.startCity);
      return;
    }

    // If the clicked city has been visited before or it's the currently selected city, return
    if (clickedCity.isCurrent || clickedCity === this.selectedCity) {
      return;
    }

    // If no city has been selected yet, select the start city
    if (!this.selectedCity) {
      this.selectedCity = this.startCity;
    }

    // Remove the current status of the previously selected city
    if (this.selectedCity && this.selectedCity !== this.startCity) {
      this.selectedCity.isCurrent = false;
      this.selectedCity.element.style.backgroundColor = ''; // Reset color
    }

    if (this.selectedCity !== this.startCity || this.allCitiesSelected()) {
      this.selectedCity.orderText.textContent = String(this.order++);
      this.selectedCity.orderText.style.display = 'block';
    }

    // Set the clicked city as the currently selected city
    this.selectedCity = clickedCity;
    this.selectedCity.isCurrent = true;
    this.selectedCity.element.style.backgroundColor = 'red'; // Color for the current city

    const distance = this.getDistance(this.startCity, this.selectedCity);
    console.log(`previous distance: ${this.totalDistance} + ${distance} = ${this.totalDistance + distance}`);
    this.totalDistance += distance;
    this.drawLine(this.startCity, this.selectedCity);
    this.startCity = this.selectedCity; // Make the current city the start city for the next line to be drawn
  }

  handleResize = () => {
    // Update container dimensions
    this.containerHeightPx = this.cityGraphContainer.offsetHeight;
    this.containerWidthPx = this.cityGraphContainer.offsetWidth;

    // Update city positions and sizes
    this.cities.forEach(city => {
      city.recalculatePosition(this.containerHeightPx, this.containerWidthPx);
      city.resize(this.containerHeightPx, this.containerWidthPx);
    });

    // Redraw lines
    this.redraw();
  }


  redraw() {
    // Remove old lines
    this.cities.forEach(city => {
      if (city.line) {
        this.svgContainer.removeChild(city.line);
        city.line = null;
      }
    });

    // Redraw lines only for visited cities
    const visitedCities = this.cities.filter(city => city.isStart || city.isCurrent);

    visitedCities.forEach((city, index) => {
      if (index < visitedCities.length - 1) {
        this.drawLine(city, visitedCities[index + 1]);
      }
    });
  }


  reset() {
    console.log('resetting city graph');
    this.cities.forEach(city => {
      city.isStart = false;
      city.isCurrent = false;
      city.element.style.backgroundColor = ''; // Reset color
      this.removeLine(city);
      this.cityGraphContainer.removeChild(city.element);
      city.selected = false;
    });
    // Remove all lines from the SVG container
    while (this.svgContainer.firstChild) {
      this.svgContainer.removeChild(this.svgContainer.firstChild);
    }
    this.cities = [];
    this.order = 1;
  }


  newLevel() {
    console.log('new level city graph');
    this.reset();
    for (let i = 0; i < this.cityAmount; i++) {
      const city = new City(this.uniqueIdPrefix, this);
      this.cities.push(city);
      city.render(this.cityGraphContainer);
    }
    this.startCity = this.cities[0];
    this.startCity.isStart = true;
    this.previousCity = this.startCity;
    this.startCity.element.style.backgroundColor = 'blue'; // Color for the start city
    this.startCity.tooltip.textContent = "Start city"; // Tooltip for the starting city
    this.startCity.element.setAttribute('aria-label', "Start city"); // Aria-label for accessibility

    // For the rest of the cities, display the distance from the start city
    for (let i = 1; i < this.cities.length; i++) {
      const city = this.cities[i];
      const distanceFromStart = this.getDistance(this.startCity, city);
      city.tooltip.textContent = `Distance: ${distanceFromStart.toFixed(2)}`;
      city.element.setAttribute('aria-label', `Distance from start: ${distanceFromStart.toFixed(2)}`); // Aria-label for accessibility
    }
  }

  getDistance(city1: City, city2: City): number {
    const dx = city1.x - city2.x;
    const dy = city1.y - city2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }


  // Now in drawLine method:
  drawLine(city1: City, city2: City) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    // Add half the city's width to the x coordinate and half the city's height to the y coordinate.
    line.setAttribute('x1', `${city1.x + CITY_WIDTH_PERCENT / 2}%`);
    line.setAttribute('y1', `${city1.y + CITY_HEIGHT_PERCENT / 2}%`);
    line.setAttribute('x2', `${city2.x + CITY_WIDTH_PERCENT / 2}%`);
    line.setAttribute('y2', `${city2.y + CITY_HEIGHT_PERCENT / 2}%`);

    line.style.stroke = 'black';
    line.style.strokeWidth = '2';
    this.svgContainer.appendChild(line);
    city1.line = line;
  }


  removeLine(city: City) {
    if (city.line) {
      this.svgContainer.removeChild(city.line);
      city.line = null;
    }
  }

  changeAlgorithm(algorithm: string) {
    this.algorithm = algorithm
    if (this.algorithm === 'BruteForce') {
      // Implement brute force algorithm
    } else if (this.algorithm === 'Greedy') {
      // Implement greedy algorithm
    }
  }

  changeCityAmount(cityAmount: number) {
    this.cityAmount = cityAmount
  }

  debounce(func: Function, wait: number, immediate: boolean) {
    let timeout: any;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }


  render(parent: HTMLDivElement) {
    console.log('rendering city graph')
    parent.appendChild(this.cityGraphContainer);
  }
}

export class City {
  element: HTMLDivElement;
  tooltip: HTMLDivElement;
  x: number;
  y: number;
  line: SVGLineElement | null = null;
  isStart: boolean = false;
  isCurrent: boolean = false;
  orderText: HTMLDivElement;
  selected: boolean = false;
  relativeX: number; // In range [0, 1]
  relativeY: number; // In range [0, 1]

  constructor(private uniqueIdPrefix: string, private cityGraph: CityGraph) {
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;

    // Store the initial positions as relative values
    this.relativeX = this.x / CONTAINER_WIDTH_PX;
    this.relativeY = this.y / CONTAINER_HEIGHT_PX;

    this.element = createElement('div', {
      addClass: 'tsp-city',
      id: `${uniqueIdPrefix}-city`,
    });

    this.tooltip = createElement('div', {
      addClass: 'tsp-city-tooltip',
      id: `${uniqueIdPrefix}-city-tooltip`,
      textContent: `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`,
    });

    this.element.style.left = `${this.x}%`;
    this.element.style.top = `${this.y}%`;

    // Hide tooltip by default
    this.tooltip.style.display = 'none';

    // Add event listeners for showing and hiding tooltip on hover
    this.element.addEventListener('mouseover', this.handleMouseOver.bind(this));
    this.element.addEventListener('mouseout', this.handleMouseOut.bind(this));

    this.element.addEventListener('click', this.onClick.bind(this));

    this.orderText = createElement('div', {
      addClass: 'tsp-city-order',
      id: `${uniqueIdPrefix}-city-order`,
      textContent: '',
    });
    this.orderText.style.display = 'none';
    this.element.appendChild(this.orderText);
  }

  handleMouseOver() {
    this.tooltip.style.display = 'block';
    if (this.cityGraph.selectedCity) {
      if (this.isCurrent) {
        this.tooltip.textContent = `current city`;
      } else {
        const distance = this.cityGraph.getDistance(this.cityGraph.selectedCity, this);
        this.tooltip.textContent = `Distance: ${distance.toFixed(2)}`;
      }
    }
  }

  handleMouseOut() {
    this.tooltip.style.display = 'none';
  }

  onClick() {
    this.selected = !this.selected;
    const event: CustomEvent = new CustomEvent('cityClick', {
      detail: {
        city: this,
      }
    });
    this.tooltip.textContent = `current city`;
    document.dispatchEvent(event);
  }

  resize(containerHeight: number, containerWidth: number) {
    const cityHeightPx = (CITY_HEIGHT_PERCENT / 100) * containerHeight;
    const cityWidthPx = (CITY_WIDTH_PERCENT / 100) * containerWidth;

    this.element.style.height = `${cityHeightPx}px`;
    this.element.style.width = `${cityWidthPx}px`;
  }

  recalculatePosition(containerHeight: number, containerWidth: number) {
    // Recalculate the x and y as a percentage of the new container size
    this.x = this.x / containerWidth * 100;
    this.y = this.y / containerHeight * 100;

    // Reposition the city element
    this.element.style.left = `${this.x}%`;
    this.element.style.top = `${this.y}%`;
  }

  render(parent: HTMLDivElement) {
    parent.appendChild(this.element);
    this.element.appendChild(this.tooltip);
  }
}

