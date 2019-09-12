export default class Search {
  constructor() {}

  search(kindle, keywords) {
    const searchKeywords = this._cleanKeywords(keywords);

    const result = kindle.library.filter(ebook =>
      this._titleOrAuthorMatch(ebook, searchKeywords)
    );

    this._updateRecentSearches(kindle, searchKeywords);

    return result.length > 0
      ? result
      : console.log("There are no results found in your library");
  }

  _cleanKeywords(keywords) {
    return keywords.toLowerCase().trim();
  }

  _titleOrAuthorMatch(ebook, searchKeywords) {
    return (
      ebook.title.toLowerCase().includes(searchKeywords) ||
      ebook.author.toLowerCase().includes(searchKeywords)
    );
  }

  _updateRecentSearches(kindle, searchKeywords) {
    kindle._recentSearches.addToBuffer(searchKeywords);
  }
}
