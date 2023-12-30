import { createElement } from "../../../util/helper";
import { UiKitColors } from "../../../util/UiKit";

export function createGrids(UiKit: HTMLDivElement, size: 'mobile' | 'tablet' | 'desktop' | 'responsive', layoutType: 'grid' | 'flex') {
  let container = createElement('div', {
    addClass: `container--${layoutType}--${size}`,
    addStyle: {
      backgroundColor: UiKitColors.neutral.grey._25,
    },
    appendTo: UiKit,
  });

  //add some text to the container
  createElement('p', {
    innerText: `${size} laksjdfl jalsk d als dlfjka sdlkj alskj dflj asdfj`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
      background: UiKitColors.neutral.white,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
  createElement('p', {
    innerText: `a`,
    addClass: 'typo_text-smText',
    addStyle: {
      color: UiKitColors.neutral.grey._65,
    },
    appendTo: container,
  });
}
