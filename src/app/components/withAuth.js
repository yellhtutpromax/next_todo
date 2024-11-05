import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const [session, loading] = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !session) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [loading, session]);

    if (loading) return <div>Loading...</div>;

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
