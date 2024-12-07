import React, { useState } from "react";
import bookmarkingApi from "../APIs/bookmarkingApi";

const ViewBookmark = () => {
  const [id, setId] = useState("");
  const [bookmark, setBookmark] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [message, setMessage] = useState("");

  const handleViewOne = async () => {
    try {
      const response = await bookmarkingApi.getOne(id);
      setBookmark(response.data);
      setBookmarks([]); 
      setMessage("");
    } catch (error) {
      setMessage("Error fetching bookmark.");
    }
  };

  const handleViewAll = async () => {
    try {
      const response = await bookmarkingApi.getAll();
      setBookmarks(response.data);
      setBookmark(null); 
      setMessage("");
    } catch (error) {
      setMessage("Error fetching bookmarks.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">View Bookmarks</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center">View One Bookmark</h4>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter Bookmark ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
              <button
                className="btn btn-primary w-100"
                onClick={handleViewOne}
              >
                View One
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center">View All Bookmarks</h4>
              <button
                className="btn btn-success w-100"
                onClick={handleViewAll}
              >
                View All
              </button>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className="alert alert-danger text-center" role="alert">
          {message}
        </div>
      )}

      {bookmark && (
        <div className="card mt-4 shadow-sm">
          <div className="card-body">
            <h4 className="card-title">Bookmark Details</h4>
            <p><strong>ID:</strong> {bookmark.id}</p>
            <p><strong>Title:</strong> {bookmark.title}</p>
            <p><strong>Link:</strong> {bookmark.link}</p>
            <p><strong>Date Added:</strong> {bookmark.dateAdded}</p>
          </div>
        </div>
      )}

      {bookmarks.length > 0 && (
        <div className="card mt-4 shadow-sm">
          <div className="card-body">
            <h4 className="card-title">All Bookmarks</h4>
            <ul className="list-group">
              {bookmarks.map((bm) => (
                <li key={bm.id} className="list-group-item">
                  <strong>ID:</strong> {bm.id} | <strong>Title:</strong> {bm.title} | <strong>Link:</strong> {bm.link}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBookmark;
