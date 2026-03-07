import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import HistoryPage from "./pages/PollHistoryPage"
import KickedPage from "./pages/KickedPage"
import StudentJoinPage from "./pages/StudentJoinPage"
import StudentWaitingPage from "./pages/StudentWaitingPage"
import StudentVotePage from "./pages/StudentVotePage"
import TeacherCreatePollPage from "./pages/TeacherCreatePollPage"
import TeacherLiveResultsPage from "./pages/TeacherLiveResultsPage"
import StudentResultPage from "./pages/StudentResultPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/student" element={<StudentJoinPage />} />
        <Route path="/kicked" element={<KickedPage />} />
        <Route path="/student/result" element={<StudentResultPage />} />
        <Route path="/student/vote" element={<StudentVotePage />} />
        <Route path="/student/wait" element={<StudentWaitingPage />} />
        <Route path="/teacher" element={<TeacherCreatePollPage />} />
        <Route path="/teacher/live" element={<TeacherLiveResultsPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App