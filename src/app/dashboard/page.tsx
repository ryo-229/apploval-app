"use client";

import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import RequestList from '../../components/RequestList';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5 text-gray-900">ダッシュボード</h1>
        <p className="text-gray-900">ようこそ、{user?.email}さん！</p>
        <RequestList />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;