export default class Buffer {
  constructor(capacity) {
    this._content = new Array(capacity);
    this.next = 0;
  }

  addToBuffer(data) {
    if (this.next < this._content.length) {
      this._content[this.next] = data;
      this.next++;
    } else {
      this._content[0] = data;
      this.next = 1;
    }
  }
}
