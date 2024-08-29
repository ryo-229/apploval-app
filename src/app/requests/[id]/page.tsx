"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useAuth } from '../../../contexts/AuthContext';

type Request = {
  id: string;
  title: string;
  content: string;
  status: string;
  created_at: string;
  file_url: string | null;
};

const RequestDetailPage = () => {
  const [request, setRequest] = useState<Request | null>(null);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching request:', error);
    } else {
      setRequest(data);
    }
  };

  const handleApprove = async () => {
    const { error } = await supabase
      .from('requests')
      .update({ status: 'APPROVED' })
      .eq('id', id);

    if (error) {
      console.error('Error approving request:', error);
    } else {
      fetchRequest();
    }
  };

  const handleReject = async () => {
    const { error } = await supabase
      .from('requests')
      .update({ status: 'REJECTED' })
      .eq('id', id);

    if (error) {
      console.error('Error rejecting request:', error);
    } else {
      fetchRequest();
    }
  };

  if (!request) {
    return <div className="text-gray-900">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5 text-gray-900">{request.title}</h1>
        <p className="mb-4 text-gray-900">ステータス: {request.status}</p>
        <p className="mb-4 text-gray-900">作成日: {new Date(request.created_at).toLocaleDateString()}</p>
        <div className="mb-4 text-gray-900">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">内容:</h2>
          <p className="text-gray-900">{request.content}</p>
        </div>
        {request.file_url && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">添付ファイル:</h2>
            <a href={request.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              ファイルを表示
            </a>
          </div>
        )}
        {user?.role === 'APPROVER' && request.status === 'PENDING' && (
          <div className="mt-6">
            <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600">
              承認
            </button>
            <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              否認
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default RequestDetailPage;