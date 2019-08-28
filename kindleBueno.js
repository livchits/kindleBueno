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
    return this._library.some(kindleBook => kindleBook.isEqual(eBook));
  }

  _updateNotReadYetBooks() {
    this.notReadYetBooks = this._library.reduce((totalBooksNotRead, currentBook) => {
      if (!currentBook.read) {
        totalBooksNotRead++;
      }
      return totalBooksNotRead;
    }, 0);
  }

  _updateReadBooks() {
    this.readBooks = this._library.reduce((totalBooksRead, currentBook) => {
      if (currentBook._read) {
        totalBooksRead++;
      }
      return totalBooksRead;
    }, 0)
  }

  finishCurrentBook() {
    if (this._current === null) {
      console.error('There is no current book to finish, you must add one first.');
      return;
    }
    this._current._read = true;
    this._current._readDate = Date.now();
    this._last = this._current;
    this._current = this._next;
    this._next = this.library.find(eBooK => eBooK._read === false && !Ebook.isEqual(eBooK, this._current));
    this._updateReadBooks;
    this._updateNotReadYetBooks;
  }

  get library() { }

  get size() { }

  get currentEBook() { }

  set currentEBook() { }

  filterBy(criteria) { }

  search(keywords) {
    return this._library.filter(eBook=>eBook.title.toLowerCase().includes(keywords.toLowerCase()) || eBook.author.toLowerCase().includes(keywords.toLowerCase()));
  }

  sortBy(criteria) {
    const sortedArray = [...this._library];
    const sortCriteria = (bookA, bookB) => bookA[criteria].localeCompare(bookB[criteria]);

    if (criteria === 'author' || criteria === 'title') {
      return sortedArray.sort(sortCriteria);
    }

    return console.warn('Criteria must be either "author" or "title"');
  }
}

class Ebook {
  constructor({ title, author, genre, cover }) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.cover = cover;
    this._read = false;
    this._readDate = null;
  }

  get read() {
    return this._read;
  }

  get readDate() {
    return this._readDate;
  }

  static isEqual(eBookA, eBookB) {
    return eBookA.title === eBookB.title && eBookA.author === eBookB.author && eBookA.genre === eBookB.genre;
  }
}
