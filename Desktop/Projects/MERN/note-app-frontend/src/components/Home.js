import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

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
    <div className="container mx-auto mt-12 p-4">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800">
        Notes
      </h1>
      <div className="flex justify-end mb-6">
        <Link
          to="/add"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow-md transition"
        >
          Add Note
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {note.title}
            </h2>
            <p className="text-gray-600 mb-4">{note.content}</p>
            <div className="flex justify-between">
              <Link
                to={`/edit/${note.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition"
              >
                Update
              </Link>
              <button
                onClick={() => deleteNote(note.id)}
                className="bg-red-500 hover:bg-red-600 transition text-white  px-4 py-2 rounded shadow-md "
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
