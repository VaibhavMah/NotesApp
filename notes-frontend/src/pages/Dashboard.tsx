import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
interface User {
  id: string;
  email: string;
  username: string;
}

interface Note {
  _id: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const navigate = useNavigate();

  // Fetch user info + notes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/auth/login");

        const resUser = await api.get<User>("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(resUser.data);

        const resNotes = await api.get<Note[]>("/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(resNotes.data);
      } catch (err) {
        console.error(err);
        navigate("/auth/login");
      }
    };
    fetchData();
  }, [navigate]);

  // Add note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    const token = localStorage.getItem("token");
    const res = await api.post<Note>(
      "/notes",
      { content: newNote },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNotes([...notes, res.data]);
    setNewNote("");
  };

  // Delete note
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    await api.delete(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(notes.filter((n) => n._id !== id));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
  <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
    <div className="w-full max-w-sm min-h-[40vh] flex flex-col">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center mb-6">
<h1 className="text-lg font-semibold flex items-center gap-2">
  {/* PNG Image */}
  <img
    src={logo}   // 👈 stored in public/images
    alt="Dashboard icon"
    className="h-6 w-6 object-contain"
  />

  {/* Text */}
  Dashboard
</h1>

        <button
          onClick={handleLogout}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          Sign Out
        </button>
      </div>

      {/* User Card */}
      {user && (
        <div className="w-full bg-white shadow-md rounded-2xl p-4 mb-6">
          <h2 className="text-lg font-semibold">
            Welcome, {user.username} !
          </h2>
          <p className="text-gray-500 text-sm">Email: {user.email}</p>
        </div>
      )}

      {/* Create Note */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter new note..."
          className="flex-1 border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddNote}
          className="px-4 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition text-sm font-medium"
        >
          Create
        </button>
      </div>

      {/* Notes */}
      <h3 className="font-semibold text-base mb-3">Notes</h3>
      <div className="flex flex-col gap-3 flex-1">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center bg-white p-3 rounded-xl shadow-md"
            >
              <span className="text-gray-700 text-sm">{note.content}</span>
              <button
                onClick={() => handleDelete(note._id)}
                className="text-gray-500 hover:text-red-500 transition"
              >
                🗑️
              </button>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            No notes yet...
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
