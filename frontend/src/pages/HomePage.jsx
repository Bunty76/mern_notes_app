import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import axiosInstance from "../lib/axios";
import NoteCard from "../Components/NoteCard";
import NotesNotFound from "../Components/NotesNotFound";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const feachData = async () => {
      try {
        const res = await axiosInstance.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log("err in fetching", error);
      }
    };
    feachData();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
        {notes.length === 0 && <NotesNotFound />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
