import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    handleAddTeamIteration, handleUpdateTeamIteration, handleDeleteTeamIteration,
    handleAddTeamRisk, handleUpdateTeamRisk, handleDeleteTeamRisk,
    handleAddTeamIterationStory, handleUpdateActiveStory, handleDeleteTeamIterationStory,
    handleAddTeamUser, handleUpdateTeamUser, handleDeleteTeamUser,
    handleAddTeamPIObjective, handleUpdateTeamPIObjective, handleDeleteTeamPIObjective
} from '../../actions/teams';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { GrAdd } from 'react-icons/gr';


class TeamInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 'participants',
            selectedFeature: '',
            selectedIteration: '',
            showNewStory: false,
            tempNewFeature: '',
            tempNewStory: '',
            showNewRisk: false,
            tempRisk: '',
            showNewParticipant: false,
            tempParticipant: '',
            showNewObjective: false,
            tempObjective: '',
        }
        this.page = this.page.bind(this);
        this.features = this.features.bind(this);
        this.iterations = this.iterations.bind(this);
        this.risks = this.risks.bind(this);
        this.participants = this.participants.bind(this);
        this.newStory = this.newStory.bind(this);
        this.newRisk = this.newRisk.bind(this);
        this.newParticipant = this.newParticipant.bind(this);
        this.piObjective = this.piObjective.bind(this);
        this.newObjective = this.newObjective.bind(this);
        this.calculateCapacity = this.calculateCapacity.bind(this);
        this.calculateLoad = this.calculateLoad.bind(this);
    }

    componentDidMount() {
    }

    calculateCapacity(iteration) {
        let total = 0;
        if (this.props.activeSimulation.simulation.teams[this.props.team].users) {
            for (var keys in this.props.activeSimulation.simulation.teams[this.props.team].users) {
                let data = this.props.activeSimulation.simulation.teams[this.props.team].users[keys]

                let num = (data.iterations && data.iterations[iteration]) ? 8 - Number(data.iterations[iteration]) : 8;
                total = (num) ? total + num : total;
            }
        }
        return total;
    }

    calculateLoad(iteration) {
        let total = 0;
        if (this.props.activeSimulation.simulation.teams[this.props.team].iterations[iteration].story) {
            for (var keys in this.props.activeSimulation.simulation.teams[this.props.team].iterations[iteration].story) {
                let featKey = this.props.activeSimulation.simulation.teams[this.props.team].iterations[iteration].story[keys].featKey
                let storyKey = this.props.activeSimulation.simulation.teams[this.props.team].iterations[iteration].story[keys].key

                let num = Number(this.props.activeSimulation.simulation.features[featKey].stories[storyKey].size);
                total = (num) ? total + num : total;
            }
        }
        return total;
    }

    newStory() {
        return (
            <Modal
                show={this.state.showNewStory}
                onHide={() => { this.setState({ ...this.state, showNewStory: false, tempNewFeature: '', tempNewStory: '' }) }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>New Iteration Story</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="container">
                        <Form.Group>
                            <Form.Label>Feature</Form.Label>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                onChange={(text) => { if (text.target.value !== '') { this.setState({ ...this.state, tempNewFeature: text.target.value }) } }}
                                defaultValue=''
                                custom
                            >
                                <option value='' disabled>Choose Feature</option>
                                {Object.keys(this.props.activeSimulation.simulation.teams[this.props.team].features).map((key) => {
                                    return (<option value={key} key={key}>{this.props.activeSimulation.simulation.teams[this.props.team].features[key]}</option>)
                                })}
                            </Form.Control>
                        </Form.Group>
                        {(this.state.tempNewFeature !== '') ?
                            <Form.Group>
                                <Form.Label>Story</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="my-1 mr-sm-2"
                                    onChange={(text) => { if (text.target.value !== '') { this.setState({ ...this.state, tempNewStory: text.target.value }) } }}
                                    defaultValue=''
                                    custom
                                >
                                    <option value='' disabled>Choose Story</option>
                                    {Object.keys(this.props.activeSimulation.simulation.features[this.state.tempNewFeature].stories).map((key) => {
                                        return (<option value={key} key={key}>{this.props.activeSimulation.simulation.features[this.state.tempNewFeature].stories[key].name}</option>)
                                    })}
                                </Form.Control>
                            </Form.Group>
                            : <></>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {(this.state.tempNewFeature !== '' && this.state.tempNewStory !== '') ?
                        <Button variant="primary" onClick={() => { this.props.handleAddTeamIterationStory(this.props.activeSimulation.simulation.key, this.props.team, this.state.selectedIteration, this.state.tempNewStory, this.state.tempNewFeature); this.setState({ ...this.state, showNewStory: false, tempNewFeature: '', tempNewStory: '' });}}>
                            Create
                    </Button>
                        : <></>}
                    <Button variant="secondary" onClick={() => { this.setState({ ...this.state, showNewStory: false, tempNewFeature: '', tempNewStory: '' }) }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    newRisk() {
        return (
            <Modal
                show={this.state.showNewRisk}
                onHide={() => { this.setState({ ...this.state, showNewRisk: false, tempRisk: ''}) }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>New Risk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="container">
                        <Form.Group>
                            <Form.Label>Risk Name</Form.Label>
                            <Form.Group controlId="riskName">
                                <Form.Control type='username' placeholder='New Risk Name' onChange={(text) => { this.setState({ ...this.state, tempRisk: text.target.value }) }} />
                            </Form.Group>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { this.props.handleAddTeamRisk(this.props.activeSimulation.simulation.key, this.props.team, this.state.tempRisk); this.setState({ ...this.state, showNewRisk: false, tempRisk: ''}); }}>
                            Create
                    </Button>
                    <Button variant="secondary" onClick={() => { this.setState({ ...this.state, showNewRisk: false, tempRisk: ''}) }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    newParticipant() {
        return (
            <Modal
                show={this.state.showNewParticipant}
                onHide={() => { this.setState({ ...this.state, showNewParticipant: false, tempParticipant: '' }) }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>New Participant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="container">
                        <Form.Group>
                            <Form.Label>Participant Name</Form.Label>
                            <Form.Group controlId="ParticipantName">
                                <Form.Control type='username' placeholder='New Participant Name' onChange={(text) => { this.setState({ ...this.state, tempParticipant: text.target.value }) }} />
                            </Form.Group>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { this.props.handleAddTeamUser(this.props.activeSimulation.simulation.key, this.props.team, this.state.tempParticipant); this.setState({ ...this.state, showNewParticipant: false, tempParticipant: '' }); }}>
                        Create
                    </Button>
                    <Button variant="secondary" onClick={() => { this.setState({ ...this.state, showNewParticipant: false, tempParticipant: '' }) }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    newObjective() {
        return (
            <Modal
                show={this.state.showNewObjective}
                onHide={() => { this.setState({ ...this.state, showNewObjective: false, tempObjective: '' }) }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>New PI Objective</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="container">
                        <Form.Group>
                            <Form.Label>PI Objective Name</Form.Label>
                            <Form.Group controlId="PIName">
                                <Form.Control type='username' placeholder='New PI Objective Name' onChange={(text) => { this.setState({ ...this.state, tempObjective: text.target.value }) }} />
                            </Form.Group>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { this.props.handleAddTeamPIObjective(this.props.activeSimulation.simulation.key, this.props.team, this.state.tempObjective); this.setState({ ...this.state, showNewObjective: false, tempObjective: '' }); }}>
                        Create
                    </Button>
                    <Button variant="secondary" onClick={() => { this.setState({ ...this.state, showNewObjective: false, tempObjective: '' }) }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    iterations() {
        let newIterationName = (this.props.activeSimulation.simulation.teams[this.props.team].iterations)
            ? "1." + String(Object.keys(this.props.activeSimulation.simulation.teams[this.props.team].iterations).length + 1)
            : "1.1";
        let features = this.props.activeSimulation.simulation.features;
        let stories = [];

        if (this.props.activeSimulation.simulation.teams[this.props.team].iterations && this.state.selectedIteration !== '') {
            if (this.props.activeSimulation.simulation.teams[this.props.team].iterations[this.state.selectedIteration].story) {
                for (var key in this.props.activeSimulation.simulation.teams[this.props.team].iterations[this.state.selectedIteration].story) {
                    let story = this.props.activeSimulation.simulation.teams[this.props.team].iterations[this.state.selectedIteration].story[key];
                    stories.push(
                        <Row key={key + 'st'}>
                            <Col>
                                <Card.Title style={{ fontSize: '14px' }}>{features[story.featKey].name}</Card.Title>
                            </Col>
                            <Col>
                                <Card.Title style={{ fontSize: '14px' }}>{features[story.featKey].stories[story.key].name}</Card.Title>
                            </Col>
                            <Col>
                                <Card.Title style={{ fontSize: '14px' }}>{features[story.featKey].stories[story.key].size}</Card.Title>
                            </Col>
                            <Col>
                                <Form.Control
                                    as="select"
                                    className="my-1 mr-sm-2"
                                    onChange={(text) => { this.props.handleUpdateActiveStory(this.props.activeSimulation.simulation.key, story.featKey, story.key, { ...features[story.featKey].stories[story.key], type: text.target.value }) }}
                                    value={(features[story.featKey].stories[story.key].type) ? features[story.featKey].stories[story.key].type : ''}
                                    custom
                                >
                                    <option value={''} disabled>Choose</option>
                                    <option value={'userstory'}>User Story</option>
                                    <option value={'maintenance'}>Maintenance</option>
                                    <option value={'exploration'}>Exploration</option>
                                    <option value={'infrastructure'}>Infrastructure Enabler</option>
                                    <option value={'dependency'}>Dependency</option>
                                </Form.Control>
                            </Col>
                        </Row>
                    )
                }
            }
        }
                    
                    let temp = [
                        <div key={'iterationshow'}>
            <Form inline style={{ margin: '20px' }}>
                <Form.Control
                    as="select"
                    className="my-1 mr-sm-2"
                    onChange={(text) => { if (text.target.value !== '') { this.setState({ ...this.state, selectedIteration: text.target.value }) } }}
                    value={this.state.selectedIteration}
                    custom
                >
                    <option value='' disabled>Choose Iteration</option>
                        {(this.props.activeSimulation.simulation.teams[this.props.team].iterations) ?
                            Object.keys(this.props.activeSimulation.simulation.teams[this.props.team].iterations).map((key) => {
                        return (<option value={key} key={key}>{this.props.activeSimulation.simulation.teams[this.props.team].iterations[key].name}</option>)
                    }) : <></>}
                    </Form.Control>
                    <Button variant="outline-success" style={{ marginLeft: '10px' }} onClick={() => { this.props.handleAddTeamIteration(this.props.activeSimulation.simulation.key, this.props.team, newIterationName) }}>
                    Create Iteration
                    </Button>
                            </Form>
                    {(this.state.selectedIteration !== '') ?
                        <Container style={{ height: '100%', width: '100%', paddingTop: '20px', overflowY: 'auto' }} key={'iterationcontainer'}>
                            <Row>
                                <Col>
                                    <Card.Title style={{ fontSize: '14px' }}>Feature</Card.Title>
                                </Col>
                                <Col>
                                    <Card.Title style={{ fontSize: '14px' }}>Story</Card.Title>
                                </Col>
                                <Col>
                                    <Card.Title style={{ fontSize: '14px' }}>Estimate</Card.Title>
                                </Col>
                                <Col>
                                    <Card.Title style={{ fontSize: '14px' }}>Story Type</Card.Title>
                                </Col>
                            </Row>
                            {stories}
                            <Row>
                                <Col>
                                    <GrAdd onClick={() => { this.setState({ ...this.state, showNewStory: true }) }} /> Add Story
                                </Col>
                                        <Col>
                                            Capacity: {this.calculateCapacity(this.state.selectedIteration)}
                                </Col>
                                        <Col>
                                            Load: {this.calculateLoad(this.state.selectedIteration)}
                                </Col>
                                        <Col>
                                </Col>
                        </Row>
                        </Container>
                        : <></>}
                </div>
        ];


        return temp;
    }

    piObjective() {
        let objectives = [];

        if (this.props.activeSimulation.simulation.teams[this.props.team].piObjectives) {
            for (var key in this.props.activeSimulation.simulation.teams[this.props.team].piObjectives) {
                let objective = key;
                objectives.push(
                    <Row key={key + 'obj'}>
                        <Col>
                            <Card.Title style={{ fontSize: '14px' }}>{this.props.activeSimulation.simulation.teams[this.props.team].piObjectives[key].name}</Card.Title>
                        </Col>
                        <Col>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                onChange={(text) => { this.props.handleUpdateTeamPIObjective(this.props.activeSimulation.simulation.key, this.props.team, objective, { type: text.target.value }) }}
                                value={(this.props.activeSimulation.simulation.teams[this.props.team].piObjectives[key].type) ? this.props.activeSimulation.simulation.teams[this.props.team].piObjectives[key].type : ''}
                                custom
                            >
                                <option value={''} disabled>Choose</option>
                                <option value={'committed'}>Committed</option>
                                <option value={'uncommitted'}>Uncommitted</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                onChange={(text) => { this.props.handleUpdateTeamPIObjective(this.props.activeSimulation.simulation.key, this.props.team, objective, { value: text.target.value }) }}
                                value={(this.props.activeSimulation.simulation.teams[this.props.team].piObjectives[key].value) ? this.props.activeSimulation.simulation.teams[this.props.team].piObjectives[key].value : ''}
                                custom
                            >
                                <option value={''} disabled>Choose</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </Form.Control>
                        </Col>
                    </Row>
                )
            }
        }

        return (
            <Container style={{ height: '100%', width: '100%', paddingTop: '20px', overflowY: 'auto' }} key={'picontainer'}>
                <Row>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>PI Objective</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Type</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Business Value</Card.Title>
                    </Col>
                </Row>
                {objectives}
                <Row>
                    <GrAdd onClick={() => { this.setState({ ...this.state, showNewObjective: true }) }} /> Add PI Objective
                            </Row>
            </Container>
        )
    }

    risks() {
        let risks = [];

        if (this.props.activeSimulation.simulation.teams[this.props.team].risks) {
            for (var key in this.props.activeSimulation.simulation.teams[this.props.team].risks) {
                let risk = key;
                risks.push(
                    <Row key={key + 'risks'}>
                        <Col>
                            <Card.Title style={{ fontSize: '14px' }}>{this.props.activeSimulation.simulation.teams[this.props.team].risks[key].name}</Card.Title>
                        </Col>
                        <Col>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                onChange={(text) => { this.props.handleUpdateTeamRisk(this.props.activeSimulation.simulation.key, this.props.team, risk, {type: text.target.value}) }}
                                value={(this.props.activeSimulation.simulation.teams[this.props.team].risks[risk].type) ? this.props.activeSimulation.simulation.teams[this.props.team].risks[risk].type : ''}
                                custom
                            >
                                <option value={''} disabled>Choose</option>
                                <option value={'team'}>Team Risk</option>
                                <option value={'program'}>Program Risk</option>
                            </Form.Control>
                        </Col>
                    </Row>
                )
            }
        }

        return (
            <Container style={{ height: '100%', width: '100%', paddingTop: '20px', overflowY: 'auto' }} key={'riskcontainer'}>
                <Row>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Risk</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Type</Card.Title>
                    </Col>
                </Row>
                {risks}
                <Row>
                    <GrAdd onClick={() => { this.setState({ ...this.state, showNewRisk: true }) }} /> Add Risk
                            </Row>
            </Container>
            )
    }

    participants() {
        let participants = [];
        let newIterationName = (this.props.activeSimulation.simulation.teams[this.props.team].iterations)
            ? "1." + String(Object.keys(this.props.activeSimulation.simulation.teams[this.props.team].iterations).length + 1)
            : "1.1";

        if (this.props.activeSimulation.simulation.teams[this.props.team].users) {
            for (var keyIteration in this.props.activeSimulation.simulation.teams[this.props.team].iterations) {
                let iteration = keyIteration;
                participants.push(<>
                    <Row key={keyIteration + '1u'}>
                        Iteration: {this.props.activeSimulation.simulation.teams[this.props.team].iterations[keyIteration].name}
                    </Row>
                    <Row>
                        <Col>
                            <Card.Title style={{ fontSize: '14px' }}>User</Card.Title>
                        </Col>
                        <Col>
                            <Card.Title style={{ fontSize: '14px' }}>Initial Points</Card.Title>
                        </Col>
                        <Col>
                            <Card.Title style={{ fontSize: '14px' }}>Holidays/PTO Days</Card.Title>
                        </Col>
                        <Col>
                            <Card.Title style={{ fontSize: '14px' }}>Capacity</Card.Title>
                        </Col>
                    </Row>
                </>)
                for (var key in this.props.activeSimulation.simulation.teams[this.props.team].users) {
                    let user = key;
                    participants.push(
                        <Row key={keyIteration + key + '1us'}>
                            <Col>
                                {this.props.activeSimulation.simulation.teams[this.props.team].users[key].name}
                            </Col>
                            <Col>
                                8
                            </Col>
                            <Col>
                                <Form.Control
                                    as="select"
                                    className="my-1 mr-sm-2"
                                    onChange={(text) => { this.props.handleUpdateTeamUser(this.props.activeSimulation.simulation.key, this.props.team, user, {[iteration]: text.target.value }) }}
                                    value={(this.props.activeSimulation.simulation.teams[this.props.team].users[key].iterations) ? this.props.activeSimulation.simulation.teams[this.props.team].users[key].iterations[keyIteration] : 0} 
                                    custom
                                >
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                {8 - Number((this.props.activeSimulation.simulation.teams[this.props.team].users[key].iterations) ? (this.props.activeSimulation.simulation.teams[this.props.team].users[key].iterations[keyIteration]) ? this.props.activeSimulation.simulation.teams[this.props.team].users[key].iterations[keyIteration] : 0 : 0)}
                            </Col>
                        </Row>
                    )
                }
            }
        }

        return (<>
            <div style={{ paddingTop: '20px' }}>
                <Button variant="outline-secondary" style={{ marginLeft: '10px' }} onClick={() => { this.setState({ ...this.state, showNewParticipant: true }) }}>
                    Create User
                </Button>
                <Button variant="outline-secondary" style={{ marginLeft: '10px' }} onClick={() => { this.props.handleAddTeamIteration(this.props.activeSimulation.simulation.key, this.props.team, newIterationName) }}>
                    Create Iteration
                </Button>
            </div>
            <Container style={{ height: '100%', width: '100%', paddingTop: '20px', overflowY: 'auto' }} key={'usercontainer1'}>
                {participants}
            </Container>
            </>
        )
    }

    page() {
        switch (this.state.selectedPage) {
            case 'iterations':
                return this.iterations();
            case 'risks':
                return this.risks();
            case 'participants':
                return this.participants();
            case 'PIObjective':
                return this.piObjective();
            default:
                return this.iterations();
        }
    }

    features() {
        let stories = [];
        let feature = this.props.activeSimulation.simulation.features[this.state.selectedFeature];
        
        if(this.props.activeSimulation.simulation.features[this.state.selectedFeature].stories !== ''){
            for (var key in this.props.activeSimulation.simulation.features[this.state.selectedFeature].stories) {
                let data = this.props.activeSimulation.simulation.features[this.state.selectedFeature].stories;
                let story = key;
                let string = "As a " + data[key].as + ", I want to " + data[key].i + " so that " + data[key].so;
                stories.push(
                    <Card key={key + 'store'}>
                        <Card.Body>
                            <Card.Header>
                                <strong>{data[key].name}</strong>
                                <div style={{ width: '150px', right: '10px', top: '10px', position: 'absolute', height: '20px' }}>
                                    <InputGroup>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        onChange={(text) => { this.props.handleUpdateActiveStory(this.props.activeSimulation.simulation.key, this.state.selectedFeature, story, {...data[story], size: text.target.value}) }}
                                            value={(data[key].size) ? data[key].size : ''}
                                        custom
                                        >
                                        <option value={''} disabled>Choose</option>
                                            <option value={1}>Size: 1</option>
                                            <option value={2}>Size: 2</option>
                                            <option value={3}>Size: 3</option>
                                            <option value={5}>Size: 5</option>
                                            <option value={8}>Size: 8</option>
                                            <option value={13}>Size: 13</option>
                                            <option value={20}>Size: 20</option>
                                            <option value={40}>Size: 40</option>
                                            <option value={100}>Size: 100</option>
                                        </Form.Control>
                                    </InputGroup>
                                </div>   
                            </Card.Header>
                            <p>{string}</p>
                        </Card.Body>
                    </Card>
                )
            }
        }

        return (
            <div>
                <p style={{ paddingTop: '5px' }}><strong>Priority: </strong>{feature.priority}</p>
            <p><strong>Description: </strong>{feature.desc}</p>
                <p><strong>Benefit: </strong>{feature.benefit}</p>
                <div style={{ overflowY: 'auto', maxHeight: '475px' }}>
                    {stories}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{ width: '100vw', position: 'absolute', height: '75%' }}>
                {(this.props.activeSimulation.simulation.teams[this.props.team].features) ? <>
                    {this.newStory()}
                    {this.newRisk()}
                    {this.newParticipant()}
                    {this.newObjective()}
                    {(this.props.activeSimulation.simulation.teams[this.props.team].features) ?
                        <div>
                            <Card style={{ margin: '20px', width: '30%', height: '40%' }}>
                                <Card.Body>
                                    <Card.Header>
                                        <Nav variant="tabs" activeKey={this.state.selectedFeature} onSelect={(eventKey) => { this.setState({ ...this.state, selectedFeature: eventKey }) }}>
                                            {Object.keys(this.props.activeSimulation.simulation.teams[this.props.team].features).map((l) => {
                                                return (
                                                    <Nav.Item key={l} >
                                                        <Nav.Link eventKey={l}>
                                                            {this.props.activeSimulation.simulation.teams[this.props.team].features[l]}
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                )
                                            })}
                                        </Nav>
                                    </Card.Header>
                                    {(this.state.selectedFeature !== '') ?
                                        this.features()
                                        : <></>}
                                </Card.Body>
                            </Card>
                            <Card style={{ margin: '20px', width: '60%', height: '100%', marginLeft: '35%', position: 'absolute', top: '0' }}>
                                <Card.Body>
                                    <Card.Header>
                                        <Nav variant="tabs" activeKey={this.state.selectedPage} onSelect={(eventKey) => { this.setState({ ...this.state, selectedPage: eventKey }) }}>
                                            <Nav.Item>
                                                <Nav.Link eventKey={'participants'}>
                                                    Participants
                                    </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey={'iterations'}>
                                                    Iterations
                                    </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey={'risks'}>
                                                    Risks
                                    </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey={'PIObjective'}>
                                                    PI Objectives
                                    </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Card.Header>
                                    <div style={{ overflowY: 'auto', maxHeight: '94%' }}>
                                        {this.page()}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        : <></>}
                </> : <>

                        <h1 style={{marginLeft: '20px'}}> No Features Assigned </h1>

                    </>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeSimulation: state.activeSimulation
    }
}

export default connect(mapStateToProps, {
    handleAddTeamIteration, handleUpdateTeamIteration, handleDeleteTeamIteration,
    handleAddTeamRisk, handleUpdateTeamRisk, handleDeleteTeamRisk,
    handleAddTeamIterationStory, handleUpdateActiveStory, handleDeleteTeamIterationStory,
    handleAddTeamUser, handleUpdateTeamUser, handleDeleteTeamUser,
    handleAddTeamPIObjective, handleUpdateTeamPIObjective, handleDeleteTeamPIObjective
})(TeamInfo);