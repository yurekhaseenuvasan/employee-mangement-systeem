import React from "react";

const ErrorComponent   = ({status,message}) => {
  console.log({status,message});
  return (
   
    status && message && (
      <div className="container text-center mt-5">
        {status === "SERVER DOWN" && <img src="https://cdn-icons-png.flaticon.com/512/11119/11119952.png" className="err-img" alt="Server Down" />}
          <h2 className="text-bold mt-2">{status}</h2>
          <p className="font-italic">{message}</p>
      </div>
    
      )
  );
};

export default ErrorComponent;
