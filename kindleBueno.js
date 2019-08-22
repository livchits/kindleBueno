class Kindle {
  constructor() {
    this.readBooks = 0;
    this.notReadYetBooks = 0;
    this._current = null;
    this._next = null;
    this._last = null;
    this._library = [];
  }

  add(eBook) { }

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

  static isEqual(eBookA, eBookB) {
    return eBookA.title === eBookB.title && eBookA.author === eBookB.author;
  }
}
