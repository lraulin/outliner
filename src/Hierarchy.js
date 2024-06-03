// src/Hierarchy.js
import React, { useState } from "react";
import { fromJS, List } from "immutable";
import Node from "./Node";

const Hierarchy = () => {
  const [nodes, setNodes] = useState(
    fromJS([
      { id: 1, text: "Node 1", children: [] },
      {
        id: 2,
        text: "Node 2",
        children: [{ id: 3, text: "Node 3", children: [] }],
      },
    ])
  );

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
        />
      ))}
    </div>
  );
};

export default Hierarchy;
