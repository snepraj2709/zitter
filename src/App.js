import "./index.css";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="bg-gray-200 p-4 m-20">
      <h1 className="text-2xl font-bold">Zitter App</h1>
      <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Login
      </button>
    </div>
  );
}

export default App;
