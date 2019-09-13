import Ebook from "./Ebook.js";
import Kindle from "./Kindle.js";
import Search from "./Search.js";

const kindle = new Kindle();

const ebooks = [
  {
    title: "Drive",
    genre: "Psychology",
    author: "Daniel H. Pink",
    cover: "https://i.imgur.com/B3XpOxl.jpg",
  },
  {
    title: "Futuro Pop",
    genre: "Science Fiction",
    author: "Luciano Banchero",
    cover: "https://i.imgur.com/uYOy55M.jpg",
  },
  {
    title: "The Lord of the Rings - The Fellowship of the Ring",
    genre: "Fantasy",
    author: "J. R. R. Tolkien",
    cover: "https://i.imgur.com/OwMUnQu.jpg",
  },
  {
    title: "The Principles Of Object-oriented Javascript",
    genre: "Programming",
    author: "Nicholas C. Zakas",
    cover: "https://i.imgur.com/Iktw1ps.jpg",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    author: "J. K. Rowling",
    cover: "https://i.imgur.com/PH1aXaP.jpg",
  },
  {
    title: "Eloquent JavaScript",
    genre: "Programming",
    author: "Marijn Haverbeke",
    cover: "https://i.imgur.com/F4NQlvx.jpg",
  },
];

ebooks.forEach(ebook => {
  const newEbook = new Ebook(ebook);
  kindle.add(newEbook);
});

console.log("--------------- LIBRARY ---------------");
console.log(kindle.library);

console.log("--------------- LIBRARY SIZE ---------------");
console.log(kindle.size);

console.log("---------------------------------------");
console.log(`Finish current book: "${kindle._current.title}"`);
kindle.finishCurrentBook();

// console.log("--------------- SEARCH ---------------");
// kindle.search("Yann Tiersen");
// kindle.search("Futuro");

console.log("--------------- SORT BY ---------------");
console.log("COVER:");
kindle.sortBy("cover");

console.log("AUTHOR:");
kindle.sortBy("author");

console.log("--------------- EQUAL ---------------");
console.log(ebooks[0]);
console.log(ebooks[1]);
console.log(Ebook.isEqual(new Ebook(ebooks[0]), new Ebook(ebooks[1])));

console.log("--------------- GET CURRENT EBOOK ---------------");
console.log(kindle.currentEBook);

console.log("--------------- SET EBOOK ---------------");
kindle.currentEBook = new Ebook({
  title: "If On a Winter's Night A Traveller",
  genre: "Fiction",
  author: "Italo Calvino",
  cover: "https://i.imgur.com/RaQbgQm.jpg",
});

console.log("--------------- ADD EBOOK ---------------");
const newEbook = new Ebook({
  title: "If On a Winter's Night A Traveller",
  genre: "Fiction",
  author: "Italo Calvino",
  cover: "https://i.imgur.com/RaQbgQm.jpg",
});
console.log(newEbook);
kindle.add(newEbook);

console.log("--------------- SET EBOOK ---------------");
kindle.currentEBook = newEbook;
console.log(kindle.currentEBook);

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
