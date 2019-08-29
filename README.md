# Project 2: [Kindle Bueno](https://github.com/undefinedschool/project-2-kindle-bueno)  

### 0. Setup
- Crear repositorio y sumar a los colaboradores.
- Crear el archivo kindleBueno.js

### 1. Crear la clase `Kindle`
- Propiedades:
  - `readBooks`: número de libros marcados como ya leídos
  - `notReadYetBooks`: número de libros marcados como no leídos aún
  - `_current` **(_propiedad privada_)**: referencia al libro que estamos leyendo actualmente
  - `_next` **(_propiedad privada_)**: referencia al próximo libro a leer
  - `_last` **(_propiedad privada_)**: referencia al último libro leído
  - `_library` **(_propiedad privada_)**: un _array_ de todos los libros que tenemos en el objeto _kindle_ (objetos de tipo _EBook_)

### 2. Crear la clase `Ebook`
- Propiedades:
  - `title`
  - `genre`
  - `author`
  - `cover`: _string_ con la _URL_ de la imagen del _cover_ del libro
  - `read`: _booleano_ que indica si fue leído
  - `readDate`: fecha en que se leyó (objeto de tipo `Date()`, por default vacío)

## Métodos de la clase *eBook*

### 3. *isEqual* 
- **EBook** debe tener el siguiente método:
  - `.isEqual(eBookA, eBookB)`: método _estático_ de _EBook_ que compara si 2 _eBooks_ son iguales

## Métodos de la clase *Kindle*

### 4 . *add(eBook)*
- `.add(eBook)` agrega un nuevo libro a la `_library` del _Kindle_
- el método recibe un objeto `eBook` de la forma `{ title: <TITLE>, genre: <GENRE>, author: <AUTHOR>, cover: <COVER> }` y setea las propiedades correspondientes
- actualizar la cantidad de libros no leídos
- si ya existe un libro en el _Kindle_ con las mismas propiedades, no debe agregarse y debe mostrarse el siguiente mensaje (warning) por consola _`"${eBook.title}" already exists in library`_
##### Qué pasa cuando agregamos un libro al _Kindle_ (`.add(eBook)`)
1. Si no tenemos libros actualmente en el _Kindle_, el nuevo libro que se agregue pasará a ser el `_current` (`_next` y `_last` no se modifican)
2. Si tengo exactamente 1 libro en el _Kindle_ (caso anterior), el nuevo libro que se agregue pasará a ser `_next` (`_last` queda igual)
3. Si tengo 2 o más libros, el nuevo libro que se agregue pasará a la lista de libros del _Kindle_, `_current`, `_next` y `_last` no se modifican

### 5. *finishCurrentBook()*
 - Si no tenemos libro actual, no modificar nada y mostrar el siguiente error por consola _'There is no current book to finish, you must add one first.'_
 - Marcar el libro actual como leído
 - Setearle la fecha de lectura (`Date.now()`)
 - Setear como último libro leído (`_last`) el recién finalizado (`_current`)
 - Setear como libro actual (`_current`) al próximo a leer (`_next`)
 - Setear como próximo libro (`_next`) al primero de los no leídos que no sea el libro actual
 - Actualizar la cantidad de libros leídos
 - Actualizar la cantidad de libros no leídos

### 6. *library()*
- Es un _getter_: retorna un _objeto_ que contiene los libros del kindle (no el _array_ directamente). Ver ejemplo debajo

```js
// kindle.library (getter)
{
  { 
    title: 'Drive', 
    genre: 'Psychology', 
    author: 'Daniel H. Pink', 
    cover: 'https://i.imgur.com/B3XpOxl.jpg'
  }, 
  { 
    title: 'Futuro Pop', 
    genre: 'Science Fiction', 
    author: 'Luciano Banchero', 
    cover: 'https://i.imgur.com/uYOy55M.jpg'
  }
}
```
### 7. *size()*
- `.size` **(_getter_)**: retorna la cantidad de libros disponibles en el _Kindle_

### 8. *currentEBook()* (getter) 
  - `.currentEBook` **(_getter_)**: retorna un objeto de la forma `{ title: <TITLE>, genre: <GENRE>, author: <AUTHOR>, cover: <COVER> }` con la info del libro actual

### 9. currentEBook(eBook) (setter)
 - `.currentEBook(eBook)` **(_setter_)**: setea cualquier libro disponible en el _Kindle_ como el actual (`_current`) y el libro actual (`_current`) pasa a ser el próximo (`_next`). En el caso de que elijamos el mismo libro que ya estamos leyendo, no hacer nada

### 10. *filterBy(criteria)*
- `.filterBy(criteria)`: retorna un _array_ de los eBooks ya leídos o no leídos aún, según si se recibe el _string_ `'read'` o `'unread'` como parámetro. En el caso de que no haya resultados, se debe mostrar el siguiente mensaje en consola: ‘You have no items that match the selected filters’.

###  11. *search(keywords)*
- `.search(keywords)`: retorna un _array_ de los eBooks que incluyan las _keywords_ en `title` o `author`, sin importar si están en mayúscula o minúscula (no es _case sensitive_). En el caso de que no haya resultados, se debe mostrar el siguiente mensaje en consola: 'There are no results found in your library'. Nota: los espacios al principio y al final de keywords deben ignorarse.

### 12. *sortBy(criteria)*  
- `sortBy(criteria)`: retorna un _array_ de los _eBooks_ ordenado (de forma ascendente) por `title` o `author`, según si se recibe el _string_ `'title'` o `'author'` como parámetro

## Observaciones

- Inicializar las _propiedades_ en el constructor de cada clase con los valores apropiados en cada caso
- Tanto **Kindle** como **EBook** pueden tener otras propiedades y métodos si son necesarios. Pensar por ejemplo qué parte de la interfaz debe ser definida como _pública_ y cuál como _privada_

## eBooks de ejemplo

```js
{ 
  title: 'Drive', 
  genre: 'Psychology', 
  author: 'Daniel H. Pink', 
  cover: 'https://i.imgur.com/B3XpOxl.jpg'
}
```

```js
{ 
  title: 'Futuro Pop', 
  genre: 'Science Fiction', 
  author: 'Luciano Banchero', 
  cover: 'https://i.imgur.com/uYOy55M.jpg'
}
```

```js
{ 
  title: 'The Lord of the Rings - The Fellowship of the Ring', 
  genre: 'Fantasy', 
  author: 'J. R. R. Tolkien', 
  cover: 'https://i.imgur.com/OwMUnQu.jpg'
}
```

```js
{ 
  title: 'The Principles Of Object-oriented Javascript', 
  genre: 'Programming', 
  author: 'Nicholas C. Zakas', 
  cover: 'https://i.imgur.com/Iktw1ps.jpg'
}
```

```js
{ 
  title: "Harry Potter and the Philosopher's Stone", 
  genre: 'Fantasy', 
  author: 'J. K. Rowling', 
  cover: 'https://i.imgur.com/PH1aXaP.jpg'
}
```

```js
{ 
  title: 'Eloquent JavaScript', 
  genre: 'Programming', 
  author: 'Marijn Haverbeke', 
  cover: 'https://i.imgur.com/F4NQlvx.jpg'
}
```
