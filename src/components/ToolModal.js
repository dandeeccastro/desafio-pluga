import './ToolModal.css'

import ToolCard from './ToolCard.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function ToolModal(props) {

  return (
    <Container>
      <Row>
        <Col>
          <Image src={props.img} style={{ backgroundColor: props.color }} />
        </Col>
        <Col>
          <Row>
            <p> {props.title} </p>
          </Row>
          <Row>
            <Button onClick={() => window.open(props.link)}> Acessar </Button>
          </Row>
        </Col>
      </Row>
      <Row>
        <h2> Últimos Acessados </h2>
        {props.visited.map(tool =>
          <Col>
            <ToolCard
              name={tool.name}
              color={tool.color}
              icon={tool.icon}
              link={tool.link}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default ToolModal;
