class Kindle {
  constructor() {
    this.readBooks = 0;
    this.notReadYetBooks = 0;
    this._current = null;
    this._next = null;
    this._last = null;
    this._library = [];
  }

  add(eBook) { 
    if (this._exists(eBook)) {
      console.warn(`"${eBook.title}" already exists in library`);
      return;
    }

    if (this._library.length === 0) {
      this._current = eBook;
    }

    if (this._library.length === 1) {
      this._next = eBook;
    }

    this._library.push(eBook);

    this._updateNotReadYetBooks();
  }

  _exists(eBook) {
    return this._library.find(libraryBook => libraryBook.title === eBook.title && libraryBook.author === eBook.title) ? true : false;
  }

  _updateNotReadYetBooks() {
    this.notReadYetBooks = this._library.reduce((totalBooksNotRead, currentBook) => {
      if (!currentBook.read) {
        totalBooksNotRead++;
      }
      return totalBooksNotRead;
    }, 0);
  }

  finishCurrentBook() { }

  get library() { }

  get size() { }

  get currentEBook() { }

  set currentEBook() { }

  filterBy(criteria) { }

  search(keywords) { }

  sortBy(criteria) { }
}

class Ebook {
  constructor(title, author, genre, cover) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.cover = cover;
    this.read = false;
    this.readDate = null;
  }

  static isEqual(eBookA, eBookB) { }
}
