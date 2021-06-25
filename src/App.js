import React, { useState } from 'react';
import { useAuth } from './core/hooks/useAuth';
import Helpers from './core/func/Helpers';
import UnAuthenticated from './pages/Login';
import Authenticated from './pages/index';
import Loading from './components/Loading';

const App = () => {
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(true);
  Helpers.loadUserInStore(user);
  
  // wait for resource
  setTimeout(() => {
    setLoading(false)
  }, 3000);

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {user 
        ? <Authenticated user={user} /> 
        : <UnAuthenticated />
      }
    </>
  );
}

export default App;
