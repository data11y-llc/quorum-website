/**
 * Manages the focus of a group of focusable elements.
 * Monitors the 'style' attribute of the registered elements, 
 * automatically registering/deregistering based on their display property.
 */
export class FocusManager {
  private static instance: FocusManager;
  private focusableElements: HTMLElement[] = [];
  private observers: Map<HTMLElement, MutationObserver> = new Map();
  private elementNames: Map<HTMLElement, string> = new Map(); // New map to store variable names


  /**
   * Private constructor to prevent direct construction calls.
   */
  private constructor() { }

  /**
   * Get the singleton instance of FocusManager. 
   * If it doesn't exist, create it.
   * @returns The singleton instance of FocusManager.
   */
  public static getInstance(): FocusManager {
    if (!FocusManager.instance) {
      FocusManager.instance = new FocusManager();
    }
    return FocusManager.instance;
  }

  /**
  * Checks if a HTMLElement is visible.
  * @param {HTMLElement} element - The HTMLElement to check visibility.
  */
  private isVisible(element: HTMLElement): boolean {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  }

  /**
   * Register a focusable HTMLElement and start observing it.
   * @param {HTMLElement} element - The HTMLElement to be observed and managed.
   * @param {string} name - The variable name of the element.
   */
  register(element: HTMLElement, name: string): void {
    // Store the name of the element
    this.elementNames.set(element, name);

    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          if (this.isVisible(element)) {
            this.registerVisible(element);
          } else {
            this.unregisterVisible(element);
          }
        }
      }
    });

    this.observers.set(element, observer);
    observer.observe(element, { attributes: true });

    // Initial registration
    if (this.isVisible(element)) {
      this.registerVisible(element);
    }
  }

  /**
   * Unregister a focusable HTMLElement and stop observing it.
   * @param {HTMLElement} element - The HTMLElement to stop observing and managing.
   */
  unregister(element: HTMLElement): void {
    // Remove the name of the element
    this.elementNames.delete(element);

    const observer = this.observers.get(element);
    if (observer) {
      observer.disconnect();
      this.observers.delete(element);
    }
    this.unregisterVisible(element);
  }

  /**
   * Register a visible HTMLElement to the focusable elements list.
   * @param {HTMLElement} element - The HTMLElement to add to the focusableElements list.
   */
  private registerVisible(element: HTMLElement): void {
    if (!this.focusableElements.includes(element)) {
      this.focusableElements.push(element);
    }
  }

  /**
   * Unregister a visible HTMLElement from the focusable elements list.
   * @param {HTMLElement} element - The HTMLElement to remove from the focusableElements list.
   */
  private unregisterVisible(element: HTMLElement): void {
    this.focusableElements = this.focusableElements.filter(e => e !== element);
  }

  /**
   * Focus the next registered HTMLElement in the focusableElements list.
   * @param {HTMLElement} current - The currently focused HTMLElement.
   */
  focusNext(current: HTMLElement): boolean {
    const index = this.focusableElements.indexOf(current);
    if (index !== -1 && index < this.focusableElements.length - 1) {
      const nextElement = this.focusableElements[index + 1];
      nextElement.focus();
      return true;
    }
    return false;
  }

  /**
 * Focus the previous registered HTMLElement in the focusableElements list.
 * @param {HTMLElement} current - The currently focused HTMLElement.
 */
  focusPrevious(current: HTMLElement): boolean {
    const index = this.focusableElements.indexOf(current);
    if (index > 0) {
      const previousElement = this.focusableElements[index - 1];
      previousElement.focus();
      return true;
    }
    return false;
  }

  /**
 * Get a string representation of the focusable elements for debugging
 * @returns {string} A string representation of the focusable elements
 */
  debug(): string {
    return this.focusableElements.map(el => this.elementNames.get(el)).join(', ');
  }
}

