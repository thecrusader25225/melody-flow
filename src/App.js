import Home from "./Home";
import { useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [page, setPage] = useState("Liked");
  const [themes, setThemes] = useState(0);
  return (
    <>
      <div className="w-screen h-screen text-white">
        <Navbar
          themes={themes}
          setThemes={setThemes}
          page={page}
          setPage={setPage}
        />
        <Home page={page} themes={themes} />
      </div>
    </>
  );
}

export default App;
