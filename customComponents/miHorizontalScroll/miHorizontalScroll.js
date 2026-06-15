import { loadTemplate } from "../loadTemplate.js";

const miHorizontalScrollTemplate = await loadTemplate("./miHorizontalScroll/miHorizontalScroll.html");

class MiHorizontalScroll extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(miHorizontalScrollTemplate.content.cloneNode(true));

    this._container = this._shadow.querySelector(".scroll-container");
    this._btnLeft = this._shadow.querySelector(".btn-left");
    this._btnRight = this._shadow.querySelector(".btn-right");
  }

  connectedCallback() {
    this._btnLeft.addEventListener("click", () => this._scrollBy(-220));
    this._btnRight.addEventListener("click", () => this._scrollBy(220));
  }

  _scrollBy(delta) {
    this._container.scrollBy({ left: delta, behavior: "smooth" });
  }
}

customElements.define("mi-horizontal-scroll", MiHorizontalScroll);
