import { Button } from "../UiKit/atoms/buttons/buttons";
import { RadioGroup } from "../UiKit/atoms/radio/radio";
import { TextInputField } from "../UiKit/atoms/textFields/textFields";
import { ValueOf } from "../UiKit/helperTypes";
import { AdditionalTypes, createElement, updateElement } from "../util/helper";

export type FaceDetectionOptions = [
  "None",
  "Nose",
  "Face"
];

export const FaceDetectionArray: FaceDetectionOptions = [
  "None",
  "Nose",
  "Face",
];

export class Settings {
  id: string;
  container: HTMLDivElement;
  #radioGroup: RadioGroup<FaceDetectionOptions>;
  #inputContent: HTMLDivElement & AdditionalTypes
  #faceZoomDiv: HTMLDivElement & AdditionalTypes;
  contentInput: TextInputField;
  contentCallback: (content: string) => void;

  constructor(id: string, contentCallback: (content: string) => void) {
    this.id = id;
    this.contentCallback = contentCallback;
    this.container = createElement("div", {
      uniqueIdPrefix: this.id,
      id: "settings-container",
      addStyle: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
      },
    });

    createElement("h2", {
      uniqueIdPrefix: this.id,
      id: "settings-label",
      textContent: "Image Settings",
      addStyle: {
        marginBottom: '10px',
        marginTop: '10px'
      },
      addClass: "typo_title-title2",
      appendTo: this.container
    });

    this.#inputContent = this.createInputContent();
    this.#faceZoomDiv = this.createFaceZoomDiv();
  }

  init(): void {
    throw new Error("Method not implemented.");
  }

  get radioGroup(): RadioGroup<FaceDetectionOptions> {
    return this.#radioGroup;
  }

  createFaceZoomDiv(): HTMLDivElement & AdditionalTypes {
    const faceZoomDiv = createElement('div',
      {
        id: 'faceZoomDiv',
        uniqueIdPrefix: this.id,
        addStyle: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '100%',
          alignItems: 'flex-start',
          marginTop: '10px',
          marginBottom: '10px'
        },
      });

    //make a section for details on how face zoom will work with a label and paragraph
    createElement('label', {
      uniqueIdPrefix: this.id,
      id: 'faceZoomLabel',
      textContent: 'Face Detection',
      addClass: 'typo_title-title5',
      appendTo: faceZoomDiv
    });

    createElement('p', {
      uniqueIdPrefix: this.id,
      id: 'faceZoomParagraph',
      textContent: 'Face Detection will zoom in on the faces of the image and average the colors of the faces. This will only work if the image has faces in it.',
      addClass: 'typo_text-smText',
      appendTo: faceZoomDiv
    });

    //make the checkboxes
    this.#radioGroup = new RadioGroup<FaceDetectionOptions>({ options: FaceDetectionArray, uniqueIdPrefix: this.id, id: "show-face-detection", theme: 'light', direction: 'row', disabled: false, name: 'face-detection' })
    this.#radioGroup.selectRadio("None");

    //add the checkboxes to the div
    this.#radioGroup.render(faceZoomDiv);

    return faceZoomDiv;
  }

  createInputContent(): HTMLDivElement & AdditionalTypes {

    const contentDiv = createElement('div',
      {
        id: 'contentDiv',
        uniqueIdPrefix: this.id,
        addStyle: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          alignItems: 'center',
          marginTop: '10px',
          marginBottom: '10px'
        }
      });

    this.contentInput = new TextInputField({ labelText: "Content Category", type: "text", uniqueIdPrefix: this.id, id: "contentInput", placeholder: "Enter text here" });
    this.contentInput.changeLabelClass('typo_title-title5');

    const submitContent = new Button({ className: 'btn-small-primary-var1', text: "Submit", disabled: false, uniqueIdPrefix: this.id, id: "submitContent" });
    updateElement(submitContent.button, { addStyle: { marginLeft: '10px', marginTop: '10px' } });
    submitContent.onClick(() => {
      this.contentCallback(this.contentInput.input.value);
    });

    this.contentInput.render(contentDiv);
    submitContent.render(contentDiv);

    return contentDiv;
  }

  resetAutoDetection(fdOption: ValueOf<FaceDetectionOptions>): void {
    //get the current onchange function
    if (fdOption === "Face") {
      this.#radioGroup.selectRadio("Face");
    } else if (fdOption === "Nose") {
      this.#radioGroup.selectRadio("Nose");
    } else {
      this.#radioGroup.selectRadio("None");
    }
  }

  setAutoDetectionAction(action: () => void): void {
    this.#radioGroup.setOnChange(() => {
      action()
    });
  }

  render(parent: HTMLDivElement): void {
    this.container.appendChild(this.#inputContent);
    this.container.appendChild(this.#faceZoomDiv);
    parent.appendChild(this.container);
  }
}
