import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGrabTemplateSimulation, handleNewTemplateSimulation } from '../../actions/simulation';
import { handleNewTemplateFeature, handleDeleteTemplateFeature, handleUpdateTemplateFeature, handleNewTemplateStory, handleUpdateTemplateStory, handleDeleteTemplateStory } from '../../actions/features';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Edits from './editTemplate';
import { MdDelete } from 'react-icons/md';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempNewFeature: '',
            tempSelectedFeature: '',
            tempNewStory: '',
            tempSelectedStory: ''
        }
        this.features = this.features.bind(this);
    }

    componentDidMount() {
    }

    features() {
        let temp = [];
        let tempStories = [];
        if (this.props.templateSimulation.simulation.features) {
            for (var key in this.props.templateSimulation.simulation.features) {
                let keyTemp = key;
                temp.push(
                    <Nav.Item key={key}>
                        <Nav.Link eventKey={key}>
                            {(this.props.templateSimulation.simulation.features[key].priority) ? this.props.templateSimulation.simulation.features[key].priority + '  ': <></>}
                            {this.props.templateSimulation.simulation.features[key].name}
                            {(this.state.tempSelectedFeature === key) ? <MdDelete style={{ float: 'right' }} onClick={() => { this.props.handleDeleteTemplateFeature(this.props.templateSimulation.simulation.key, keyTemp) }} /> : <></>}
                        </Nav.Link>
                    </Nav.Item>
                )
            }
            if (this.state.tempSelectedFeature !== '' && this.props.templateSimulation.simulation.features[this.state.tempSelectedFeature]) {
                if (this.props.templateSimulation.simulation.features[this.state.tempSelectedFeature].stories) {
                    for (var key1 in this.props.templateSimulation.simulation.features[this.state.tempSelectedFeature].stories) {
                        let key2 = key1;
                        tempStories.push(
                            <Row style={{ marginBottom: '5px' }} key={key2}>
                                <Button variant="secondary" block style={{ marginLeft: '5px', width: '80%', float: 'right', marginBottom: '5px', marginRight: '10px' }} onClick={() => { this.setState({ ...this.state, tempSelectedStory: key2 }) }}>
                                    {this.props.templateSimulation.simulation.features[this.state.tempSelectedFeature].stories[key1].name}
                                    {(this.state.tempSelectedStory === key2) ? <MdDelete style={{ float: 'right' }} onClick={() => { this.props.handleDeleteTemplateStory(this.props.templateSimulation.simulation.key, this.state.tempSelectedFeature, key2) }} /> : <></>}
                                </Button>
                                {(this.props.templateSimulation.simulation.features[this.state.tempSelectedFeature].stories[key1].size) ? "Size: " + this.props.templateSimulation.simulation.features[this.state.tempSelectedFeature].stories[key1].size : <></>}
                            </Row>
                        )
                    }
                }
            }
        }

            return (<Card style={{ margin: '20px', width: '40%', height: '100%' }}>
                <Card.Body>
                    <Card.Header>
                        <Form inline>
                            <Card.Title style={{ marginRight: '40px' }}>Features</Card.Title>
                            <Form.Group controlId="simulationName">
                                <Form.Control type='username' placeholder='New Feature Name' onChange={(text) => { this.setState({ ...this.state, tempNewFeature: text.target.value }) }} />
                            </Form.Group>
                        <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={() => { if (this.state.tempNewFeature !== '') { this.props.handleNewTemplateFeature(this.props.templateSimulation.simulation.key, this.state.tempNewFeature); alert(this.state.tempNewFeature + ' Created!'); } }}>
                            Create Feature
                        </Button>
                        </Form>
                    </Card.Header>
                    <div className="p-3" style={{ width: '30%', left: '0', overflowY: 'auto', backgroundColor: 'lightGrey', height: '93.5%'}}>
                        <Nav className="flex-column" variant="pills" onSelect={(eventKey) => { this.setState({ ...this.state, tempSelectedFeature: eventKey }) }}>
                            {temp}
                        </Nav>
                    </div>
                    {(this.state.tempSelectedFeature !== '' && this.props.templateSimulation.simulation.features) ?
                        (this.props.templateSimulation.simulation.features[this.state.tempSelectedFeature]) ? 
                        <div style={{ marginLeft: '30%', width: '65%', position: 'absolute', top: '100px'}}>
                            <Card.Header>
                                <Form inline>
                                    <Card.Title style={{ marginRight: '20px' }}>Stories</Card.Title>
                                    <Form.Group controlId="simulationName">
                                        <Form.Control type='username' placeholder='New Story Name' onChange={(text) => { this.setState({ ...this.state, tempNewStory: text.target.value }) }} />
                                    </Form.Group>
                                    <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={() => { if (this.state.tempNewStory !== '') { this.props.handleNewTemplateStory(this.props.templateSimulation.simulation.key, this.state.tempSelectedFeature, this.state.tempNewStory); alert(this.state.tempNewStory + ' Created!'); } }}>
                                        Create Story
                                </Button>
                                </Form>
                            </Card.Header>
                                <div className="p-3" style={{ overflowY: 'auto', height: '57vh' }}>
                                    <Container>
                                        {tempStories}
                                    </Container>
                                </div>
                        </div>
                            : <></>
                            : <></>}
                </Card.Body>
            </Card>)
    }

    render() {
        return (
            <div style={{ width: '100vw', position: 'absolute', height: '75%' }}>
                {this.features()}
                <div style={{ position: 'absolute', width: '55vw', left: '42%', top: '20px', height: '100%' }}>
                    <Edits feature={this.state.tempSelectedFeature} story={this.state.tempSelectedStory} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        templateSimulation: state.templateSimulation
    }
}

export default connect(mapStateToProps, { handleGrabTemplateSimulation, handleNewTemplateSimulation, handleNewTemplateFeature, handleDeleteTemplateFeature, handleUpdateTemplateFeature, handleNewTemplateStory, handleUpdateTemplateStory, handleDeleteTemplateStory })(Main);