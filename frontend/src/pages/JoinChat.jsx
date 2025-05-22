import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const JoinChat = ({ token, user }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get('code');

  useEffect(() => {
    if (!inviteCode || !token || !user) {
      toast.error('Código de invitación o autenticación inválidos', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/');
      return;
    }

    const joinChat = async () => {
      try {
        const response = await fetch(`https://pisafondo-production.up.railway.app/chats/join`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ invite_code: inviteCode }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al unirse al chat');
        }

        toast.success('¡Te uniste al chat exitosamente!', {
          position: 'top-right',
          autoClose: 3000,
        });
        navigate('/');
      } catch (err) {
        console.error('Join chat error:', err);
        toast.error(err.message, {
          position: 'top-right',
          autoClose: 3000,
        });
        navigate('/');
      }
    };

    joinChat();
  }, [inviteCode, token, user, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <svg
          className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-900">Uniéndote al chat...</p>
      </div>
    </div>
  );
};

export default JoinChat;