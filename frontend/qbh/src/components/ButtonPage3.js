import React, { useState } from 'react';

const ButtonPage3 = () => {
  const [authorName, setAuthorName] = useState('');
  const [bookID, setBookID] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [title, setTitle] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleAuthorNameChange = (e) => {
    setAuthorName(e.target.value);
  };

  const handleBookIDChange = (e) => {
    setBookID(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePublicationYearChange = (e) => {
    setPublicationYear(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authorName && bookID) {
      const updateData = {
        dateOfBirth,
        country,
        title,
        publicationYear,
        price
      };

      fetch(`http://localhost:3000/updateAuthor/${authorName}/${bookID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
        .then((response) => response.json())
        .then((data) => {
          setMessage(data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h1> AuthorName & BookID is mandatory
</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Author Name:
          <input type="text" value={authorName} onChange={handleAuthorNameChange} required />
        </label>
        <br />
        <label>
          Book ID:
          <input type="text" value={bookID} onChange={handleBookIDChange} required />
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="text" value={dateOfBirth} onChange={handleDateOfBirthChange} />
        </label>
        <br />
        <label>
          Country:
          <input type="text" value={country} onChange={handleCountryChange} />
        </label>
        <br />
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Publication Year:
          <input type="text" value={publicationYear} onChange={handlePublicationYearChange} />
        </label>
        <br />
        <label>
          Price:
          <input type="text" value={price} onChange={handlePriceChange} />
        </label>
        <br />
        <button type="submit">Update Author and Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    
  );
};

export default ButtonPage3;


