import React, { useState } from "react";
import { TreeProvider, useTree, useTreeDispatch } from "./TreeContext";
import Node from "./Node";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [key, setKey] = useState(null);
  const dispatch = useTreeDispatch();

  const handleClose = () => setShow(false);
  const handleShow = (key) => {
    setKey(key);
    setShow(true);
  };
  const handleSave = () => {
    dispatch({ type: "append_child", key, value });
    setValue("");
    setKey(null);
    setShow(false);
  };

  const tree = useTree();
  return (
    <>
      <h1>Hierarchical Outliner</h1>
      {tree.root.children.map((n) => (
        <Node node={n} handleShow={handleShow} key={n.key} />
      ))}
      <Button variant="primary" onClick={() => handleShow(tree.root.key)}>
        <FontAwesomeIcon icon={faPlusSquare} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default App;
