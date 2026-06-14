import { loadTemplate } from "../loadTemplate.js";

const accordionTemplate = await loadTemplate("./miAccordion/miAccordion.html");
const itemTemplate = await loadTemplate("./miAccordion/miAccordionItem.html");

class MiAccordion extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(accordionTemplate.content.cloneNode(true));
  }
}

customElements.define("mi-accordion", MiAccordion);

class MiAccordionItem extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(itemTemplate.content.cloneNode(true));
    this._heading = this._shadow.querySelector(".heading");
  }

  connectedCallback() {
    this._heading.addEventListener("click", () => {
      this.toggleAttribute("open");
    });
  }
}

customElements.define("mi-accordion-item", MiAccordionItem);
