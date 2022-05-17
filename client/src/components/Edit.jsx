import React, { useState } from "react";
import axios from "axios";
import Page2 from "./Page2";
import {useParams} from "react-router-dom";

const baseURL = "http://localhost:5000/inputs/";

function Edit(props){
    const { id } = useParams();
    // let {slug} = useParams();

    const [inputEdit, setFinalInputEdit] = useState([{title: "", content: ""}]);

    const [inputImageEdit, setInputImageEdit] = useState({
        imageFile: ""
      });

    React.useEffect(() => {
        axios.get(`http://localhost:5000/inputs/${id}`)
        .then((response) => {
          if(response.data.length > 0){
          setFinalInputEdit(response.data);
          setInputImageEdit(response.data.imageFile);
          }
        });
      }, [id]);


    function handleChange(event) {
        const { name, value } = event.target;
        setFinalInputEdit((prevValue) => {
            return { ...prevValue, [name]: value };
        });
    }

    function handleChangeImage(event){
        setInputImageEdit(event.target.files[0]);
    }

    function handleClick(event) {
        event.preventDefault();
        // props.onAdd(inputEdit, inputImage);
        const formData = new FormData();
        formData.append("title", inputEdit.title);
        formData.append("content", inputEdit.content);
        formData.append("imageFile", inputImageEdit);

        // props.match.params.id
    
        axios.post(`http://localhost:5000/inputs/update/${id}`, formData)
        .then(res => setFinalInputEdit(res.data))
        .catch((error) => console.log(error));
    
        // setFinalInput(input);
        // props.onAddImage(imageFile);
        setFinalInputEdit({ title: "", content: ""});
        setInputImageEdit({imageFile: ""});
        window.location = '/';
    }

    return(
    <div>
        <form className="img-tag" encType="multipart/form-data">
            <input
            onChange={handleChange}
            name="title"
            placeholder="New Title"
            value={inputEdit.title}
            />
            <textarea
            onChange={handleChange}
            value={inputEdit.content}
            name="content"
            placeholder="New Content"
            rows="3"
            />
            <input
            onChange={handleChangeImage}
            type="file"
            filename="imageFile"
            placeholder="New Picture"
            />
            <button onClick={handleClick}>Add</button>
        </form>
        {/* <h1>Edit of { id } Page</h1> */}
        {/* {inputEdit.map((eachInput, index) => {
        return <Page2 title={eachInput.title} content={eachInput.content} img={`uploads/${eachInput.imageFile}`} id={eachInput._id} key={eachInput._id} />;
      })} */}
    </div>
    );
}

export default Edit;