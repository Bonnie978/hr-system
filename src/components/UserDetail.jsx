import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { employees } from '../data/mockData';

const UserDetail = ({ userId, onBack }) => {
    const user = employees.find(e => e.id === userId) || employees[0];

    // Mock calendar days
    const calendarDays = Array.from({ length: 30 }, (_, i) => {
        const status = Math.random() > 0.8 ? 'Late' : Math.random() > 0.9 ? 'Absent' : 'Present';
        return { day: i + 1, status };
    });

    return (
        <div className="animate-fade-in">
            <button
                onClick={onBack}
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1rem' }}
            >
                <ArrowLeft size={20} />
                <span>返回列表</span>
            </button>

            {/* Profile Header */}
            <div className="linear-card" style={{ marginBottom: '1.5rem' }}>
                <div className="profile-header">
                    <div style={{ position: 'relative' }}>
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="profile-avatar"
                        />
                        <div style={{
                            position: 'absolute', bottom: 4, right: 4, width: 20, height: 20, borderRadius: '50%', border: '3px solid var(--bg-card)',
                            backgroundColor: user.status === 'Present' ? '#10b981' : user.status === 'Late' ? '#f59e0b' : '#f43f5e'
                        }} />
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{user.name}</h1>
                                <p style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 500, marginBottom: '1rem' }}>{user.role} • {user.department}</p>

                                <div className="profile-meta">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Mail size={16} />
                                        <span>{user.name.toLowerCase().replace(' ', '.')}@company.com</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Phone size={16} />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <MapPin size={16} />
                                        <span>北京总部</span>
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-primary">
                                编辑资料
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-section">
                {/* Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="linear-card">
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem' }}>本月概况</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-hover)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ padding: 8, borderRadius: 8, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <span style={{ color: 'var(--text-highlight)' }}>正常出勤</span>
                                </div>
                                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>22</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-hover)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ padding: 8, borderRadius: 8, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                                        <Clock size={20} />
                                    </div>
                                    <span style={{ color: 'var(--text-highlight)' }}>迟到</span>
                                </div>
                                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>3</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-hover)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ padding: 8, borderRadius: 8, background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}>
                                        <AlertCircle size={20} />
                                    </div>
                                    <span style={{ color: 'var(--text-highlight)' }}>缺勤</span>
                                </div>
                                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>1</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar */}
                <div className="linear-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>考勤日历</h3>
                        <div style={{ display: 'flex', gap: 12, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} /> 正常</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} /> 迟到</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f43f5e' }} /> 缺勤</span>
                        </div>
                    </div>

                    <div className="calendar-grid">
                        {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                            <div key={day} style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', padding: '0.5rem 0' }}>
                                {day}
                            </div>
                        ))}
                        {calendarDays.map((day, i) => (
                            <div
                                key={i}
                                className="calendar-day"
                                style={{
                                    backgroundColor: day.status === 'Present' ? 'rgba(16, 185, 129, 0.1)' : day.status === 'Late' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                                    color: day.status === 'Present' ? '#059669' : day.status === 'Late' ? '#d97706' : '#e11d48',
                                    fontWeight: day.status === 'Present' ? 500 : 600
                                }}
                            >
                                {day.day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
