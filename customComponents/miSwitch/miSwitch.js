import { loadTemplate } from "../loadTemplate.js";

const miSwitchTemplate = await loadTemplate("./miSwitch/miSwitch.html");

class MiSwitch extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(miSwitchTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.addEventListener("click", () => this._toggle());
  }

  _toggle() {
    if (this.hasAttribute("checked")) {
      this.removeAttribute("checked");
    } else {
      this.setAttribute("checked", "");
    }
  }
}

customElements.define("mi-switch", MiSwitch);
