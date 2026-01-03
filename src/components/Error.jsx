import React from "react";

const Error = (error) => {
  return (
   
    error && (
      <div className="card w-50 text-center mx-auto bg-danger text-white text-bold mt-5 error-card">
        <div className="card-body">{error.message}</div>
      </div>
    )
  );
};

export default Error;
