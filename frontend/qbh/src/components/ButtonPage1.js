import React, { useEffect, useState } from 'react';
import './ButtonPage1.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ButtonPage1 = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/getAuthors');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result.data);
      setFilteredData(result.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredAuthors = data.filter(
      (author) =>
        author.AuthorName.toLowerCase().includes(query) ||
        author.Books.some((book) => book.Title.toLowerCase().includes(query))
    );
    setFilteredData(filteredAuthors);
  };

  const downloadPDF = () => {
    const tableData = [];

    filteredData.forEach((author) => {
      const authorData = {
        AuthorName: author.AuthorName,
        DateOfBirth: author.DateOfBirth,
        Country: author.Country,
        Books: [],
      };

      author.Books.forEach((book) => {
        authorData.Books.push({
          BookID: book.BookID,
          Title: book.Title,
          PublicationYear: book.PublicationYear,
          Price: book.Price,
        });
      });

      tableData.push(authorData);
    });

    const doc = new jsPDF();

    const headers = [['Author Name', 'Date of Birth', 'Country', 'Books']];

    const rows = tableData.map((author) => [
      author.AuthorName,
      author.DateOfBirth,
      author.Country,
      author.Books
        .map((book) => `${book.Title} (ID: ${book.BookID})`)
        .join('\n'),
    ]);

    const tableX = 15;
    const tableY = 20;
    const colWidths = [50, 40, 40, 100];

    doc.autoTable({
      head: headers,
      body: rows,
      startY: tableY,
      startX: tableX,
      columnStyles: {
        0: { cellWidth: colWidths[0] },
        1: { cellWidth: colWidths[1] },
        2: { cellWidth: colWidths[2] },
        3: { cellWidth: colWidths[3] },
      },
    });

    doc.save('Book_Rishu.pdf');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Show All Books details, authorName is Primary key in author table and foreign key in book table</h1>
      <div>
        <input
          type="text"
          placeholder="Search by book name or author name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <button onClick={downloadPDF} style={{ backgroundColor: 'green', color: 'white' }}>Download PDF</button>
      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Date of Birth</th>
              <th>Country</th>
              <th>Books</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((author, index) => (
              <tr key={index}>
                <td>{author.AuthorName}</td>
                <td>{author.DateOfBirth}</td>
                <td>{author.Country}</td>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Publication Year</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {author.Books.map((book, bookIndex) => (
                        <tr key={bookIndex}>
                          <td>{book.BookID}</td>
                          <td>{book.Title}</td>
                          <td>{book.PublicationYear}</td>
                          <td>{book.Price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No data found.</div>
      )}
    </div>
  );
};

export default ButtonPage1;










