import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Favorites from './pages/Favorites';
import Notes from './pages/Notes';
import Share from './pages/Share';
import Preview from './pages/Share/Preview';
import Try from './pages/Try';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="notes" element={<Notes />} />
                    <Route path="share" element={<Share />} />
                    <Route path="share/preview" element={<Preview />} />
                    <Route path="about" element={<div>关于我们</div>} />
                    <Route path="terms" element={<div>使用条款</div>} />
                    <Route path="privacy" element={<div>隐私政策</div>} />
                </Route>
                <Route path="try" element={<Try />} />
            </Routes>
        </Router>
    );
}

export default App;