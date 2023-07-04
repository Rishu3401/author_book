import React, { useState } from 'react';

const ButtonPage5 = () => {
  const [formData, setFormData] = useState({
    authorName: '',
    dateOfBirth: '',
    country: '',
    bookID: '',
    bookTitle: '',
    publicationYear: '',
    price: ''
  });
  const [backendMessage, setBackendMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        var data = await response.json();
        console.log(data);
        setBackendMessage(data.message);
      
      } else {
        console.log('Error:', response.statusText);
        setBackendMessage(data.error);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>all input are mandatory</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="authorName" placeholder="Author Name" onChange={handleChange} />
        <input type="text" name="dateOfBirth" placeholder="YYYY-MM-DD" onChange={handleChange} />
        <input type="text" name="country" placeholder="Country" onChange={handleChange} />
        <input type="text" name="bookID" placeholder="Book ID" onChange={handleChange} />
        <input type="text" name="bookTitle" placeholder="Book Title" onChange={handleChange} />
        <input type="text" name="publicationYear" placeholder="Publication Year" onChange={handleChange} />
        <input type="text" name="price" placeholder="Price" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      {backendMessage && <p>{backendMessage}</p>}
    </div>
  );
};

export default ButtonPage5;
