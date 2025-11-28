import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { employees } from '../data/mockData';

const StatusBadge = ({ status }) => {
    const className = `status-badge status-${status.toLowerCase()}`;
    const label = status === 'Present' ? '正常' : status === 'Late' ? '迟到' : '缺勤';
    return (
        <span className={className}>
            {label}
        </span>
    );
};

const AttendanceList = ({ onUserClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || emp.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="animate-fade-in">
            <div className="dashboard-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>考勤管理</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>管理和监控员工考勤记录。</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Download size={16} />
                        导出 CSV
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="linear-card controls-bar">
                <div className="search-bar" style={{ width: '100%', maxWidth: 400 }}>
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="搜索员工或部门..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.375rem 0.75rem', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                        <Filter size={16} style={{ color: 'var(--text-muted)' }} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none' }}
                        >
                            <option value="All">所有状态</option>
                            <option value="Present">正常</option>
                            <option value="Late">迟到</option>
                            <option value="Absent">缺勤</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="linear-card table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>员工姓名</th>
                            <th>职位</th>
                            <th>部门</th>
                            <th>日期</th>
                            <th>打卡时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr
                                key={emp.id}
                                onClick={() => onUserClick && onUserClick(emp.id)}
                                style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                            >
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <img src={emp.avatar} alt={emp.name} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border-subtle)' }} />
                                        <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{emp.name}</span>
                                    </div>
                                </td>
                                <td>{emp.role}</td>
                                <td>{emp.department}</td>
                                <td>{new Date().toLocaleDateString('zh-CN')}</td>
                                <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{emp.checkIn}</td>
                                <td>
                                    <StatusBadge status={emp.status} />
                                </td>
                                <td>
                                    <button style={{ padding: 6, background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div style={{ padding: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <span>显示 {filteredEmployees.length} 条结果</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{ padding: 4, background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                            <ChevronLeft size={20} />
                        </button>
                        <button style={{ padding: 4, background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceList;
