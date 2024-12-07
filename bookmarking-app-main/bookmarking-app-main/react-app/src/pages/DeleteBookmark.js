import React, { useState } from "react";
import bookmarkingApi from "../APIs/bookmarkingApi";

const DeleteBookmark = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await bookmarkingApi.delete(id);
      setMessage("Bookmark deleted successfully!");
    } catch (error) {
      setMessage("Error deleting bookmark.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Delete Bookmark</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              Bookmark ID
            </label>
            <input
              type="text"
              id="id"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <button onClick={handleDelete} className="btn btn-danger w-100">
            Delete
          </button>
        </div>
      </div>
      {message && (
        <div className="alert alert-info text-center mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default DeleteBookmark;
