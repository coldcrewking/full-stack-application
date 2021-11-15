import React, { useState } from "react";
import Brochure from "./Brochure";
import Header from "./Header";
import Page2 from "./Page2";
import axios from 'axios';
import React1 from "react";

const baseURL = "http://localhost:5000/inputs/";

function App() {
  const [finalInput, setFinalInput] = useState([]);

  React1.useEffect(() => {
    axios.get(baseURL)
    .then((response) => {
      if(response.data.length > 0){
      setFinalInput(response.data);
      }
    });
  }, []);

  function addItem(input, inputImage) {
    setFinalInput((prevValue) => {
      return [...prevValue, inputImage, input];
    });
    // const formData = new FormData();
    // formData.append("title", finalInput.title);
    // formData.append("content", finalInput.content);
    // formData.append("imageFile", finalInput.imageFile);

    // axios.post('http://localhost:5000/inputs/add', formData)
    //   .then(res => setFinalInput(res.data))
    //   .catch((error) => console.log(error));
  }

  function deleteItem(id){
    setFinalInput((finalInput) => {
      return finalInput.filter((currentFinalInput) => {
        return currentFinalInput._id !== id
      });
    });
    axios.delete(baseURL + id)
    .then(() => {
      console.log("Post has been deleted");
    });
  }
  
  return (
    <div>
      <Header />
      <Brochure onAdd={addItem} />
      {finalInput.map((eachInput, index) => {
        return <Page2 title={eachInput.title} content={eachInput.content} img={`uploads/${eachInput.imageFile}`} onDelete={deleteItem} id={eachInput._id} key={eachInput._id} />;
      })}
    </div>
  );
}

export default App;
