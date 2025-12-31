export let el: {
  setup: Record<string, Function>;
  update: Record<string, Function>;
} = {
  setup: {},
  update: {},
};

export class ElementWrapper {
  el: HTMLElement | null;

  constructor(el: string) {
    this.el = document.getElementById(el);
  }

  setText(text: string) {
    if (this.el) this.el.textContent = text;
  }

  static setText(el: string, text: string) {
    new ElementWrapper(el).setText(text);
  }

  setHTML(html: string) {
    if (this.el) this.el.innerHTML = html;
  }

  static setHTML(el: string, text: string) {
    new ElementWrapper(el).setHTML(text);
  }

  onClick(func: () => void) {
    if (this.el) this.el.onclick = func;
  }

  static onClick(el: string, func: () => void) {
    new ElementWrapper(el).onClick(func);
  }

  hide() {
    if (this.el) this.el.style.display = "none";
  }

  static hide(el: string) {
    new ElementWrapper(el).hide();
  }

  block() {
    if (this.el) this.el.style.display = "block";
  }

  static block(el: string) {
    new ElementWrapper(el).block();
  }
}

export function updateHTML() {
  for (let x in el.update) el.update[x]();
}
