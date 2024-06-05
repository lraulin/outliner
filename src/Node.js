import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { useTreeDispatch } from "./TreeContext";

/**
 * Description placeholder
 *
 * @param {{ node: TreeNode; }} param0
 * @param {TreeNode} param0.node
 * @returns {*}
 */
const Node = ({ node, handleShow }) => {
  if (!node) {
    throw new Error("node is " + node);
  }
  const dispatch = useTreeDispatch();

  const handleDelete = (key) => {
    dispatch({ type: "delete", key: node.key });
  };
  const handleUp = (key) => {
    dispatch({ type: "up", key: node.key });
  };
  const handleDown = (key) => {
    dispatch({ type: "down", key: node.key });
  };
  const handleIndent = (key) => {
    dispatch({ type: "indent", key: node.key });
  };
  const handleOutdent = (key) => {
    dispatch({ type: "outdent", key: node.key });
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>{node?.value}</Card.Header>
      <ListGroup variant="flush">
        {node?.hasChildren &&
          node.children.map((n) => (
            <ListGroup.Item key={n.key}>
              <Node node={n} handleShow={handleShow} />
            </ListGroup.Item>
          ))}
      </ListGroup>
      <Card.Footer>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup size="sm" aria-label="Buttons to move item">
            <Button variant="secondary">
              <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={handleUp} />
            </Button>
            <Button variant="secondary">
              <FontAwesomeIcon
                icon={faArrowAltCircleDown}
                onClick={handleDown}
              />
            </Button>
            <Button variant="secondary">
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                onClick={handleOutdent}
              />
            </Button>
            <Button variant="secondary">
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                onClick={handleIndent}
              />
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" aria-label="Buttons to add or delete item">
            <Button variant="danger" onClick={() => handleDelete(node.key)}>
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
            <Button variant="primary" onClick={() => handleShow(node.key)}>
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Card.Footer>
    </Card>
  );
};

export default Node;
