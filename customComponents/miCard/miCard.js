import { loadTemplate } from "../loadTemplate.js";

const cardTemplate = await loadTemplate("./miCard/miCard.html");

class MiCard extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(cardTemplate.content.cloneNode(true));
  }
}

customElements.define("mi-card", MiCard);
