import React, { useState } from "react";
import bookmarkingApi from "../APIs/bookmarkingApi";

const UpdateBookmark = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookmarkingApi.update({ id, title, link });
      setMessage("Bookmark updated successfully!");
    } catch (error) {
      setMessage("Error updating bookmark.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Update Bookmark</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="link" className="form-label">
                Link
              </label>
              <input
                type="text"
                id="link"
                className="form-control"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-warning w-100">
              Update
            </button>
          </form>
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

export default UpdateBookmark;
