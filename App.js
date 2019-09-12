import Ebook from "./Ebook.js";
import Kindle from "./Kindle.js";
import Search from "./Search.js";

const book1 = new Ebook({
  title: "Drive",
  genre: "Psychology",
  author: "Daniel H. Pink",
  cover: "https://i.imgur.com/B3XpOxl.jpg",
});

const book2 = new Ebook({
  title: "Futuro Pop",
  genre: "Science Fiction",
  author: "Luciano Banchero",
  cover: "https://i.imgur.com/uYOy55M.jpg",
});

const book3 = new Ebook({
  title: "Arive",
  genre: "Psychology",
  author: "Daniel H. Pink",
  cover: "https://i.imgur.com/B3XpOxl.jpg",
});

const kindle1 = new Kindle();

kindle1.add(book1);
kindle1.add(book2);
kindle1.add(book3);

//kindle1.sortBy('title');

//kindle1.search('pink');

//kindle1.filterBy('sd');

/*const libro = new Ebook({
  title: 'Drive',
  genre: 'Psychology',
  author: 'Daniel H. Pink',
  cover: 'https://i.imgur.com/B3XpOxl.jpg'
})*/

//Ebook.isEqual(book1, book1);

console.log(kindle1._library);
console.log(kindle1.library);
console.log(kindle1.size);
