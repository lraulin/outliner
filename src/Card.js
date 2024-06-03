import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";

/**
 * Your Component
 */
export default function Card({ isDragging }) {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => setText(e.target.value);
  const handleClickSave = () => setIsEditing(false);
  const handleClickEdit = () => setIsEditing(true);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return (
    <div ref={dragRef} style={{ opacity }}>
      {isEditing ? (
        <>
          <input value={text} onChange={handleChange} />
          <button onClick={handleClickSave}>Save</button>
        </>
      ) : (
        <>
          {text}
          <button onClick={handleClickEdit}>Edit</button>
        </>
      )}
    </div>
  );
}
