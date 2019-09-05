class Kindle {
  constructor() {
    this.readBooks = 0;
    this.notReadYetBooks = 0;
    this._current = null;
    this._next = null;
    this._last = null;
    this._library = [];
    this._recentSearches = [];
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
    this._next = _updateNextEbook();
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
    return [...this.library]._sortCriteria(criteria);
  }

  _sortCriteria(criteria) {
    const sortCriteria = (bookA, bookB) =>
      bookA[criteria].localeCompare(bookB[criteria]);

    if (criteria === "author" || criteria === "title") {
      return sortedArray.sort(sortCriteria);
    }

    return console.warn('Criteria must be either "author" or "title"');
  }

  get recentSearches() {
    return this._recentSearches;
  }
}

class Ebook {
  constructor({ title, author, genre, cover }) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.cover = cover;
    this.read = false;
    this.readDate = null;
  }

  static isEqual(eBookA, eBookB) {
    const { title: titleA, author: authorA, genre: genreA } = eBookA;
    const { title: titleB, author: authorB, genre: genreB } = eBookB;

    return titleA === titleB && authorA === authorB && genreA === genreB;
  }
}

class Search {
  constructor() {
    this._recentSearches = [];
  }

  search(kindle, keywords) {
    const searchKeywords = this._cleanKeywords(keywords);
    
    const result = kindle.library.filter(ebook=> this._titleOrAuthorMatch(ebook, searchKeywords));

    this._updateRecentSearches(searchKeywords);

    return result.length > 0 ? result : console.log("There are no results found in your library");
  }

  get recentSearches() {
    return this._recentSearches;
  }
  
  _cleanKeywords(keywords) {
    return keywords.toLowerCase().trim();
  }

  _titleOrAuthorMatch(ebook, searchKeywords) {
    return ebook.title.toLowerCase().includes(searchKeywords) || ebook.author.toLowerCase().includes(searchKeywords);
  }

  _updateRecentSearches(searchKeywords) {
    this._recentSearches.push(searchKeywords);
    if (this._recentSearches.length > 5)
      this._recentSearches.shift();
  }
}

