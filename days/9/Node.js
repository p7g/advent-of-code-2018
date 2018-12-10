class Node {
  constructor(value, next = this, previous = this) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  clockwise(n) {
    let end = this;
    for (let i = 0; i < n; i += 1) {
      end = end.next;
    }
    return end;
  }

  counterClockwise(n) {
    let end = this;
    for (let i = 0; i < n; i += 1) {
      end = end.previous;
    }
    return end;
  }

  addAfter(n, node) {
    const before = this.clockwise(n);
    const after = before.next;
    before.next = node;
    after.previous = node;
    node.next = after; // eslint-disable-line
    node.previous = before; // eslint-disable-line
  }

  removeAfter(n) {
    const before = this.clockwise(n);
    const toDelete = before.next;
    before.next = toDelete.next;
    before.next.previous = before;
    return toDelete;
  }

  addBefore(n, node) {
    const after = this.counterClockwise(n);
    const before = after.previous;
    before.next = node;
    after.previous = node;
    node.next = after; // eslint-disable-line
    node.previous = before; // eslint-disable-line
  }

  removeBefore(n) {
    const after = this.counterClockwise(n);
    const toDelete = after.previous;
    after.previous = toDelete.previous;
    after.previous.next = after;
    return toDelete;
  }
}

module.exports = Node;
