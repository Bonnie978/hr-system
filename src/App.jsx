import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AttendanceList from './components/AttendanceList';
import UserDetail from './components/UserDetail';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setActiveTab('user-detail');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'attendance':
        return <AttendanceList onUserClick={handleUserClick} />;
      case 'user-detail':
        return <UserDetail userId={selectedUserId} onBack={() => setActiveTab('attendance')} />;
      case 'employees':
        return <div className="text-white">Employee List Component (Coming Soon)</div>;
      case 'settings':
        return <div className="text-white">Settings Component (Coming Soon)</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
