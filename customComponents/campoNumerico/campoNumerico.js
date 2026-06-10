import { loadTemplate } from "../loadTemplate.js";

const campoNumericoTemplate = await loadTemplate("./campoNumerico.html");

class CampoNumerico extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "open" });

    this._shadow.appendChild(
      campoNumericoTemplate.content.cloneNode(true)
    );

    this._input = this._shadow.querySelector("input");
    this._dec = this._shadow.querySelector("button.dec");
    this._inc = this._shadow.querySelector("button.inc");
  }

  connectedCallback() {
    this._input.value = Number(this.getAttribute("value") ?? 0);

    this._dec.addEventListener("click", () => this._change(-1));
    this._inc.addEventListener("click", () => this._change(+1));

    this._input.addEventListener("change", () => {
      this.setAttribute("value", this._input.value);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value" && this._input) {
      this._input.value = Number(newValue);
    }
  }

  _change(delta) {
    const next = Number(this._input.value) + delta;
    this.setAttribute("value", next);
  }
}

customElements.define("campo-numerico", CampoNumerico);