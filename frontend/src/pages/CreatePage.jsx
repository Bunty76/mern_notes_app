import React from 'react'
import toast from 'react-hot-toast'

const CreatePage = () => {
  return (
    <div>
      <button
        className="btn btn-active btn-secondary"
        onClick={() => toast.success("success")}
      >
        click me{" "}
      </button>
      hellow
    </div>
  );
}

export default CreatePage
