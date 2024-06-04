import { Tree, TreeNode } from "./tree";

it("creates a tree", () => {
  const tree = new Tree();

  expect(tree).toHaveProperty("root");
  expect(tree.root).toHaveProperty("key");
  expect(tree.root).toHaveProperty("value");
  expect(tree.root).toHaveProperty("parent");
  expect(tree.root).toHaveProperty("children");
});

it("creates a default node", () => {
  const node = new TreeNode();

  expect(node).toHaveProperty("key");
  expect(node).toHaveProperty("value");
  expect(node).toHaveProperty("parent");
  expect(node).toHaveProperty("children");
  expect(typeof node.key).toBe("number");
  expect(typeof node.value).toBe("string");
});

it("creates a child node", () => {
  const node = new TreeNode();
  node.appendChild("test");

  expect(node.children[0].value).toBe("test");
});

it("measures depth", () => {
  const depth0 = new TreeNode();
  depth0.appendChild("test");
  const depth1 = depth0.children[0];
  depth1.appendChild("test2");
  const depth2 = depth1.children[0];
  depth2.appendChild("test3");
  const depth3 = depth2.children[0];
  depth3.appendChild("test4");

  expect(depth3.depth).toBe(3);
});

it("converts to YAML", () => {
  const tree = new Tree();
  const itemI = tree.appendChild("I");
  const itemA = itemI.appendChild("A");
  const itemi = itemA.appendChild("i");
  const itemii = itemA.appendChild("ii");
  const itemB = itemI.appendChild("B");

  const expected = `- ROOT:
  - I:
    - A:
      - i:
      - ii:
    - B:
`;
  expect(tree.toYaml()).toBe(expected);
});

it("moves node up", () => {
  const tree = new Tree();
  const itemI = tree.appendChild("I");
  const itemA = itemI.appendChild("A");
  const itemi = itemA.appendChild("i");
  const itemii = itemA.appendChild("ii");
  const itemB = itemI.appendChild("B");
  tree.moveUp(itemii.key);

  const expected = `- ROOT:
  - I:
    - A:
      - ii:
      - i:
    - B:
`;
  expect(tree.toYaml()).toBe(expected);
});

it("moves node down", () => {
  const tree = new Tree();
  const itemI = tree.appendChild("I");
  const itemA = itemI.appendChild("A");
  const itemi = itemA.appendChild("i");
  const itemii = itemA.appendChild("ii");
  const itemB = itemI.appendChild("B");
  tree.moveDown(itemi.key);

  const expected = `- ROOT:
  - I:
    - A:
      - ii:
      - i:
    - B:
`;
  expect(tree.toYaml()).toBe(expected);
});

it("moves node left", () => {
  const tree = new Tree();
  const itemI = tree.appendChild("I");
  const itemA = itemI.appendChild("A");
  const itemi = itemA.appendChild("i");
  const itemii = itemA.appendChild("ii");
  const itemB = itemI.appendChild("B");
  tree.outdent(itemA.key);

  const expected = `- ROOT:
  - I:
    - B:
  - A:
    - i:
    - ii:
`;
  expect(tree.toYaml()).toBe(expected);
});

it("moves node right", () => {
  const tree = new Tree();
  const itemI = tree.appendChild("I");
  const itemA = itemI.appendChild("A");
  const itemi = itemA.appendChild("i");
  const itemii = itemA.appendChild("ii");
  const itemB = itemI.appendChild("B");
  tree.indent(itemii.key);

  const expected = `- ROOT:
  - I:
    - A:
      - i:
        - ii:
    - B:
`;
  expect(tree.toYaml()).toBe(expected);
});
