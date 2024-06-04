let count = 0;

export class TreeNode {
  constructor({ value, parent } = {}) {
    /** @type {number} */
    this.key = count++;
    /** @type {string} */
    this.value = value ?? this.key.toString();
    /** @type {TreeNode} */
    this.parent = parent ?? null;
    /** @type {TreeNode[]} */
    this.children = [];
  }

  get isRoot() {
    return !this.parent;
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }

  get siblings() {
    if (this.isRoot) return null;
    return this.parent.children;
  }

  set siblings(arr) {
    if (!Array.isArray(arr)) throw new Error(arr + " is not an array");
    this.parent.children = arr;
  }

  get index() {
    if (this.isRoot) return 0;
    return this.siblings.map((n) => n.key).indexOf(this.key);
  }

  get siblingCount() {
    if (this.isRoot) return 0;
    return this.siblings.length - 1;
  }

  get isFirst() {
    return this.index === 0;
  }

  get isLast() {
    if (this.isRoot) return true;
    return this.index === this.siblings.length - 1;
  }

  get previousSibling() {
    if (this.isFirst) return null;
    return this.siblings[this.index - 1];
  }

  get nextSibling() {
    if (this.isLast) return null;
    return this.siblings[this.index + 1];
  }

  /**
   * @readonly
   * @type {number}
   */
  get depth() {
    const measureDepth = (node) => {
      if (node.parent === null) {
        return 0;
      }

      return measureDepth(node.parent) + 1;
    };

    return measureDepth(this);
  }

  /**
   * Description placeholder
   *
   * @param {string | TreeNode} child
   */
  appendChild(child) {
    console.log("append child");
    console.log(child);
    if (typeof child === "string") {
      child = new TreeNode({ value: child });
    }
    child.parent = this;
    this.children.push(child);
    return child;
  }

  /**
   * Description placeholder
   *
   * @param {TreeNode} sibling
   */
  insertSibling(sibling) {
    if (this.isRoot) return;
    sibling.parent = this.parent;
    const before = this.siblings.slice(0, this.index + 1);
    const after = this.siblings.slice(this.index + 1);
    this.siblings = [...before, sibling, ...after];
  }

  remove() {
    this.siblings = this.siblings.filter((n) => n.key !== this.key);
  }
}

export class Tree {
  constructor() {
    this.root = new TreeNode({ value: "ROOT" });
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parentNodeKey, value) {
    const parentNode = this.find(parentNodeKey);
    const node = new TreeNode({ value, parentNode });
    parentNode.appendChild(node);
    return this;
  }

  /**
   * Description placeholder
   *
   * @param {number} siblingNodeKey
   * @param {string} value
   */
  insertAfterSibling(siblingNodeKey, value) {
    /** @type {TreeNode} */
    const siblingNode = this.find(siblingNodeKey);
    if (siblingNode) {
      const siblingIndex = siblingNode.parent.children.indexOf(siblingNode);
      siblingNode.parent.insertChild(siblingIndex, new TreeNode({ value }));
    }
  }

  /**
   * Description placeholder
   *
   * @param {string | TreeNode} child
   */
  appendChild(child) {
    return this.root.appendChild(child);
  }

  /**
   * Description placeholder
   *
   * @param {number} key
   * @returns {boolean}
   */
  remove(key) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  /**
   * Description placeholder
   *
   * @param {number} key
   * @returns {TreeNode | null}
   */
  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return null;
  }

  fromYaml(text) {
    this.root = new TreeNode("ROOT");
    const getYAMLIndentLevel = (line) => line.match(/^ */)[0].length / 2;
    const lines = text.split("\n");

    for (const line of lines) {
      const indent = getYAMLIndentLevel(line);
    }
  }

  toYaml() {
    let yaml = "";
    for (let node of this.preOrderTraversal()) {
      const txt = `${"  ".repeat(node.depth)}- ${node.value}:\n`;
      yaml += txt;
    }
    return yaml;
  }

  moveUp(key) {
    const node = this.find(key);
    if (node.isFirst) return;

    const before = node.siblings.slice(0, node.previousSibling.index);
    const after = node.siblings.slice(node.index + 1);
    node.parent.children = [...before, node, node.previousSibling, ...after];
    return this;
  }

  moveDown(key) {
    const node = this.find(key);
    if (node.isLast) return;

    const before = node.parent.children.slice(0, node.index);
    const after = node.parent.children.slice(node.nextSibling.index + 1);
    node.parent.children = [...before, node.nextSibling, node, ...after];
    return this;
  }

  indent(key) {
    const node = this.find(key);
    if (node.isFirst) return;

    const previousSibling = node.previousSibling;
    node.remove();
    previousSibling.appendChild(node);
    return this;
  }

  outdent(key) {
    const node = this.find(key);
    if (node.isRoot || node.parent.isRoot) return;

    const previousParent = node.parent;
    node.remove();
    previousParent.insertSibling(node);
    return this;
  }
}
