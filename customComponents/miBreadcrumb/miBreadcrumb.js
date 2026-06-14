import { loadTemplate } from "../loadTemplate.js";

const miBreadcrumbTemplate = await loadTemplate("./miBreadcrumb/miBreadcrumb.html");

class MiBreadcrumbItem extends HTMLElement {
  connectedCallback() {
    this.style.display = "none";
  }
}

customElements.define("mi-breadcrumb-item", MiBreadcrumbItem);

class MiBreadcrumb extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(miBreadcrumbTemplate.content.cloneNode(true));
    this._nav = this._shadow.querySelector("nav");
  }

  connectedCallback() {
    this._render();

    this._observer = new MutationObserver(() => this._render());
    this._observer.observe(this, { childList: true, subtree: true, characterData: true });
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  _render() {
    this._nav.innerHTML = "";

    const items = [...this.querySelectorAll("mi-breadcrumb-item")];

    items.forEach((item, i) => {
      const isLast = i === items.length - 1;

      const el = document.createElement("span");
      el.textContent = item.textContent.trim();

      if (isLast) {
        el.className = "current";
      } else {
        el.className = "item";
        el.addEventListener("click", () => {
          this.dispatchEvent(new CustomEvent("breadcrumb-navigate", {
            bubbles: true,
            detail: { index: i },
          }));
        });
      }

      this._nav.appendChild(el);

      if (!isLast) {
        const sep = document.createElement("span");
        sep.className = "separator";
        sep.textContent = "›";
        this._nav.appendChild(sep);
      }
    });
  }
}

customElements.define("mi-breadcrumb", MiBreadcrumb);
