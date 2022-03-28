import './ToolCard.css';

import Card from "react-bootstrap/Card";

function ToolCard(props) {
  return (
    <Card>
      <Card.Img variant="top" style={{ padding:"1em", backgroundColor:props.color }} src={props.icon}/>
      <Card.Header style={{ overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis"}}>{props.name}</Card.Header>
    </Card>
  );
}

export default ToolCard;
