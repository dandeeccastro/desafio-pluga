import { useState, useEffect } from 'react';

import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ToolCard from './ToolCard.js';

export default function ToolPagination(props) {

  const [index, setIndex] = useState(0);
  const [max, setMax] = useState(0);
  const [display, setDisplay] = useState(null);

  const makeItemCol = (j) => {
    let result = [];
    const limit = j + 12 > props.items.length ? props.items.length : j + 12;
    for (let i = j; i < limit; i++) {
      result.push(
       <Col style={{ margin: "1em 0" }} key={props.items[i].app_id}>
         <ToolCard
           name={props.items[i].name}
           color={props.items[i].color}
           icon={props.items[i].icon}
           link={props.items[i].link}
         />
       </Col>
      )
    }
    return result;
    // const curr_tools = props.items.slice(i,12);
    // let result = []
    // for ( let x of curr_tools ) {
    //   result.push(
    //    <Col style={{ margin: "1em 0" }} key={x.app_id}> 
    //      <ToolCard 
    //        name={x.name} 
    //        color={x.color} 
    //        icon={x.icon} 
    //        link={x.link} 
    //      /> 
    //    </Col> 
    //   );
    // }
    // return result;
  }

  const makePaginationItems = () => { 
    let items = []
    for ( let i = 0; i < max; i++ ) {
      items.push(
        <Pagination.Item key={i} active={i == index} onClick={()=>setIndex(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return items;
  }

  useEffect(() => {
    setIndex(0);
    setMax( Math.ceil(props.items.length / 12) );
    setDisplay( makeItemCol(index * 12) );
  },[props.items]);

  useEffect(() => {
    setDisplay( makeItemCol(index * 12) );
  },[index]);
  
  return (
    <Pagination>
      <Row sm={4} md={4} xs={4} lg={4} xl={4}>
        {display}
      </Row>
      {makePaginationItems()}
    </Pagination>
  )
}
