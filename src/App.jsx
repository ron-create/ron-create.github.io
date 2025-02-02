import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AudioProvider } from "./AudioContext"; // Import the context
import ErrorPage from "./pages/Error";
import QuestionPage from "./pages/Question";
import DateIdeasPage from "./pages/DateIdeas";

export default function App() {
  return (
    <Router>
      <AudioProvider> {/* Move AudioProvider inside Router */}
        <Routes>
          <Route path="/" element={<ErrorPage />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/date-ideas" element={<DateIdeasPage />} />
        </Routes>
      </AudioProvider>
    </Router>
  );
}
