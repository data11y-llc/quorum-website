import { createIDE, updateIDEAppearance } from './IDEInitialization';

//all code uses sass and is compiled to css
//uses some elements from UiKit such as tabs and sass from buttons

// Load the IDE when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  //data11y-code is the class for the div that contains the IDE
  const loader = document.querySelectorAll('.data11y-code') as NodeListOf<HTMLDivElement>;
  // Initialize the IDE for each loader element
  loader.forEach(ideElement => {
    const ideExists = document.getElementById(ideElement.id);
    if (ideExists) {
      const ide = createIDE(ideElement);
      updateIDEAppearance(ide);
    }
  });
});

