import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const userData = response.data.results[0];
      const { name, email } = userData;
      const user = {
        name: {
          title: name.title,
          first: name.first,
          last: name.last,
        },
        email,
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUser();
    }
  }, []);

  const handleRefresh = () => {
    fetchUser();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, email } = user;

  return (
    <div>
      <h1>{`${name.title} ${name.first} ${name.last}`}</h1>
      <p>{email}</p>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default App;
