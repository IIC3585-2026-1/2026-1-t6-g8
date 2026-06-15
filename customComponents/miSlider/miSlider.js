import { loadTemplate } from "../loadTemplate.js";

const miSliderTemplate =
  await loadTemplate("./miSlider/miSlider.html");

class MiSliderLabel extends HTMLElement {
  connectedCallback() {
    this.style.display = "none";
  }
}

customElements.define("mi-slider-label", MiSliderLabel);

class MiSlider extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "open" });

    this._shadow.appendChild(
      miSliderTemplate.content.cloneNode(true)
    );

    this._input = this._shadow.querySelector("input");
    this._fill = this._shadow.querySelector(".fill");
    this._labels = this._shadow.querySelector(".labels");
    this._bubble = this._shadow.querySelector(".value-bubble");
  }

  connectedCallback() {
    this._input.min = this.getAttribute("min") ?? 0;
    this._input.max = this.getAttribute("max") ?? 100;
    this._input.step = this.getAttribute("step") ?? 1;
    this._input.value = this.getAttribute("value") ?? 50;

    this._updateVisuals();

    this._input.addEventListener("input", () => {
      this.setAttribute("value", this._input.value);
      this._updateVisuals();
    });

    this._renderLabels();

    this._observer = new MutationObserver(() =>
      this._renderLabels()
    );

    this._observer.observe(this, {
      childList: true,
      subtree: true,
    });
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._input) return;

    if (name === "value") this._input.value = newValue;
    this._updateVisuals();
  }

  _updateVisuals() {
    const min = Number(this._input.min);
    const max = Number(this._input.max);
    const val = Number(this._input.value);

    const pct = ((val - min) / (max - min)) * 100;

    this._fill.style.width = `${pct}%`;
    this._bubble.textContent = val;
  }

  _renderLabels() {
    this._labels.innerHTML = "";

    const labelEls =
      this.querySelectorAll("mi-slider-label");

    labelEls.forEach((el) => {
      let pos = el.getAttribute("position");

      if (pos === null) {
        const match =
          el.textContent.match(/-?\d+(\.\d+)?/);

        if (match) {
          const val = Number(match[0]);
          const min = Number(this._input.min)
          const max = Number(this._input.max);
          pos = ((val - min) / (max - min)) * 100;
        } else {
          pos = 0;
        }
      }

      const span = document.createElement("span");
      span.className = "label-item";
      span.style.left = `${pos}%`;
      span.innerHTML = el.innerHTML;
      this._labels.appendChild(span);
    });
  }
}

customElements.define("mi-slider", MiSlider);