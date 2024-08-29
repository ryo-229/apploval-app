"use client";

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const RequestForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // ファイルのアップロード（もし選択されていれば）
      let fileUrl = null;
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { data, error } = await supabase.storage
          .from('request-files')
          .upload(filePath, file);

        if (error) throw error;
        
        // 公開URLを取得
        const { data: { publicUrl } } = supabase.storage
          .from('request-files')
          .getPublicUrl(filePath);

        fileUrl = publicUrl;
      }

      // リクエストの作成
      const { data, error } = await supabase.from('requests').insert({
        title,
        content,
        file_url: fileUrl,
        requester_id: user.id,
        status: 'PENDING',
      });

      if (error) throw error;

      alert('申請が正常に送信されました。');
      setTitle('');
      setContent('');
      setFile(null);
    } catch (error: any) {
      alert('エラー: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-2 text-gray-900">タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="content" className="block mb-2 text-gray-900">内容</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
          rows={4}
        ></textarea>
      </div>
      <div>
        <label htmlFor="file" className="block mb-2 text-gray-900">添付ファイル（任意）</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        申請を送信
      </button>
    </form>
  );
};

export default RequestForm;