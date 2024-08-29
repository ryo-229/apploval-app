import dynamic from 'next/dynamic'

const SignUpForm = dynamic(() => import('../../components/SignUpForm'), { ssr: false })

export default function SignUpPage() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">サインアップ</h1>
      <SignUpForm />
    </div>
  );
}