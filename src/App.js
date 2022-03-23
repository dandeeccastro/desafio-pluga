import './App.css';

import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import ToolCard from './ToolCard.js';
import ToolModal from './ToolModal.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,

      tools: [],
      visited_tools: [],
      display_tools: [],

      tool: {
        img: "",
        color: "",
        title: "",
        link: "",
      }
    }
  }

  handleVisited(current_tool) {
    if (!this.state.visited_tools.includes(current_tool)) {
      if (this.state.visited_tools.length < 3)
        this.state.visited_tools.push(current_tool);
      else {
        this.state.visited_tools.unshift(current_tool);
        this.state.visited_tools.pop();
      }
    }
  }

  componentDidMount() {

    const api = axios.create({
      baseURL: "https://pluga.co/",
    })

    api.get("/ferramentas_search.json").then(response => {
      this.setState({
        tools: response.data,
        display_tools: response.data
      })
    })

  }

  setModal(data) {
    this.setState({
      show: true,
      tool: {
        img: data.icon,
        color: data.color,
        title: data.name,
        link: data.link,
      }
    });

    this.handleVisited(data);
  }

  setShow(val) {
    this.setState({ show: val })
  }

  filterByName(name) {
    this.setState({ 
      display_tools: this.state.tools.filter((x) => { 
        if (x.name.toLowerCase().includes(name.toLowerCase())) return x; 
      })
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <InputGroup size="lg" onChange={(yay) => this.filterByName(yay.target.value)}>
            <InputGroup.Text>Pesquisa</InputGroup.Text>
            <FormControl
              placeholder="Pesquise aqui"
              aria-label="Pesquise aqui"
            />
          </InputGroup>
        </Row>
        <Row sm={4} md={4} xs={4} lg={4} xl={4}>
          {this.state.display_tools.map((tool) =>
            <Col style={{ margin: "1em 0" }} key={tool.app_id} onClick={() => this.setModal(tool)}>
              <ToolCard
                name={tool.name}
                color={tool.color}
                icon={tool.icon}
                link={tool.link}
              />
            </Col>
          )}
        </Row>
        <Modal
          show={this.state.show}
          onHide={() => this.setShow(false)}>
          <Modal.Header closeButton> </Modal.Header>
          <Modal.Body>
            <ToolModal
              img={this.state.tool.img}
              color={this.state.tool.color}
              title={this.state.tool.title}
              link={this.state.tool.link}
              visited={this.state.visited_tools}
            />
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}

export default App;
