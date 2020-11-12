import React from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";

const AdFastLink = ({ title, url, index, onChange, onDelete }) => {
  return (
    <Row className="align-items-end">
      <Col className="pr-1" md={4}>
        <Form.Group>
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => onChange(index, { title: e.target.value })}
            type="text"
            size="sm"
          />
        </Form.Group>
      </Col>
      <Col className="pl-1 pr-1" md={6}>
        <Form.Group>
          <Form.Label>Ссылка</Form.Label>
          <Form.Control
            value={url}
            onChange={(e) => onChange(index, { url: e.target.value })}
            type="text"
            size="sm"
          />
        </Form.Group>
      </Col>
      <Col md={2} className="pl-1">
        <Form.Group>
          <Button
            onClick={() => onDelete(index)}
            variant="outline-danger" size="sm" className="delete">Удалить</Button>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default AdFastLink;