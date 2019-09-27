import React from 'react'
import { Form, Row, Col, Button } from "react-bootstrap"

const AdDescription = ({ description, index, onChange, onDelete }) => {
  return (
    <Form.Group>
      <Form.Label>
        Описание {index > 0 && index + 1}
      </Form.Label>

      <Row className="align-items-end">
        <Col md={index > 0 ? 10 : 12} className={index > 0 && 'pr-1'}>
          <Form.Control
            as="textarea"
            className={description.length > 81 && `is-invalid`}
            size="sm"
            value={description}
            rows="2"
            onChange={(e) => onChange(index, e.target.value)}
          />
        </Col>
        {
          index > 0 &&
          <Col md={2} className="pl-1">
            <Button
              onClick={() => onDelete(index)}
              variant="outline-danger" size="sm" className="delete">Удалить</Button>
          </Col>
        }
      </Row>
      <Form.Text className={description.length > 81 && `invalid-feedback`}>
        Максимум 81 символ, сейчас {description.length}
      </Form.Text>
    </Form.Group>
  )
}

export default AdDescription