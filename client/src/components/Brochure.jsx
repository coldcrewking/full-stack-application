import React, { useState } from "react";
import axios from "axios";

function Brochure(props) {
  const [input, setInput] = useState({
    title: "",
    content: ""
  });

  const [inputImage, setInputImage] = useState({
    imageFile: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleChangeImage(event){
    setInputImage(event.target.files[0]);
  }

  // function handleChangeImage(event){
  //   setInput({imageFile: event.target.files[0]});
  // }

  function handleClick(event) {
    // event.preventDefault();
    props.onAdd(input, inputImage);
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("content", input.content);
    formData.append("imageFile", inputImage);

    axios.post('http://localhost:5000/inputs/add', formData)
    .then(res => setInput(res.data))
    .catch((error) => console.log(error));

    // setFinalInput(input);
    // props.onAddImage(imageFile);
    setInput({ title: "", content: ""});
    setInputImage({imageFile: ""});
  }

  return (
    <form encType="multipart/form-data">
      <input
        onChange={handleChange}
        name="title"
        placeholder="Title"
        value={input.title}
      />
      <textarea
        onChange={handleChange}
        value={input.content}
        name="content"
        placeholder="Give your photo a caption!!!"
        rows="3"
      />
      <input
        onChange={handleChangeImage}
        type="file"
        name="imageFile"
        placeholder="Upload a photo"
        accept="image/png, image/jpeg"
      />
      <button onClick={handleClick}>Add</button>
    </form>
  );
}

export default Brochure;
