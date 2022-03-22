import './ToolModal.css'

import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function ToolModal(props) {

  return (
    <Modal show={props.show}>
      <Modal.Header closeButton> </Modal.Header>
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
              <Button> Acessar </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
}

export default ToolModal;
