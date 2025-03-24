import _ from "lodash";
import * as css from "./style.css";
import { formStyle, itemStyle, listStyle } from "./style-list.js";
import { notesData } from "./data.js";

// buat web component class utk item atau butiran note nya disini
class NoteItem extends HTMLElement {
  // setter (menetapkan nilai)
  set note(value) {
    this._note = value;
    this.render();
  }

  // getter (mengambil nilai)
  get note() {
    return this._note;
  }

  // constructor / akan dijalankan sekali
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // methdod utk ngeluarin html nya disini (pakai shadowroot)
  render() {
    if (!this._note) {
      return;
    }
    const date = new Date(this._note.createdAt).toLocaleDateString();
    this.shadowRoot.innerHTML = `
          ${itemStyle}
          <div class="note">
            <h3>${this._note.title}</h3>
            <p>${this._note.body}</p>
            <small>${date}</small>
          </div>
        `;
  }
}

// buat web component class utk semacam container yg menampung noteitem disini
class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notes = [...notesData];
  }

  // ini akan dipanggil setelah component sudah masuk DOM, yaitu manggil method render()
  connectedCallback() {
    this.render();
  }

  // method render, mirip spt di NoteItem
  render() {
    this.shadowRoot.innerHTML = `
        ${listStyle}
          <div class="notes-grid"></div>
        `;

    const container = this.shadowRoot.querySelector(".notes-grid");
    this.notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.note = note;
      container.appendChild(noteItem);
    });
  }

  // method utk nambahin note baru, nti ini dipanggil lewat form note (NoteForm)
  addNote(note) {
    this.notes = [note, ...this.notes];
    this.render();
  }
}

// buat web component class utk form nya buat nambahin NoteItem ke NoteList
class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // method ini digunakan untuk menambahkan NoteItem baru ke NoteList dengan membaca inputan pada form
  attachSubmitEvent() {
    this.shadowRoot.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.shadowRoot.getElementById("title").value;
      const body = this.shadowRoot.getElementById("body").value;
      const newNote = {
        id: `notes-${Math.random().toString(36).substr(2, 9)}`,
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false
      };
      const noteList = document.querySelector("note-list");
      noteList.addNote(newNote);
      this.shadowRoot.querySelector("form").reset();
    });
  }

  // spt di NoteList, kepanggil setelah masuk ke dom
  connectedCallback() {
    // pertama manggil method render
    this.render();
    // kedua manggil method attachSubmitEvent
    this.attachSubmitEvent();
  }

  render() {
    this.shadowRoot.innerHTML = `
          ${formStyle}
          <form>
            <input type="text" id="title" placeholder="Title" required>
            <textarea id="body" placeholder="Body" rows="4" required></textarea>
            <button type="submit">Add Note</button>
          </form>
        `;
  }
}

customElements.define("note-item", NoteItem);
customElements.define("note-list", NoteList);
customElements.define("note-form", NoteForm);
