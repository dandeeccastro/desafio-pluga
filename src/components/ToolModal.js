import './ToolModal.css'

import { useState, useEffect } from 'react';

import ToolCard from './ToolCard.js'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

function ToolModal(props) {

  const [items, setItems] = useState([]);

  const getLastItems = () => {
    const result = props.visited.slice(1,4);
    setItems(result);
  }

  useEffect( getLastItems, [props.visited] );

  return (
    <Stack gap={3} className="modalStack">
      <Row>
        <Col sm={6} md={6} lg={6} xl={6}>
          <Image 
            src={props.img} 
            className="toolImage"
            style={{ backgroundColor: props.color }}/>
        </Col>
        <Col sm={6} md={6} lg={6} xl={6}>
          <Stack gap={3} className="titleStack">
            <h1 className="title"> {props.title} </h1>
            <Button size="lg" onClick={() => window.open(props.link)}> Acessar </Button>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12} xl={12}>
        <h2> Últimos Acessados </h2>
        <Row sm={3} md={3} lg={3} xl={3}>
          {items.map(tool =>
            <Col>
              <ToolCard
                key={tool.app_id}
                name={tool.name}
                color={tool.color}
                icon={tool.icon}
                link={tool.link}
              />
            </Col>
          )}
        </Row>
        </Col>

      </Row>
    </Stack>
  );
}

export default ToolModal;
