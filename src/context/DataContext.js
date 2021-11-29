import { useState, useEffect, createContext } from "react";

import api from "../api/posts";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
  console.log(posts);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        posts,
        setPosts,
        // handleDelete,
        fetchError,
        setFetchError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
