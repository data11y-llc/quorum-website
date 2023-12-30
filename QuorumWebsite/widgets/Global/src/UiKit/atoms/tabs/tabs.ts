import { AdditionalTypes, createElement } from '../../../util/helper';
import { Theme, TupleToUnion } from '../../helperTypes';
import {
  crossIcon,
  plusIcon,
  quorumPaperIcon,
  quorumWhitePaperIcon,
} from '../icons/icons';
import { formatSVG } from '../icons/showIcons';
import TabStyles from './tabs.scss';

type TabClassNames = keyof typeof TabStyles;
interface TabProps {
  theme: 'light' | 'dark' | 'high-contrast';
  size: 'sm' | 'md' | 'lg';
  uniqueIdPrefix: string;
  id: string;
  shouldHaveCloseButton: boolean;
  shouldHavePlusButton: boolean;
}

export class Tabs {
  private tabList: HTMLDivElement;
  private theme: 'light' | 'dark' | 'high-contrast';
  private size: 'sm' | 'md' | 'lg';
  private id: string;
  private uniqueIdPrefix: string;
  private shouldHaveCloseButton: boolean;
  private shouldHavePlusButton: boolean;

  constructor(props: TabProps) {
    const { theme, size, uniqueIdPrefix, id, shouldHaveCloseButton, shouldHavePlusButton } = props;
    this.id = id;
    this.uniqueIdPrefix = uniqueIdPrefix;
    this.shouldHaveCloseButton = shouldHaveCloseButton;
    this.shouldHavePlusButton = shouldHavePlusButton;
    this.tabList = createElement('div', {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_tablist',
      role: 'tablist',
      addClass: `tab-list-${theme}`,
    });
    this.theme = theme;
    this.size = size;

    const plusIconEl = formatSVG(plusIcon, 'icon-neutral__black-size-1');
    if (!plusIconEl) return;

    createElement('button', {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_plusButton',
      addStyle: this.shouldHavePlusButton ? { display: 'block' } : { display: 'none' },
      innerHTML: plusIconEl.outerHTML,
      ariaLabel: 'Add new tab',
      addClass: [`tab-plus-button-${theme}`],
      onclick: () => this.handlePlusButtonClick(),
      appendTo: this.tabList as HTMLElement,
    });
  }

  get fileNames(): string[] {
    const fileNames: string[] = [];
    const tabs = this.tabList.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      const innerTextEl = tab.querySelector(
        '.tab_text-' + this.theme
      ) as HTMLElement;
      if (innerTextEl) {
        fileNames.push(innerTextEl.innerText);
      }
    });
    return fileNames;
  }

  private handlePlusButtonClick() {
    const { tabAndCloseButton: newTabButton } = this.newTab(
      'New Tab',
      'false',
      `tab-${this.size}-${this.theme}`,
      this.id,
      this.uniqueIdPrefix
    );
    if (!newTabButton) return;
    this.setFocusOnTab(this.tabList.children.length - 2);
  }

  public setFocusOnTab(tab: number) {
    const tabs = this.tabList.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.classList.remove('tab_selected');
      tab.setAttribute('aria-selected', 'false');
    });
    //get tab-and-close-button and make it selected
    const newTabButton = tabs[tab] as HTMLDivElement;
    this.handleTabClick(newTabButton);
  }

  public newTab(
    innerText: string,
    ariaSelected: string,
    addClass: TabClassNames | TabClassNames[],
    id: string,
    uniqueIdPrefix: string
  ): {
    tabAndCloseButton: HTMLDivElement & AdditionalTypes;
    newTabButton: HTMLButtonElement & AdditionalTypes;
    closeButton: HTMLButtonElement & AdditionalTypes | null;
  } {
    const tabAndCloseButton = createElement('div', {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_tabAndCloseButton',
      role: 'tab',
      addClass: addClass,
      ariaSelected:
        Array.isArray(addClass) && addClass.includes('tab_selected')
          ? 'true'
          : 'false',
    });

    const quorumIcon = formatSVG(
      this.theme === 'light' ? quorumPaperIcon : quorumWhitePaperIcon,
      'icon-quorum__blue__100-size-2'
    );


    const innerTextEl = createElement('span', {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_tabText',
      addClass: `tab_text-${this.theme}`,
      innerHTML: quorumIcon?.outerHTML + '&nbsp;' + innerText,
    });

    const newTabButton = createElement('button', {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_tabButton',
      ariaSelected: ariaSelected,
      addChildren: [innerTextEl],
      addClass: this.shouldHaveCloseButton
        ? [`tab-and-close-button-${this.theme}`]
        : ['new-tab-button-full-width', `tab-and-close-button-${this.theme}`],
      onclick: () => {
        this.handleTabClick(tabAndCloseButton);
      },
      appendTo: tabAndCloseButton,
    });

    let iconColor: 'black' | 'white';
    if (this.theme === 'light') {
      iconColor = 'black';
    } else {
      iconColor = 'white';
    }
    const closeIcon = formatSVG(crossIcon, `icon-neutral__${iconColor}-size-1`);

    const closeButton = this.shouldHaveCloseButton ? createElement('button', {
      uniqueIdPrefix: uniqueIdPrefix,
      id: id + '_closeButton',
      innerHTML: closeIcon?.outerHTML,
      addClass: [`close-button-${this.theme}`],
      ariaLabel: `Close ${innerText} tab`,
      onclick: () => {
        //make the next tab active
        const nextTab = tabAndCloseButton.nextSibling as HTMLDivElement;
        if (nextTab) {
          nextTab.classList.add('tab_selected');
          nextTab.setAttribute('aria-selected', 'true');
          this.handleTabClick(nextTab);
        } else {
          const prevTab = tabAndCloseButton.previousSibling as HTMLDivElement;
          if (prevTab) {
            prevTab.classList.add('tab_selected');
            prevTab.setAttribute('aria-selected', 'true');
            this.handleTabClick(prevTab);
          }
        }
        this.removeTab(tabAndCloseButton);
      },
      appendTo: tabAndCloseButton,
    }) : null;

    // Get the "+" button element
    const plusButton = this.tabList.querySelector(
      '.tab-plus-button-' + this.theme
    ) as HTMLDivElement;

    // Insert the new tab just before the "+" button
    this.tabList.insertBefore(tabAndCloseButton, plusButton);

    return { tabAndCloseButton, newTabButton, closeButton };
  }

  private removeTab(tab: HTMLElement) {
    tab.remove();
  }

  private handleTabClick(tab: HTMLDivElement) {
    const tabListChildren = this.tabList.children;
    for (let i = 0; i < tabListChildren.length; i++) {
      tabListChildren[i].classList.remove('tab_selected');
      tabListChildren[i].setAttribute('aria-selected', 'false');
    }
    // tab.classList.add('tab_selected');
    // tab.setAttribute('aria-selected', 'true');
    const tabChildren = tab.children;
    for (let i = 0; i < tabChildren.length; i++) {
      //if the child is the tab-and-close-button class
      if (
        tabChildren[i].classList.contains(`tab-and-close-button-${this.theme}`)
      ) {
        tabChildren[i].classList.add('tab_selected');
        tabChildren[i].setAttribute('aria-selected', 'true');
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('tab_selected');
      }
    }
  }

  public getTabList(): HTMLDivElement {
    return this.tabList;
  }

  public switchTheme(theme: TupleToUnion<Theme>) {
    // Update the class of the main div element
    this.tabList.classList.remove(`tab-list-${this.theme}`);
    this.tabList.classList.add(`tab-list-${theme}`);

    // Update the class of each tab button
    const tabs = this.tabList.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.classList.remove(`tab-${this.size}-${this.theme}`);
      tab.classList.add(`tab-${this.size}-${theme}`);

      // Update the class of the inner text element
      const innerTextEl = tab.querySelector(
        '.tab_text-' + this.theme
      ) as HTMLElement;
      if (innerTextEl) {
        innerTextEl.classList.remove('tab_text-' + this.theme);
        innerTextEl.classList.add('tab_text-' + theme);
      }

      // Update the class of the close button element
      const closeButtonEl = tab.querySelector(
        '.close-button-' + this.theme
      ) as HTMLElement;
      if (closeButtonEl) {
        const newCloseIcon = formatSVG(
          crossIcon,
          `icon-neutral__${theme === 'light' ? 'black' : 'white'}-size-1`
        );
        if (!newCloseIcon) return;
        closeButtonEl.innerHTML = newCloseIcon?.outerHTML;
        closeButtonEl.classList.remove('close-button-' + this.theme);
        closeButtonEl.classList.add('close-button-' + theme);
      }

      //update tab-and-close-button
      const tabAndCloseButtonEl = tab.querySelector(
        '.tab-and-close-button-' + this.theme
      ) as HTMLElement;
      if (tabAndCloseButtonEl) {
        tabAndCloseButtonEl.classList.remove(
          'tab-and-close-button-' + this.theme
        );
        tabAndCloseButtonEl.classList.add('tab-and-close-button-' + theme);
      }

      //update the quorum icon
      const quorumIconEl = tab.querySelector(
        '.tab_text-' + theme + ' svg'
      ) as HTMLElement;
      if (quorumIconEl) {
        const newQuorumIcon = formatSVG(
          theme === 'light' ? quorumPaperIcon : quorumWhitePaperIcon,
          'icon-quorum__blue__100-size-2'
        );
        if (!newQuorumIcon) return;
        quorumIconEl.replaceWith(newQuorumIcon);
      }
    });
    //update the plus icon
    //get the svg element
    const plusIconOG = this.tabList.querySelector(
      `[class^="tab-plus-button"] svg`
    ) as HTMLElement;

    if (plusIconOG) {
      const newPlusIcon = formatSVG(
        plusIcon,
        `icon-neutral__${theme === 'light' ? 'black' : 'white'}-size-1`
      );
      if (!newPlusIcon) return;
      plusIconOG.replaceWith(newPlusIcon);
    }

    // Update the theme property
    this.theme = theme;
  }

  public changeTabText(tabId: string, newText: string) {
    const tab = this.tabList.querySelector('#' + tabId);
    if (tab) {
      const textEl = tab.querySelector('.tab_text-' + this.theme);
      if (textEl) {
        // Remove existing text without affecting the SVG icon
        while (textEl.childNodes.length > 1) {
          textEl.removeChild(textEl.lastChild!);
        }
        // Append new text
        textEl.appendChild(document.createTextNode(' ' + newText));
      }
    }
  }


  public switchSize(size: 'sm' | 'md' | 'lg'): void {
    const tabs = this.tabList.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.classList.remove(`tab-${this.size}-${this.theme}`);
      tab.classList.add(`tab-${size}-${this.theme}`);
    });
    this.size = size;
  }

  public getFileName(tab: HTMLDivElement): string {
    const innerTextEl = tab.querySelector(
      '.tab_text-' + this.theme
    ) as HTMLElement;
    if (innerTextEl) {
      return innerTextEl.innerText;
    }
    return '';
  }

  public render(parent: HTMLElement) {
    parent.appendChild(this.tabList);
  }
}
