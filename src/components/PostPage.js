import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import DataContext from "../context/DataContext";
import api from "../api/posts";

function PostPage() {
  const { posts, setFetchError } = useContext(DataContext);
  let navigate = useNavigate();

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`);
      setFetchError("");
      navigate("/");
      window.location.reload(false);
    } catch (err) {
      setFetchError(err.message);
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <main className="PostPage">
      <article>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postDate">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
}

export default PostPage;
