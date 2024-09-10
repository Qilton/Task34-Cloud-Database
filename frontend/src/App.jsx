

import React, { useState,useEffect } from 'react';

import axios from 'axios';
const MyForm = () => {
  const [users,setusers]=useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
const getUsers=() => {
  axios.get('https://task34-cloud-database-server.vercel.app/save')
    .then(res => {
      
      console.log(res.data);
      setusers(res.data);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    });
}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    axios.post('https://task34-cloud-database-server.vercel.app/form', formData)
  };

  return <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    <button onClick={getUsers}>Get Users</button>
    {users && users.map((user)=>{
      return(
        <div className='User'>
          <h1>Name:{user.name}</h1>
          <h1>Email:{user.email}</h1>
          <h1>Message:{user.message}</h1>
          <br />
        </div>
      )
    })}</>
};

export default MyForm;
