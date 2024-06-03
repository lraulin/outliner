// src/Node.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./constants";

const Node = ({ node, moveNode }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.NODE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = node.get("index");

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveNode(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.NODE,
    item: {
      type: ItemTypes.NODE,
      id: node.get("id"),
      index: node.get("index"),
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {node.get("text")}
      {node.get("children") &&
        node
          .get("children")
          .map((childNode, index) => (
            <Node
              key={childNode.get("id")}
              node={childNode.set("index", index)}
              moveNode={moveNode}
            />
          ))}
    </div>
  );
};

export default Node;
