import React from "react";
import { Link } from "react-router-dom";
const Breadcrumb = ({items}) => {

  return (
    <div className="breadcrumb">
        {items.map((item, index) => {
           return(
            <React.Fragment key={index}>
              {item.path?<Link to ={item.path}>{item.label}</Link>:<span className="breadcrumb-current">{item.label}</span>}
              {index < items.length - 1 && <span className="mx-2">/</span>}
            </React.Fragment>
           )
        })}
    </div>
  );
};
export default Breadcrumb;
