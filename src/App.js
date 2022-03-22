import './App.css';

import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ToolCard from './ToolCard.js';
import ToolModal from './ToolModal.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      tools: [],
      tool: {
        show: false,
        img: "",
        color: "",
        title: "",
      }
    }
  }

  componentDidMount() {

    const api = axios.create({
      baseURL: "https://pluga.co/",
    })

    api.get("/ferramentas_search.json").then(response => {
      this.setState({
        tools: response.data
      })
    })

  }

  setModal(modal_data) {
    this.setState({
      tool:{
        show: true,
        img: modal_data.icon,
        color: modal_data.color,
        title: modal_data.name,
      }
    });
  }

  render(){
    return (
      <>
        <Container>
          <Row sm={4} md={4} xs={4} lg={4} xl={4}>
            {this.state.tools.map( (tool) => 
            <Col style={{ margin: "1em 0"}} key={tool.app_id} onClick={() => this.setModal(tool)}>
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
        <ToolModal 
          show={this.state.tool.show}
          img={this.state.tool.img}
          color={this.state.tool.color}
          title={this.state.tool.title}
          />
      </>
    );
  }
}

export default App;
