import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, X, Clock, AlertCircle, UserPlus, FileText, CheckCircle } from 'lucide-react';

const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle size={16} style={{ color: '#10b981' }} />;
            case 'warning':
                return <AlertCircle size={16} style={{ color: '#f59e0b' }} />;
            case 'info':
                return <FileText size={16} style={{ color: '#3b82f6' }} />;
            case 'user':
                return <UserPlus size={16} style={{ color: '#8b5cf6' }} />;
            default:
                return <Bell size={16} style={{ color: 'var(--text-muted)' }} />;
        }
    };

    return (
        <div 
            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            style={{
                padding: '0.75rem',
                borderBottom: '1px solid var(--border-subtle)',
                transition: 'all 0.2s',
                cursor: 'pointer',
                backgroundColor: notification.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notification.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)'}
        >
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                <div style={{ 
                    padding: '0.5rem', 
                    borderRadius: 'var(--radius-md)', 
                    background: 'var(--bg-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    {getIcon(notification.type)}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.25rem' }}>
                        <h4 style={{ 
                            fontSize: '0.875rem', 
                            fontWeight: 600, 
                            color: 'var(--text-main)',
                            margin: 0
                        }}>
                            {notification.title}
                        </h4>
                        {!notification.read && (
                            <div style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary)',
                                flexShrink: 0,
                                marginLeft: '0.5rem'
                            }} />
                        )}
                    </div>
                    
                    <p style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--text-muted)', 
                        margin: '0.25rem 0',
                        lineHeight: 1.5
                    }}>
                        {notification.message}
                    </p>
                    
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        marginTop: '0.5rem'
                    }}>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.25rem',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)'
                        }}>
                            <Clock size={12} />
                            {notification.time}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                            {!notification.read && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMarkRead(notification.id);
                                    }}
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        fontSize: '0.75rem',
                                        background: 'transparent',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'var(--text-muted)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                        e.currentTarget.style.color = 'var(--primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                                        e.currentTarget.style.color = 'var(--text-muted)';
                                    }}
                                >
                                    <Check size={12} />
                                    标记已读
                                </button>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(notification.id);
                                }}
                                style={{
                                    padding: '0.25rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#f43f5e'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Notification = ({ notifications: initialNotifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications || []);
    const dropdownRef = useRef(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleMarkRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const handleDelete = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleClearAll = () => {
        setNotifications([]);
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '0.5rem',
                    transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        minWidth: 18,
                        height: 18,
                        background: 'var(--accent)',
                        borderRadius: '999px',
                        border: '2px solid var(--bg-panel)',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 4px'
                    }}>
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div
                    className="notification-dropdown"
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.5rem)',
                        right: 0,
                        width: 380,
                        maxHeight: 500,
                        background: 'var(--bg-panel)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-lg)',
                        zIndex: 1000,
                        overflow: 'hidden',
                        animation: 'fadeIn 0.2s ease-out'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid var(--border-subtle)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h3 style={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: 'var(--text-main)',
                                margin: 0
                            }}>
                                通知中心
                            </h3>
                            <p style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                margin: '0.25rem 0 0 0'
                            }}>
                                {unreadCount > 0 ? `你有 ${unreadCount} 条未读消息` : '所有消息已读'}
                            </p>
                        </div>
                        {notifications.length > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                style={{
                                    padding: '0.375rem 0.75rem',
                                    fontSize: '0.75rem',
                                    background: 'var(--bg-hover)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-main)',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--primary)';
                                    e.currentTarget.style.color = 'white';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'var(--bg-hover)';
                                    e.currentTarget.style.color = 'var(--text-main)';
                                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                                }}
                            >
                                全部已读
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div style={{
                        maxHeight: 400,
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}>
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onMarkRead={handleMarkRead}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <div style={{
                                padding: '3rem 1rem',
                                textAlign: 'center',
                                color: 'var(--text-muted)'
                            }}>
                                <Bell size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                <p style={{ fontSize: '0.875rem', margin: 0 }}>暂无通知</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div style={{
                            padding: '0.75rem 1rem',
                            borderTop: '1px solid var(--border-subtle)',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={handleClearAll}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    fontSize: '0.875rem',
                                    background: 'transparent',
                                    border: '1px dashed var(--border-subtle)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#f43f5e';
                                    e.currentTarget.style.color = '#f43f5e';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                                    e.currentTarget.style.color = 'var(--text-muted)';
                                }}
                            >
                                清空所有通知
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notification;
