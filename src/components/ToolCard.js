import './ToolCard.css';

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

function ToolCard(props) {
  return (
    <Card>
      <Image style={{ padding:"2em", backgroundColor:props.color }} src={props.icon}/>
      <Card.Body> 
        <Card.Title>{props.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default ToolCard;
