import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ServiceHomeList(props) {
  useEffect(() => {}, []);
  return (
    <div className="col-md-6 col-sm-6 col-lg-3">
      <Link to={`/service/${props.id}`}>
        <div className="post-box">
          <div className="post-img">
            <img
              className="img-fluid"
              src={`http://localhost:4000/${props.image}`}
            />
          </div>
          <div className="post-info">
            <h3>{props.title}</h3>
            {/* <p>{props.short_description}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
