export default class Ebook {
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
