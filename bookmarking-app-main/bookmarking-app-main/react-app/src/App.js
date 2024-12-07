import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateBookmark from "./pages/CreateBookmark";
import UpdateBookmark from "./pages/UpdateBookmark";
import DeleteBookmark from "./pages/DeleteBookmark";
import ViewBookmark from "./pages/ViewBookmark";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Bookmarking App
            </Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/create">
                Create Bookmark
              </Link>
              <Link className="nav-link" to="/view">
                View Bookmarks
              </Link>
              <Link className="nav-link" to="/update">
                Update Bookmark
              </Link>
              <Link className="nav-link" to="/delete">
                Delete Bookmark
              </Link>
            </div>
          </div>
        </nav>

        <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <div className="text-center">
            <Routes>
              <Route path="/" element={<h2>Welcome to the Bookmarking App</h2>} />
              <Route path="/create" element={<CreateBookmark />} />
              <Route path="/view" element={<ViewBookmark />} />
              <Route path="/update" element={<UpdateBookmark />} />
              <Route path="/delete" element={<DeleteBookmark />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
