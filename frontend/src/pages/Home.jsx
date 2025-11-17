import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notes`
        );
        console.log(res.data);
      } catch (error) {
        console.log("feching data in come error,", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      Home
    </>
  );
}

export default Home;
