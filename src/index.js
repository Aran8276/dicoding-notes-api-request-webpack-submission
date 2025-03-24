import _ from "lodash";
import * as css from "./style.css";
import {
  LoadingIndicator,
  NoteForm,
  NoteItem,
  NoteList
} from "./web-components.js";

const init = () => {
  if (!customElements.get("note-item")) {
    customElements.define("note-item", NoteItem);
  }
  if (!customElements.get("note-list")) {
    customElements.define("note-list", NoteList);
  }
  if (!customElements.get("note-form")) {
    customElements.define("note-form", NoteForm);
  }
  if (!customElements.get("loading-indicator")) {
    customElements.define("loading-indicator", LoadingIndicator);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
