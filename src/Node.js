import React, { Component } from "react";
import { TreeNode } from "./tree";
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

/**
 * Description placeholder
 *
 * @param {{ node: TreeNode; }} param0
 * @param {TreeNode} param0.node
 * @returns {*}
 */
const Node = ({ node, handleShow, handleDelete }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>{node?.value}</Card.Header>
      <ListGroup variant="flush">
        {node.hasChildren &&
          node.children.map((n) => (
            <ListGroup.Item>
              <Node node={n} handleShow={handleShow} />
            </ListGroup.Item>
          ))}
      </ListGroup>
      <Card.Footer>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup size="sm" aria-label="Buttons to move item">
            <Button variant="secondary">
              <FontAwesomeIcon icon={faArrowAltCircleUp} />
            </Button>
            <Button variant="secondary">
              <FontAwesomeIcon icon={faArrowAltCircleDown} />
            </Button>
            <Button variant="secondary">
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </Button>
            <Button variant="secondary">
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
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
