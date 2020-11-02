import React from "react";
import { Link } from "react-router-dom";

export const RecentBlog = (props) => {
  return (
    <Link to={`/blog/${props.id}`}>
      <div className="post-box-recent">
        <img
          className="img-fluid"
          src={`http://localhost:4000/${props.image}`}
        />
        <h6>{props.title}</h6>
      </div>
    </Link>
  );
};
