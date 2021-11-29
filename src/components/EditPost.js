import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import DataContext from "../context/DataContext";
import api from "../api/posts";

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);

  let navigate = useNavigate();

  const { id } = useParams();

  const post = posts.find((post) => post._id === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const [underTenChar, setunderTenChar] = useState(false);
  const minChar = (editBody) => {
    if (editBody.length > 10) setunderTenChar(false);
    else setunderTenChar(true);
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      title: editTitle,
      datetime: datetime,
      body: editBody,
    };
    try {
      const response = await api.put(`posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) =>
          post._id === id ? { ...response.data.post } : post
        )
      );
      setEditTitle("");
      setEditBody("");
      navigate(`/post/${id}`);
      // window.location.reload(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              minLength={3}
              maxLength={40}
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            {underTenChar && (
              <p className="ErrorMinLetters">
                The text must be at least 10 characters long
              </p>
            )}
            <textarea
              id="postBody"
              minLength="10"
              maxLength={4096}
              required
              value={editBody}
              onChange={(e) => {
                minChar(editBody);
                setEditBody(e.target.value);
              }}
            />
            <button type="submit" onClick={() => handleEdit(post._id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
