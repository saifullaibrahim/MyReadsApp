import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    books: ''
  }

  searchBook = (searchQuery, booksState) => {
    if (!searchQuery.trim()) {
      this.setState({books: ''})
    } else {
      BooksAPI.search(searchQuery, 20).then((searchResults) => {
        if (searchResults.error) {
          this.setState({books: ''})
        } else {
          let newsearchResults = searchResults.map((searchItem) => {
            booksState.map((booksItem) => {
              if (searchItem.id === booksItem.id) {
                searchItem.shelf = booksItem.shelf
                return searchItem
              } else {
                return searchItem
              }
            })
            return searchItem
          })
          this.setState({books: newsearchResults})
        }
      })
    }
  }

  handleChange = (book, shelf) => {
    (shelf !== "none") && BooksAPI.update(book, shelf).then((updateResponse) => {
      var changedBooks = this.state.books.map((bookItem) => {
        if (bookItem.id === book.id) {
          bookItem.shelf = shelf;
          return bookItem;
        } else {
          return bookItem;
        }
      });
      this.setState({books: changedBooks})
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author component" onKeyUp={(e) => this.searchBook(e.target.value, this.props.booksState)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books
              ? (this.state.books.map((books) => (
                <li key={books.id}>
                  <Book book={books} changeState={this.handleChange} hideAuthors={true}/>
                </li>
              )))
              : (null)}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
