import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import axios from "axios";
import NoteCard from "../Components/NoteCard";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    const feachData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("err in fetching", error);
      }
    };
    feachData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
