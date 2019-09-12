export default class Buffer {
  constructor(capacity) {
    this.buffer = new Array(capacity);
    this.next = 0;
  }

  addToBuffer(data) {
    if (this.next < this.buffer.length) {
      this.buffer[this.next] = data;
      this.next++;
    } else {
      this.buffer[0] = data;
      this.next = 1;
    }
  }
}
