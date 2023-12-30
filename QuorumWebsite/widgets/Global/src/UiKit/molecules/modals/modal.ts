import { createElement, updateElement } from "../../../util/helper.js";
import { crossIcon } from "../../atoms/icons/icons";
import { Icon } from "../../atoms/icons/showIcons";
import { focusTrap } from '../../../util/focusTrap.js';

export abstract class Modal {
  protected modalElement: HTMLElement;
  protected backdropElement: HTMLElement;
  private focusTrap: ReturnType<typeof focusTrap>;
  protected closeButton: HTMLButtonElement;

  constructor(modalId: string, uniqueIdPrefix: string, parentElement: HTMLElement = document.body) {
    this.modalElement = this.createModalElement(modalId, uniqueIdPrefix);
    this.backdropElement = this.createBackdropElement(`${modalId}-backdrop`, uniqueIdPrefix);
    const crossIconEl = new Icon({ icon: crossIcon, addClass: 'icon-neutral__black-size-1', id: modalId, uniqueIdPrefix: uniqueIdPrefix });

    this.closeButton = createElement('button', {
      innerHTML: crossIconEl?.svg?.outerHTML || 'close',
      addStyle: {
        position: 'absolute',
        top: '32px',
        right: '32px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
      },
      addClass: 'icon-neutral__black-size-1',
      onpointerdown: () => { this.close() },
      onkeydown: (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.close();
        }
      }
    })

    this.closeButton.setAttribute('aria-label', 'Close Settings Modal');
    this.closeButton.setAttribute('tabIndex', '0');
    this.closeButton.setAttribute('role', 'button');

    this.modalElement.appendChild(this.closeButton);

    parentElement.appendChild(this.modalElement);
    parentElement.appendChild(this.backdropElement);

    this.initializeEventListeners();
    this.focusTrap = focusTrap(this.modalElement);
  }

  private createModalElement(modalId: string, uniqueIdPrefix: string): HTMLElement {
    return createElement('div', {
      uniqueIdPrefix,
      id: modalId,
      addClass: 'modal',
      role: 'dialog',
      ariaModal: 'true',
      tabIndex: -1,
    });
  }

  private createBackdropElement(backdropId: string, uniqueIdPrefix: string): HTMLElement {
    return createElement('div', {
      uniqueIdPrefix,
      id: backdropId,
      addClass: 'backdrop',
    });
  }

  private initializeEventListeners(): void {
    this.backdropElement.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }

  public open(): void {
    updateElement(this.modalElement, { addClass: 'open' });
    updateElement(this.backdropElement, { addClass: 'open' });
    this.modalElement.style.display = 'block';
    this.backdropElement.style.display = 'block';
    this.focusTrap.activate();
  }

  public close(): void {
    updateElement(this.modalElement, { removeClass: 'open' });
    updateElement(this.backdropElement, { removeClass: 'open' });
    this.modalElement.style.display = 'none';
    this.backdropElement.style.display = 'none';
    this.focusTrap.deactivate();
  }
}

