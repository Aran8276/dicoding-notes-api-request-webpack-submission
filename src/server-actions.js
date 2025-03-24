// function utk mendapatkan notes dari api
const fetchNotes = async () => {
  try {
    /**
     * @type{RequestInit}
     */
    const fetchConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = fetch("https://notes-api.dicoding.dev/v2/notes", fetchConfig);
    const data = (await res).json();

    console.log(await data);

    return (await data).data;
  } catch (error) {
    alert(`Terjadi Kesalahan:\n${JSON.stringify(error, null, 2)}`);
  }
};

/**
 * function utk menambahkan notes ke api
 * @param {string} title
 * @param {string} body
 * @returns {Promise<any>}
 */
const postNote = async (title, body) => {
  try {
    /**
     * @type{RequestInit}
     */
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = fetch("https://notes-api.dicoding.dev/v2/notes", fetchConfig);
    const data = (await res).json();

    alert((await data).message);
    // alert(JSON.stringify(await data, null, 2));

    return (await data).data;
  } catch (error) {
    alert(`Terjadi Kesalahan:\n${JSON.stringify(error, null, 2)}`);
  } finally {
    const noteList = document.querySelector("note-list");
    await noteList.getNotes();
  }
};

/**
 * function utk menambahkan notes ke api
 * @param {string} id
 * @returns {Promise<any>}
 */
const deleteNote = async (id) => {
  try {
    /**
     * @type{RequestInit}
     */
    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}`,
      fetchConfig
    );
    const data = (await res).json();

    alert((await data).message);
    // alert(JSON.stringify(await data, null, 2));

    return (await data).data;
  } catch (error) {
    alert(`Terjadi Kesalahan:\n${JSON.stringify(error, null, 2)}`);
  } finally {
    const noteList = document.querySelector("note-list");
    await noteList.getNotes();
  }
};

export { fetchNotes, postNote, deleteNote };
