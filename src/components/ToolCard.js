import './ToolCard.css';

import Card from "react-bootstrap/Card";

function ToolCard(props) {
  return (
    <Card>
      <Card.Img 
        variant="top" 
        className="cardImage" 
        style={{ backgroundColor:props.color }} 
        src={props.icon}/>
      <Card.Header 
        className="cardHeader"
      >{props.name}</Card.Header>
    </Card>
  );
}

export default ToolCard;
