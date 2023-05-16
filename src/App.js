import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Upload from "./components/pages/Upload";
import Message from "./components/layout/Message";

function App() {
  return (
    <Router>
      <Message />
      <Routes>
        <Route exact path="/" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
