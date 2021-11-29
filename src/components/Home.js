import { useContext } from "react";

import DataContext from "../context/DataContext";
import Feed from "./Feed";

function Home() {
  const { searchResults, fetchError } = useContext(DataContext);
  return (
    <main className="Home">
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
      {!fetchError &&
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p style={{ marginTop: "2rem" }}>No posts to display.</p>
        ))}
    </main>
  );
}

export default Home;
