import dynamic from 'next/dynamic'

const LoginForm = dynamic(() => import('../../components/LoginForm'), { ssr: false })

export default function LoginPage() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">ログイン</h1>
      <LoginForm />
    </div>
  );
}