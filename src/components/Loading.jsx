import React from 'react'

const Loading = ({ loading }) => {
  return (
    loading && <div className="text-center"><img src="https://miro.medium.com/v2/resize:fit:2000/1*F_5AEXIfr1AXuShXhYT4zg.gif" alt="Loading..." className="img-fluid w-50" /></div>
  )
}


export default Loading;