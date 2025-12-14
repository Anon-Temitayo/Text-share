import { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import "./App.css";


function Home() {
  const [text, setText] = useState("");
  const nav  = useNavigate();

  const link = () => {
    if (!text.trim()) return alert("Type something first!");
    const id = Date.now(); 
    localStorage.setItem(id, text); 
    nav(`/share/${id}`);
  };

  return (
    <div className="container">
      <h1>Cross-Share</h1>
      <textarea
        className="input"
        placeholder="Paste or type text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn" onClick={link}>
        Generate Link
      </button>

      
        
        
      </div>
    
  );
}


function Share() {
  const { id } = useParams();
  const text = localStorage.getItem(id) || "Nothing to share";

  const copyText = async () => {
    if (!text) return alert("Nothing to copy");
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <div className="container">
      <h1>Shared Text</h1>
      <textarea className="input" value={text} readOnly />
      <button className="btn" onClick={copyText}>
        Copy
      </button>
    </div>
  );
}


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/share/:id" element={<Share />} />
    </Routes>
  );
}
