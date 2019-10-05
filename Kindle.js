import Ebook from "./Ebook.js";
import Buffer from "./Buffer.js";
import { cleanKeywords, titleOrAuthorMatch } from "./Utils.js";

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

    this.notReadYetBooks++;
  }

  _exists(eBook) {
    return this._library.some(kindleBook => Ebook.isEqual(kindleBook, eBook));
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
    this.readBooks++;
    this.notReadYetBooks--;
  }

  _updateNextEbook() {
    return this._library.find(
      eBooK => !eBooK._read && !Ebook.isEqual(eBooK, this._current)
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

  filterBy(criteria) {
    const filteredLibrary = this.library.filter(eBook =>
      criteria === "read" ? eBook.read : !eBook.read
    );
    return filteredLibrary.length > 0
      ? filteredLibrary
      : console.warn("You have no items that match the selected filters");
  }

  sortBy(criteria) {
    const sortCriteria = (bookA, bookB) =>
      bookA[criteria].localeCompare(bookB[criteria]);

    if (criteria === "author" || criteria === "title") {
      return [...this.library].sort(sortCriteria);
    }

    return console.warn('Criteria must be either "author" or "title"');
  }

  search(keywords) {
    const searchKeywords = cleanKeywords(keywords);

    const result = this.library.filter(ebook =>
      titleOrAuthorMatch(ebook, searchKeywords)
    );

    this._updateRecentSearches(searchKeywords);

    return result.length > 0
      ? result
      : console.log("There are no results found in your library");
  }

  _updateRecentSearches(searchKeywords) {
    this._recentSearches.addToBuffer(searchKeywords);
  }

  get recentSearches() {
    return this._recentSearches.content;
  }
}
