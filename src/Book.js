import React from 'react';

const Book = (props) => {
  return (

    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${props.book.imageLinks.thumbnail})`
        }}></div>
        <div className="book-shelf-changer">
          <select value={props.book.shelf} onChange={(e) => {
            props.changeState(props.book, e.target.value);
          }}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}
      </div>
      {props.hideAuthors
        ? null
        : (
          <div className="book-authors">
            {(props.book.authors.length > 1)
              ? (props.book.authors.map((c) => <p key={c}>{c}</p>))
              : (props.book.authors)}
          </div>
        )}
    </div>
  )
}

export default Book;
