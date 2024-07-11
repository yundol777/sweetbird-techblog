import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./routes/Main.js"; // 확장자를 추가합니다.

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main/>} />
            </Routes>
        </Router>
    );
}

export default App;
