import React, { useState } from 'react';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import UserProfile from './page/UserProfile';


const App = () => {
    const [currentPage, setCurrentPage] = useState('login');

    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <LoginPage />;
            case 'register':
                return <RegisterPage />;
            case 'profile':
                return <UserProfile />;
            default:
                return <div className="flex items-center justify-center min-h-screen bg-gray-100">Page not found</div>;
        }
    };

    return (
        <div>
            <nav className="flex justify-center p-4 bg-blue-500 text-white">
                <button
                    className="mx-2 px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100"
                    onClick={() => setCurrentPage('login')}
                >
                    Login
                </button>
                <button
                    className="mx-2 px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100"
                    onClick={() => setCurrentPage('register')}
                >
                    Register
                </button>
                <button
                    className="mx-2 px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100"
                    onClick={() => setCurrentPage('profile')}
                >
                    Profile
                </button>
            </nav>

            <main>{renderPage()}</main>
        </div>
    );
};

export default App;
