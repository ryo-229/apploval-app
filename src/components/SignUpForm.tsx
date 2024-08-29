"use client";

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('REQUESTER');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });
      if (error) throw error;
      alert('サインアップに成功しました！確認メールを確認してください。');
    } catch (error) {
      alert('エラー: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-2">メールアドレス</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2">パスワード</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="name" className="block mb-2">名前</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="role" className="block mb-2">役割</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border rounded text-gray-900"
        >
          <option value="REQUESTER">申請者</option>
          <option value="APPROVER">承認者</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        サインアップ
      </button>
    </form>
  );
};

export default SignUpForm;