import dynamic from 'next/dynamic'
import ProtectedRoute from '../../../components/ProtectedRoute'

const RequestForm = dynamic(() => import('../../../components/RequestForm'), { ssr: false })

const NewRequestPage = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5">新規申請</h1>
        <RequestForm />
      </div>
    </ProtectedRoute>
  );
};

export default NewRequestPage;