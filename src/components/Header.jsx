import React from 'react';
import { Notebook, Sun, Moon } from 'lucide-react';

export const Header = ({ theme, toggleTheme }) => {
    return (
        <header className="header-card">
            <div className="brand-section">
                <div className="brand-icon-wrapper">
                    <Notebook size={28} />
                </div>
                <div className="brand-text">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h1>Notes Manager</h1>
                        <span className="badge-tag">React</span>
                    </div>
                    <p>Interactive note workspace with dynamic state & note management</p>
                </div>
            </div>

            <div className="header-actions">
                <button
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
        </header>
    );
};

