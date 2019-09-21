export function cleanKeywords(keywords) {
  return keywords.toLowerCase().trim();
}

export function titleOrAuthorMatch(ebook, searchKeywords) {
  return (
    ebook.title.toLowerCase().includes(searchKeywords) ||
    ebook.author.toLowerCase().includes(searchKeywords)
  );
}
