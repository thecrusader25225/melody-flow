import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Library from "./Library";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen h-screen">
          <div className="fixed top-0 left-0  border-b border-black  h-16 w-full shadow-xl"></div>
          <div className="fixed top-0 left-0 border-black border-r h-full w-16 toggle-visibility shadow-right"></div>

          <div className="  w-full h-full ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
