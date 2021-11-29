import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";

import DataContext from "../context/DataContext";
import api from "../api/posts";

function NewPost() {
  const { posts, setPosts, setFetchError } = useContext(DataContext);

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [underTenChar, setunderTenChar] = useState(true);
  let navigate = useNavigate();

  const minChar = (postBody) => {
    if (postBody.length > 10) setunderTenChar(false);
    else setunderTenChar(true);
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { title: postTitle, datetime: datetime, body: postBody };

    try {
      const response = await api.post("posts", newPost);
      const allPosts = [...posts, response.data.post];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      setFetchError("");
      navigate("/");
    } catch (err) {
      setFetchError(err.message);
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleNewPost}>
        <label htmlFor="postTitle">Title: </label>
        <input
          id="postTitle"
          type="text"
          required
          minLength={3}
          maxLength={40}
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        {underTenChar && (
          <p className="ErrorMinLetters">
            The text must be at least 10 characters long
          </p>
        )}

        <textarea
          id="postBody"
          required
          // placeholder={"Your text need to be 10 letters or more"}
          minLength={3}
          maxLength={4096}
          value={postBody}
          onChange={(e) => {
            minChar(postBody);
            setPostBody(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default NewPost;
