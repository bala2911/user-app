import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const url = 'https://randomuser.me/api';

  const fetchUser = async () => {
    try {
      const response = await axios.get(url);

      const userData = response.data.results[0];
      const { name, email } = userData;
      console.log(name);
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
