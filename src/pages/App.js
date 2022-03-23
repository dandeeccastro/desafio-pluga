import './App.css';

import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import ToolModal from '../components/ToolModal.js';
import ToolPagination from '../components/ToolPagination.js';

export default function App () {

  // State 
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [tools, setTools] = useState([]);
  const [display_tools, setDisplayTools] = useState([]);
  const [visited_tools, setVisitedTools] = useState([]);
  const [modal_tool, setModalTool] = useState({});

  // Funções 
  const fetchTools = async () => {
    const response = await fetch("https://pluga.co/ferramentas_search.json");
    const data = await response.json();

    setTools(data);
    setDisplayTools(data);
  }

  const showModal = (tool) => {
    setModalTool(tool);
    setShow(true);
    updateVisitedTools(tool);
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
    if ( result.length < 3) 
      result.push(tool);
    else 
      result = [tool].concat(result.slice(0,2));
    setVisitedTools(result);
  }

  // Effects 
  useEffect(fetchTools,[]);
  useEffect(searchTool, [search]);

  // Render
  return (
    <Container>
      <Row>
        <InputGroup size="lg" onChange={(yay) => setSearch(yay.target.value)}>
          <InputGroup.Text>Pesquisa</InputGroup.Text>
          <FormControl
            placeholder="Pesquise aqui"
            aria-label="Pesquise aqui"
          />
        </InputGroup>
      </Row>
      <ToolPagination 
        items={display_tools} 
        />
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
    </Container>
  )
}
// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       show: false,

//       tools: [],
//       visited_tools: [],
//       display_tools: [],

//       tool: {
//         img: "",
//         color: "",
//         title: "",
//         link: "",
//       }
//     }
//   }

//   handleVisited(current_tool) {
//     if (!this.state.visited_tools.includes(current_tool)) {
//       if (this.state.visited_tools.length < 3)
//         this.state.visited_tools.push(current_tool);
//       else {
//         this.state.visited_tools.unshift(current_tool);
//         this.state.visited_tools.pop();
//       }
//     }
//   }

//   componentDidMount() {

//     const api = axios.create({
//       baseURL: "https://pluga.co/",
//     })

//     api.get("/ferramentas_search.json").then(response => {
//       this.setState({
//         tools: response.data,
//         display_tools: response.data
//       })
//     })

//   }

//   setModal(data) {
//     this.setState({
//       show: true,
//       tool: {
//         img: data.icon,
//         color: data.color,
//         title: data.name,
//         link: data.link,
//       }
//     });

//     this.handleVisited(data);
//   }

//   setShow(val) {
//     this.setState({ show: val })
//   }

//   filterByName(name) {
//     this.setState({ 
//       display_tools: this.state.tools.filter((x) => { 
//         if (x.name.toLowerCase().includes(name.toLowerCase())) return x; 
//       })
//     });
//   }

//   render() {
//     return (
//       <Container>
//         <Row>
//           <InputGroup size="lg" onChange={(yay) => this.filterByName(yay.target.value)}>
//             <InputGroup.Text>Pesquisa</InputGroup.Text>
//             <FormControl
//               placeholder="Pesquise aqui"
//               aria-label="Pesquise aqui"
//             />
//           </InputGroup>
//         </Row>
//         <Row sm={4} md={4} xs={4} lg={4} xl={4}>
//           {this.state.display_tools.map((tool) =>
//             <Col style={{ margin: "1em 0" }} key={tool.app_id} onClick={() => this.setModal(tool)}>
//               <ToolCard
//                 name={tool.name}
//                 color={tool.color}
//                 icon={tool.icon}
//                 link={tool.link}
//               />
//             </Col>
//           )}
//         </Row>
//         <Modal
//           show={this.state.show}
//           onHide={() => this.setShow(false)}>
//           <Modal.Header closeButton> </Modal.Header>
//           <Modal.Body>
//             <ToolModal
//               img={this.state.tool.img}
//               color={this.state.tool.color}
//               title={this.state.tool.title}
//               link={this.state.tool.link}
//               visited={this.state.visited_tools}
//             />
//           </Modal.Body>
//         </Modal>
//       </Container>
//     );
//   }
// }
