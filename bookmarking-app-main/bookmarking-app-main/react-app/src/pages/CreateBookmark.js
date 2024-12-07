import React, { useState } from "react";
import bookmarkingApi from "../APIs/bookmarkingApi";

const CreateBookmark = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookmarkingApi.create({ title, link });
      setMessage("Bookmark created successfully!");
      setTitle("");
      setLink("");
    } catch (error) {
      setMessage("Error creating bookmark.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Create Bookmark</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
                required
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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Create
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

export default CreateBookmark;
