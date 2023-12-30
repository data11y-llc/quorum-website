export function focusTrap(element: HTMLElement) {
  let previouslyFocusedElement: HTMLElement | null = null;



  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;

    event.preventDefault();
    const nonRadioFocusableElements = Array.from(
      element.querySelectorAll<HTMLElement>(
        'button, [href], input:not([type="radio"]), select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled'));

    // Add the first radio button in each radio group
    const radioGroups = new Set(
      Array.from(element.querySelectorAll<HTMLInputElement>('input[type="radio"]')).map((el) => el.name)
    );
    const firstRadioInGroups = Array.from(radioGroups)
      .map((name) => element.querySelector<HTMLInputElement>(`input[type="radio"][name="${name}"]`))
      .filter((el) => el && !el.hasAttribute('disabled')) as HTMLElement[];

    const focusableElements = [...nonRadioFocusableElements, ...firstRadioInGroups];

    if (focusableElements.length === 0) return;

    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    const nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1;

    if (nextIndex < 0) {
      focusableElements[focusableElements.length - 1].focus();
    } else if (nextIndex >= focusableElements.length) {
      focusableElements[0].focus();
    } else {
      focusableElements[nextIndex].focus();
    }
  }



  return {
    activate() {
      previouslyFocusedElement = document.activeElement as HTMLElement;
      element.addEventListener('keydown', handleKeyDown);

      // Focus on the first focusable element inside the element.
      setTimeout(() => {
        const firstFocusableElement = element.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusableElement && !firstFocusableElement.hasAttribute('disabled')) {
          console.log('switching focus to first focusable element');
          firstFocusableElement.focus();
        }
      }, 100);
    },
    deactivate() {
      element.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    },
  };
}

