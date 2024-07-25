import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the notes!", error);
      });
  }, []);

  const deleteNote = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the note!", error);
      });
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Notes</h1>
      <div className="flex justify-end mb-4">
        <Link
          to="/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Add Note
        </Link>
      </div>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li
            key={note.id}
            className="bg-white shadow-md rounded p-4 flex justify-between items-center transition hover:shadow-lg"
          >
            <Link
              to={`/edit/${note.id}`}
              className="text-xl font-semibold text-gray-800 hover:text-gray-900"
            >
              {note.title}
            </Link>
            <button
              onClick={() => deleteNote(note.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
