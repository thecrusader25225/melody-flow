import { FaMusic } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Library() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const songs = query.get("songs");
  const addedSongs = songs ? JSON.parse(decodeURIComponent(songs)) : [];

  console.log("Received songs in Library:", addedSongs);

  return (
    <div className="w-full h-full flex flex-row bg-gradient-to-tl from-slate-900 via-fuchsia-900 to-slate-900 adjustible-padding ">
      <div className="w-3/4 h-full flex flex-col bg-gradient-to-r from-violet-400 via-fuchsia-100 to-purple-400 bg-clip-text text-transparent  px-8 py-4">
        <span className="flex justify-between">
          <p className="text-2xl font-bold font-mono ">Library Page</p>
          <Link to="/" state={{ addedSongs }}>
            <button>Back</button>
          </Link>
        </span>
        {addedSongs.length === 0 ? (
          <p>No songs added yet.</p>
        ) : (
          <div>
            {addedSongs.map((song, index) => (
              <div key={index} className="flex flex-col">
                <div className=" border"> </div>
                <button className=" p-4 text-left flex items-center hover:bg-white hover:bg-opacity-5  ">
                  <FaMusic className="text-black " />
                  <p className="pl-2">{song.name}</p>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="player w-1/3 h-full px-8 py-4 shadow-left"></div>
    </div>
  );
}
