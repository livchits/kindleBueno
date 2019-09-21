import Ebook from "./Ebook.js";
import Buffer from "./Buffer.js";
import Search from "./Search.js";

export default class Kindle {
  constructor() {
    this.readBooks = 0;
    this.notReadYetBooks = 0;
    this._current = null;
    this._next = null;
    this._last = null;
    this._library = [];
    this._recentSearches = new Buffer(5);
  }

  add(eBook) {
    if (this._exists(eBook)) {
      console.warn(`"${eBook.title}" already exists in library`);
      return;
    }

    if (!this._current) {
      this._current = eBook;
    }

    if (!this._next && this._current) {
      this._next = eBook;
    }

    this._library.push(eBook);

    this._updateNotReadYetBooks();
  }

  _exists(eBook) {
    return this._library.some(kindleBook => Ebook.isEqual(kindleBook, eBook));
  }

  _updateNotReadYetBooks() {
    this.notReadYetBooks = this._library.reduce(
      (totalBooksNotRead, currentBook) => {
        if (!currentBook.read) {
          totalBooksNotRead++;
        }
        return totalBooksNotRead;
      },
      0
    );
  }

  _updateReadBooks() {
    this.readBooks = this._library.reduce((totalBooksRead, currentBook) => {
      if (currentBook._read) {
        totalBooksRead++;
      }
      return totalBooksRead;
    }, 0);
  }

  finishCurrentBook() {
    if (this._current === null) {
      console.error(
        "There is no current book to finish, you must add one first."
      );
      return;
    }
    this._current._read = true;
    this._current._readDate = Date.now();
    this._last = this._current;
    this._current = this._next;
    this._next = this._updateNextEbook();
    this._updateReadBooks;
    this._updateNotReadYetBooks;
  }

  _updateNextEbook() {
    return this._library.find(
      eBooK => eBooK._read === false && !Ebook.isEqual(eBooK, this._current)
    );
  }

  get library() {
    return this._library.map(ebook => this._copyEbook(ebook));
  }

  _copyEbook(ebook) {
    const { title, author, genre, cover } = ebook;
    return { title, author, genre, cover };
  }

  get size() {
    return this._library.length;
  }

  get currentEBook() {
    return this._copyEbook(this._current);
  }

  set currentEBook(eBook) {
    if (!this._exists(eBook)) {
      console.warn(`"${eBook.title}" does not exists in library`);
      return;
    }

    if (!Ebook.isEqual(eBook, this.currentEBook)) {
      this._next = this._current;
      this._current = eBook;
    }
  }

  filterBy(criteria) {}

  sortBy(criteria) {
    const sortCriteria = (bookA, bookB) =>
      bookA[criteria].localeCompare(bookB[criteria]);

    if (criteria === "author" || criteria === "title") {
      return [...this.library].sort(sortCriteria);
    }

    return console.warn('Criteria must be either "author" or "title"');
  }

  search(keywords) {
    return new Search().search(this, keywords);
  }

  get recentSearches() {
    return this._recentSearches.buffer;
  }
}
