import { List } from "immutable";

let count = 0;

export class TreeNode {
  constructor({ value, parent } = {}) {
    /** @type {number} */
    this.key = count++;
    /** @type {string} */
    this.value = value ?? this.key.toString();
    /** @type {TreeNode} */
    this.parent = parent ?? null;
    /** @type {List<TreeNode>} */
    this.children = List();
  }

  get isLeaf() {
    return this.children.size === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
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

  appendChild(text) {
    const child = new TreeNode({ value: text, parent: this });
    this.children = this.children.push(child);
    return child;
  }

  //   insertChild(index, node) {
  //     node.parent = this;
  //     this.children = this.children.insert(index, node);
  //     return child;
  //   }
}

export class Tree {
  constructor() {
    this.root = new TreeNode({ value: "ROOT" });
  }

  *preOrderTraversal(node = this.root) {
    console.log("Pre-order traversal");
    console.log(node);
    yield node;
    if (node.children.size) {
      for (let child of node.children) {
        console.log(child);
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.size) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parentNodeKey, value) {
    const parentNode = this.find(parentNodeKey);
    if (parentNode) {
      parentNode.children = parentNode.children.push(
        new TreeNode({ value, parentNode })
      );
      return true;
    }
    return false;
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

  appendChild(text = "") {
    return this.root.appendChild(text);
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.size !== node.children.size) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  fromYaml(text) {
    this.root = new TreeNode("ROOT");
    const getYAMLIndentLevel = (line) => line.match(/^ */)[0].size / 2;
    const lines = text.split("\n");

    for (const line of lines) {
      const indent = getYAMLIndentLevel(line);
    }
  }

  toYaml() {
    let yaml = "";
    for (let node of this.preOrderTraversal()) {
      const txt = `${"  ".repeat(node.depth)}- ${node.value}:\n`;
      console.log(txt);
      yaml += txt;
    }
    console.log(yaml);
    return yaml;
  }
}
