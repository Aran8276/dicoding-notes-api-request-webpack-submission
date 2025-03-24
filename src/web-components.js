import { deleteNote, fetchNotes, postNote } from "./server-actions.js";
import { formStyle, itemStyle, listStyle, loaderStyle } from "./style-list";

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
    this.shadowRoot.addEventListener("click", (e) => {
      if (e.target.closest("button")) {
        this.delete();
      }
    });
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
              <button>
                <span class="transition"></span>
                <span class="gradient"></span>
                <span class="label">Hapus</span>
              </button>
            </div>
          `;
  }

  delete() {
    this.dispatchEvent(
      new CustomEvent("delete-note", {
        detail: { id: this._note.id },
        bubbles: true,
        composed: true
      })
    );
  }
}

// buat web component class utk semacam container yg menampung noteitem disini
class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notes = [];
    this.loading = false;
  }

  async connectedCallback() {
    await this.getNotes();
  }

  render() {
    this.shadowRoot.innerHTML = `
        ${listStyle}
        <div class="notes-grid"></div>
        <loading-indicator id="loading"></loading-indicator>
      `;

    const loader = this.shadowRoot.getElementById("loading");
    loader.style.display = this.loading ? "block" : "none";

    const container = this.shadowRoot.querySelector(".notes-grid");
    container.innerHTML = "";
    this.notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.note = note;
      noteItem.addEventListener("delete-note", this.handleDelete.bind(this));
      container.appendChild(noteItem);
    });
  }

  async handleDelete(e) {
    this.loading = true;
    this.render();
    try {
      await deleteNote(e.detail.id);
      await this.getNotes();
    } finally {
      this.loading = false;
      this.render();
    }
  }

  async getNotes() {
    this.loading = true;
    this.render();
    try {
      const notes = await fetchNotes();
      this.notes = [...notes];
    } finally {
      this.loading = false;
      this.render();
    }
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

      postNote(newNote.title, newNote.body);

      // const noteList = document.querySelector("note-list");
      // noteList.addNote(newNote);
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

// buat loader
class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        ${loaderStyle}
        <div class="loader"></div>
      `;
  }
}

export { NoteForm, NoteItem, NoteList, LoadingIndicator };
