import axios from 'axios';
import { useState } from 'react';

export default function InputWithButton() {
  const [message, setMessage] = useState('');

  async function RecupererID_Autheur_Email(UserName_Email, token) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `/api/wp-json/v1/userid?username=${encodeURIComponent(UserName_Email)}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      } 
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const fields = new FormData(e.target);
    const username_email = fields.get('name');
    const token = import.meta.env.VITE_API_TOKEN;

    if (!token) {
      console.error('API token is not defined');
      setMessage('API token is not defined');
      return;
    }

    try {
      const users = await RecupererID_Autheur_Email(username_email, token);
      setMessage(JSON.stringify(users, null, 2)); // Format JSON bien structuré
      console.log('Retrieved users:', users);
    } catch (error) {
      setMessage('Error retrieving data');
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Username or Email" />
        <button type="submit">Submit</button>
      </form>
      {message && <pre>{message}</pre>}
    </div>
  );
}
