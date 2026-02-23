import React from "react";

const ErrorComponent   = ({error}) => {
  console.log(error);
  return (
   
    error && (
      <div className="container text-center mt-5">
        {error.status === "SERVER DOWN" && <img src="https://cdn-icons-png.flaticon.com/512/11119/11119952.png" className="err-img" alt="Server Down" />}
          <h2 className="text-bold mt-2">{error.status}</h2>
          <p className="font-italic">{error.message}</p>
      </div>
    
      )
  );
};

export default ErrorComponent;
