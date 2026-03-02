import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import axios from "axios";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    const feachData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");
        console.log(res.data);
      } catch (error) {
        console.log("err in fetching",error);
      }
    };
    feachData();
  }, []);
  return (
    <div>
     <Navbar/>
    </div>
  )
}

export default HomePage;
