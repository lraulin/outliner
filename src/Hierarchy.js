// src/Hierarchy.js
import React, { Children, useState } from "react";
import { fromJS, List } from "immutable";
import Node from "./Node";
import { Tree, TreeNode } from "./tree";

const Hierarchy = () => {
  const [nodes, setNodes] = useState(new TreeNode());

  const moveNode = (dragIndex, hoverIndex) => {
    const draggedNode = nodes.get(dragIndex);
    const updatedNodes = nodes
      .delete(dragIndex)
      .insert(hoverIndex, draggedNode);

    setNodes(updatedNodes);
  };

  return (
    <div>
      {nodes.map((node, index) => (
        <Node
          key={node.get("id")}
          node={node.set("index", index)}
          moveNode={moveNode}
          depth={0}
        />
      ))}
    </div>
  );
};

export default Hierarchy;
