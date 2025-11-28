import React from 'react';
import {
    Users,
    Clock,
    AlertCircle,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { stats, attendanceTrend, recentActivity } from '../data/mockData';

const StatCard = ({ title, value, subtext, icon: Icon, trend, color }) => {
    // Helper to map color names to hex for inline styles
    const getColor = (c) => {
        if (c.includes('indigo')) return '#3b82f6'; // Tech Blue
        if (c.includes('emerald')) return '#10b981';
        if (c.includes('amber')) return '#f59e0b';
        if (c.includes('rose')) return '#f43f5e';
        return '#94a3b8';
    };

    const themeColor = getColor(color);

    // Determine trend color and icon
    let trendColor = '#94a3b8';
    let trendBg = 'rgba(148, 163, 184, 0.1)';
    let TrendIcon = null;
    let trendText = '持平';

    if (trend > 0) {
        trendColor = '#10b981';
        trendBg = 'rgba(16, 185, 129, 0.1)';
        TrendIcon = ArrowUpRight;
        trendText = `${Math.abs(trend)}%`;
    } else if (trend < 0) {
        trendColor = '#f43f5e';
        trendBg = 'rgba(244, 63, 94, 0.1)';
        TrendIcon = ArrowDownRight;
        trendText = `${Math.abs(trend)}%`;
    } else {
        // trend === 0
        trendText = '-';
    }

    return (
        <div className="linear-card" style={{ overflow: 'hidden' }}>
            {/* Decorative Watermark Icon */}
            <div style={{
                position: 'absolute',
                right: -10,
                bottom: -10,
                opacity: 0.05,
                transform: 'rotate(-15deg)',
                pointerEvents: 'none',
                color: themeColor
            }}>
                <Icon size={100} />
            </div>

            <div className="stat-card-header">
                <div className="stat-icon-box" style={{ color: themeColor }}>
                    <Icon size={20} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: trendColor,
                    backgroundColor: trendBg,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    minWidth: '60px',
                    justifyContent: 'center',
                    backdropFilter: 'blur(4px)'
                }}>
                    {TrendIcon && <TrendIcon size={14} />}
                    {trendText}
                </div>
            </div>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, marginBottom: 4, position: 'relative' }}>{title}</h3>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 4, position: 'relative', letterSpacing: '-0.03em' }}>{value}</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', position: 'relative' }}>{subtext}</p>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-bg-decoration" />
                <div className="hero-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
                                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Sparkles size={12} />
                                    今日概览
                                </span>
                            </div>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>早上好，管理员</h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px' }}>
                                今天是 {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}。
                                目前出勤率达到 <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{stats.attendanceRate}%</span>，整体状况良好。
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button className="btn btn-secondary">
                                下载报表
                            </button>
                            <button className="btn btn-primary">
                                实时监控
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="dashboard-grid">
                <StatCard
                    title="员工总数"
                    value={stats.totalEmployees}
                    subtext="在职员工"
                    icon={Users}
                    trend={2.5}
                    color="text-indigo-400"
                />
                <StatCard
                    title="今日出勤"
                    value={stats.onTime}
                    subtext={`占总人数 ${Math.round((stats.onTime / stats.totalEmployees) * 100)}%`}
                    icon={CheckCircle2}
                    trend={1.2}
                    color="text-emerald-400"
                />
                <StatCard
                    title="迟到人数"
                    value={stats.late}
                    subtext="较昨日增加 2 人"
                    icon={Clock}
                    trend={-0.8}
                    color="text-amber-400"
                />
                <StatCard
                    title="缺勤人数"
                    value={stats.absent}
                    subtext="请假及旷工"
                    icon={AlertCircle}
                    trend={0}
                    color="text-rose-400"
                />
            </div>

            {/* Charts & Activity Section */}
            <div className="charts-section">
                {/* Main Chart */}
                <div className="linear-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>考勤趋势</h2>
                        <select style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
                            <option>本周</option>
                            <option>上周</option>
                            <option>本月</option>
                        </select>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={attendanceTrend}>
                                <defs>
                                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                                <XAxis
                                    dataKey="day"
                                    stroke="var(--text-muted)"
                                    tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="var(--text-muted)"
                                    tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--bg-panel)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-main)',
                                        boxShadow: 'var(--shadow-md)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="present"
                                    name="出勤"
                                    stroke="var(--primary)"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorPresent)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="late"
                                    name="迟到"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorLate)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="absent"
                                    name="缺勤"
                                    stroke="#f43f5e"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorAbsent)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="linear-card">
                    <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem' }}>最近动态</h2>

                    <div className="activity-scroll-container">
                        <div className="activity-scroll-content">
                            {/* Duplicate list for seamless scrolling */}
                            {[...recentActivity, ...recentActivity, ...recentActivity].map((activity, index) => (
                                <div key={`${activity.id}-${index}`} className="activity-item interactive-card">
                                    <div
                                        className="status-dot"
                                        style={{
                                            backgroundColor: activity.type === 'success' ? '#10b981' : activity.type === 'warning' ? '#f59e0b' : '#f43f5e'
                                        }}
                                    />
                                    <div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                            <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{activity.user}</span> {activity.action}
                                        </p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', color: 'var(--primary)', background: 'transparent', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.875rem' }}>
                        查看全部动态
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
