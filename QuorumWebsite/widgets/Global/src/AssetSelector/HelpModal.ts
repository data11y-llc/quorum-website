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
      innerHTML: "How to use the Asset Getter",
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
      innerHTML: "To use the asset getter use the sidebar navigator to explore different Images, Sounds, and CSVs. Select a specific category to browse what you want as your asset. These assets are already embedded with your Quorum apps.",
      addStyle: {
        textAlign: "left",
        fontFamily: "Montserrat",
        fontSize: "1em",
        fontWeight: "normal",
      },
      appendTo: this.modal
    });

    createElement("h1", {
      innerHTML: "Copying an Asset",
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
      innerHTML: "There are two ways to copy an asset for your apps. You may press on the thumbnail on the asset itself or press the “Copy” button on the right hand corner. This will give you the direct path to the asset used and you can paste the linked URL into one of your actions.",
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

