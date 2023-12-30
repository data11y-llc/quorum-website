import { createElement } from "../util/helper";

export class HelpModal {
  id: string = "themeSettingsModalthemeSettingsModalcontent";
  modal: HTMLDivElement;
  constructor(uniqueId: string) {
    this.id = uniqueId + this.id;
    console.log("HelpModal constructor");
    console.log("this.id: " + this.id);
    this.modal = document.getElementById(this.id) as HTMLDivElement;
    this.modal.innerHTML = "";

    this.modal.style.height = "auto";
    this.modal.style.padding = "1em";
    this.modal.style.backgroundColor = "white";

    console.log("HelpModal constructor");

    // add header to the modal
    createElement("h1", {
      innerHTML: "How to use the Text Compression Widget",
      addStyle: {
        width: "100%",
        textAlign: "left",
        fontFamily: "Montserrat",
        fontSize: "1.2em",
        fontWeight: "bold",
      },
      appendTo: this.modal
    });

    // add paragraph to the modal
    createElement("p", {
      innerHTML: "Look for patterns (repeated words or phrases) in the text. Enter the patterns you see into the dictionary on the right. As you type entries into the repeated words section, the symbol for the entry is inserted into the text in place of the pattern. The compression details update automatically as you start typing in repeated words or phrases.",
      addStyle: {
        textAlign: "left",
        fontFamily: "Montserrat",
        fontSize: "1em",
        fontWeight: "normal",
      },
      appendTo: this.modal
    });
  }
}

