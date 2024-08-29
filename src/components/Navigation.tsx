"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold">
          承認申請アプリ
        </Link>
        <div>
          {user ? (
            <>
              <Link href="/dashboard" className="text-white mr-4">
                ダッシュボード
              </Link>
              <Link href="/requests/new" className="text-white mr-4">
                新規申請
              </Link>
              <button onClick={handleLogout} className="text-white">
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white mr-4">
                ログイン
              </Link>
              <Link href="/signup" className="text-white">
                サインアップ
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
