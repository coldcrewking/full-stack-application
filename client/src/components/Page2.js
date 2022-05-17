import React from 'react';
import { Link } from 'react-router-dom';

function Page2(props) {
    return (
      <div className="img-tag">
        <img id="image" src={props.img} alt="..." />
        <h4>{props.title}</h4>
        <p>{props.content}</p>
        <button onClick={() => {props.onDelete(props.id)}}>Delete</button>
        <Link to={{pathname: `/edit/${props.id}`}}><button>Edit</button></Link>
      </div>
    );
  }
  
  export default Page2;
  