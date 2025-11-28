import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, User, Settings, Bell, Search, LogOut, BarChart3, Moon, Sun } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`sidebar-item ${active ? 'active' : ''}`}
    >
        <Icon size={18} />
        <span>{label}</span>
    </div>
);

const Layout = ({ children, activeTab, onTabChange }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="app-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-box">
                        <BarChart3 size={24} />
                    </div>
                    <span className="logo-text">
                        考勤管理系统
                    </span>
                </div>

                <nav className="sidebar-nav">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="概览"
                        active={activeTab === 'dashboard'}
                        onClick={() => onTabChange('dashboard')}
                    />
                    <SidebarItem
                        icon={Users}
                        label="考勤管理"
                        active={activeTab === 'attendance'}
                        onClick={() => onTabChange('attendance')}
                    />
                    <SidebarItem
                        icon={User}
                        label="员工列表"
                        active={activeTab === 'employees'}
                        onClick={() => onTabChange('employees')}
                    />
                    <SidebarItem
                        icon={Settings}
                        label="系统设置"
                        active={activeTab === 'settings'}
                        onClick={() => onTabChange('settings')}
                    />
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-item">
                        <LogOut size={18} />
                        <span>退出登录</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <div className="bg-grid" />
                <div className="bg-glow glow-1" />
                <div className="bg-glow glow-2" />

                {/* Header */}
                <header className="top-header">
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
                        {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                    </div>

                    <div className="header-actions">
                        <div className="search-bar">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                placeholder="搜索..."
                                className="search-input"
                            />
                        </div>

                        <button className="theme-toggle" onClick={toggleTheme}>
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', position: 'relative', padding: '0.5rem' }}>
                            <Bell size={20} />
                            <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', border: '2px solid var(--bg-panel)' }} />
                        </button>

                        <div className="user-menu">
                            <div style={{ textAlign: 'right', display: 'none' }} className="md-block">
                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>管理员</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>HR 经理</div>
                            </div>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(to top right, var(--primary), var(--accent))', border: '1px solid var(--border-subtle)' }} />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="page-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
