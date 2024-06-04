import React, { Component } from "react";
import { TreeNode } from "./tree";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

/**
 * Description placeholder
 *
 * @param {{ node: TreeNode; }} param0
 * @param {TreeNode} param0.node
 * @returns {*}
 */
const Node = ({ node, handleShow }) => {
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
        <Button variant="primary" onClick={() => handleShow(node.key)}>
          +
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Node;
