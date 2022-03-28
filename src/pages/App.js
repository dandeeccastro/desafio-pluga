import './App.css';

import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import ToolModal from '../components/ToolModal.js';
import ToolCard from '../components/ToolCard.js';

export default function App () {

  // State 
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [tools, setTools] = useState([]);
  const [display_tools, setDisplayTools] = useState([]);
  const [visited_tools, setVisitedTools] = useState([]);
  const [modal_tool, setModalTool] = useState({});
  const [index, setIndex] = useState(0);
  const [max, setMax] = useState(0);
  const [display, setDisplay] = useState(null);

  const page_items = 12;

  // Funções 
  const updateDisplay = () => {
    setDisplay( makeItemCol(index * page_items) );
  }

  const onChangeDisplayTools = () => {
    setIndex(0);
    setMax( Math.ceil(display_tools.length / page_items) );
    setDisplay( makeItemCol(index * page_items) );
  }

  const makePaginationItems = () => { 
    let items = []
    for ( let i = 0; i < max; i++ ) {
      items.push(
        <Pagination.Item key={i} active={i === index} onClick={()=>setIndex(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return (
      <Pagination>
        {items}
      </Pagination>
    )
  }

  const makeItemCol = (j) => {
    const limit = j + page_items > display_tools.length ? display_tools.length : j + page_items;
    let result = [];

    for (let i = j; i < limit; i++) {
      result.push(
       <Col className="cardColumn" key={display_tools[i].app_id} onClick={() => {showModal(display_tools[i])}}>
         <ToolCard
           name={display_tools[i].name}
           color={display_tools[i].color}
           icon={display_tools[i].icon}
           link={display_tools[i].link}
         />
       </Col>
      )
    }
    return (
      <Row xs={1} sm={3} md={4} lg={4} xl={4}>
        {result}
      </Row>
    )

  }

  const showModal = (tool) => {
    setModalTool(tool);
    updateVisitedTools(tool);
    setShow(true);
  }

  const searchTool = () => {
    const result = tools.filter((x) => {
      if (x.name.toLowerCase().includes(search.toLowerCase())) 
        return x;
    });
    setDisplayTools(result);
  }
  
  const updateVisitedTools = (tool) => {
    let result = [...visited_tools];
    if ( result.length < 4) {
      result = [tool].concat(result);
    } else {
      result = [tool].concat(result.slice(0,3));
    }
    setVisitedTools(result);
  }

  // Effects 
  useEffect(() => {
    const fetchTools = async () => {
      const response = await fetch("https://pluga.co/ferramentas_search.json");
      const data = await response.json();

      setTools(data);
      setDisplayTools(data);
    }
    fetchTools();
  },[]);

  useEffect(searchTool, [search]);
  useEffect(onChangeDisplayTools,[display_tools]);
  useEffect(updateDisplay,[index, visited_tools]);

  // Render
  return (
    <Stack gap={3} className="globalStack" >
        <InputGroup onChange={(evt) => setSearch(evt.target.value)}>
          <InputGroup.Text>Pesquisa</InputGroup.Text>
          <FormControl
            placeholder="Pesquise aqui"
            aria-label="Pesquise aqui"
          />
        </InputGroup>
        {display}
        {makePaginationItems()}
      <Modal
        show={show}
        onHide={() => setShow(false)}>
        <Modal.Header closeButton> </Modal.Header>
        <Modal.Body>
          <ToolModal
            img={modal_tool.icon}
            color={modal_tool.color}
            title={modal_tool.name}
            link={modal_tool.link}
            visited={visited_tools}
          />
        </Modal.Body>
      </Modal>
    </Stack>
  )
}
