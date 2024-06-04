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

  expect(node.children.get(0).value).toBe("test");
});

it("measures depth", () => {
  const depth0 = new TreeNode();
  depth0.appendChild("test");
  const depth1 = depth0.children.get(0);
  depth1.appendChild("test2");
  const depth2 = depth1.children.get(0);
  depth2.appendChild("test3");
  const depth3 = depth2.children.get(0);
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

  console.log(tree);
  console.log(tree.root);
  console.log(tree.root.children);
  console.log(tree.root.children.get(0));
  console.log(tree.root.children.get(0).children.get(0));

  const expected = `- ROOT:
  - I:
    - A:
      - i:
      - ii:
    - B:
`;
  expect(tree.toYaml()).toBe(expected);
});
