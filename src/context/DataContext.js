import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/posts";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("posts");
        setPosts(response.data.post);
        setFetchError("");
      } catch (err) {
        if (!err.response) {
          setFetchError(err.message);
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

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

  // const handleNewPost = async (e) => {
  //   e.preventDefault();
  //   const datetime = format(new Date(), "MMMM dd, yyyy pp");
  //   const newPost = { title: postTitle, datetime: datetime, body: postBody };

  //   try {
  //     const response = await api.post("posts", newPost);
  //     const allPosts = [...posts, response.data.post];
  //     setPosts(allPosts);
  //     setPostTitle("");
  //     setPostBody("");
  //     setFetchError("");
  //     navigate("/");
  //   } catch (err) {
  //     setFetchError(err.message);
  //     console.log(`Error: ${err.message}`);
  //   }
  // };

  // const handleEdit = async (id) => {
  //   const datetime = format(new Date(), "MMMM dd, yyyy pp");
  //   const updatedPost = {
  //     title: editTitle,
  //     datetime: datetime,
  //     body: editBody,
  //   };
  //   try {
  //     const response = await api.put(`posts/${id}`, updatedPost);
  //     setPosts(
  //       posts.map((post) => (post.id === id ? { ...response.data.post } : post))
  //     );
  //     setEditTitle("");
  //     setEditBody("");
  //     navigate("/");
  //   } catch (err) {
  //     console.log(`Error: ${err.message}`);
  //   }
  // };

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        posts,
        setPosts,
        handleDelete,
        fetchError,
        setFetchError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
