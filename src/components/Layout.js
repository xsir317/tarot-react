import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {

    return (
        <div className="app-container">
            <div className="content">
                <Outlet />
            </div>
            <nav className="tabs">
                <Link to="/">首页</Link>
                <Link to="/profile">我的</Link>
            </nav>
        </div>
    );
}