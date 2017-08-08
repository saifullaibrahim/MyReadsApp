import React from 'react'
import {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

import {Link} from 'react-router-dom'

class Shelf extends Component {
  state = {
    books: []
  }

  componentWillMount() {
    this.props.getAllBooks()
  }

  handleChange = (book, shelf) => {
    if (book.shelf !== shelf && shelf !== "none") {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
    }
  }
  render() {
    const booksData = this.props.booksState
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>My Reads</h1>
          </div>

          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {booksData.filter((book) => {
                      return book.shelf === "currentlyReading"
                    }).map((currentlyReading) => (
                      <li key={currentlyReading.id}>
                        <Book book={currentlyReading} changeState={this.handleChange}/>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {booksData.filter((book) => {
                      return book.shelf === "wantToRead"
                    }).map((wantToRead) => (
                      <li key={wantToRead.id}>
                        <Book book={wantToRead} changeState={this.handleChange}/>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {booksData.filter((book) => {
                      return book.shelf === "read"
                    }).map((read) => (
                      <li key={read.id}>
                        <Book book={read} changeState={this.handleChange}/>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link className="add-contact" to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Shelf
