import React from 'react'
import {Route} from 'react-router-dom';
import Shelf from './Shelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(state => ({books: books}))
    })
  }
  componentWillMount() {
    this.getAllBooks()
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => <Shelf getAllBooks={this.getAllBooks} booksState={this.state.books}/>}/>
        <Route path="/search" render={() => <Search booksState={this.state.books}/>}/>
      </div>
    )
  }
}

export default BooksApp
