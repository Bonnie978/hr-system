export const stats = {
    totalEmployees: 124,
    onTime: 108,
    late: 12,
    absent: 4,
    attendanceRate: 96.8
};

export const attendanceTrend = [
    { day: '周一', present: 118, late: 4, absent: 2 },
    { day: '周二', present: 120, late: 2, absent: 2 },
    { day: '周三', present: 115, late: 6, absent: 3 },
    { day: '周四', present: 121, late: 2, absent: 1 },
    { day: '周五', present: 119, late: 3, absent: 2 },
    { day: '周六', present: 45, late: 0, absent: 0 },
    { day: '周日', present: 12, late: 0, absent: 0 },
];

// Using AI-generated Chinese portraits stored locally
export const employees = [
    { id: 1, name: "张伟", role: "前端开发", department: "研发部", status: "Present", checkIn: "08:55", avatar: "/avatars/avatar1.png" },
    { id: 2, name: "李娜", role: "产品经理", department: "产品部", status: "Late", checkIn: "09:15", avatar: "/avatars/avatar2.png" },
    { id: 3, name: "王强", role: "UI设计师", department: "设计部", status: "Present", checkIn: "08:58", avatar: "/avatars/avatar3.png" },
    { id: 4, name: "刘芳", role: "市场主管", department: "市场部", status: "Absent", checkIn: "--:--", avatar: "/avatars/avatar4.png" },
    { id: 5, name: "陈杰", role: "后端开发", department: "研发部", status: "Present", checkIn: "09:00", avatar: "/avatars/avatar5.png" },
    { id: 6, name: "杨敏", role: "HR专员", department: "人事部", status: "Present", checkIn: "08:45", avatar: "/avatars/avatar6.png" },
    { id: 7, name: "赵刚", role: "销售经理", department: "销售部", status: "Late", checkIn: "09:30", avatar: "/avatars/avatar7.png" },
    { id: 8, name: "孙丽", role: "测试工程师", department: "研发部", status: "Present", checkIn: "08:50", avatar: "/avatars/avatar1.png" },
];

export const recentActivity = [
    { id: 1, user: "张伟", action: "已打卡", time: "08:55", type: "success" },
    { id: 2, user: "李娜", action: "迟到打卡", time: "09:15", type: "warning" },
    { id: 3, user: "王强", action: "已打卡", time: "08:58", type: "success" },
    { id: 4, user: "刘芳", action: "标记为缺勤", time: "10:00", type: "error" },
];
