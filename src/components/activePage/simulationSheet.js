import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleUpdateActiveStory } from '../../actions/features';
import { handleNewTeam, handleAddTeamFeature, handleAddTeamIteration, handleUpdateTeamIteration, handleDeleteTeam, handleDeleteTeamFeature } from '../../actions/teams';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { MdDelete } from 'react-icons/md';
import CompleteView from './completeView';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempNewTeam: '',
            tempSelectedTeam: '',
            tempSelectedFeat: ''
        }
        this.teams = this.teams.bind(this);
    }

    componentDidMount() {
    }

    teams() {
        let temp = [];
        let tempStories = [];
        if (this.props.activeSimulation.simulation.teams) {
            for (var key in this.props.activeSimulation.simulation.teams) {
                let keyTemp = key;
                temp.push(
                    <Nav.Item key={key}>
                        <Nav.Link eventKey={key}>
                            {this.props.activeSimulation.simulation.teams[key].name}
                            {(this.state.tempSelectedTeam === key) ? <MdDelete style={{ float: 'right' }} onClick={() => { this.props.handleDeleteTeam(this.props.activeSimulation.simulation.key, keyTemp) }} /> : <></>}
                        </Nav.Link>
                    </Nav.Item>
                )
            }
            if (this.state.tempSelectedTeam !== '' && this.props.activeSimulation.simulation.teams[this.state.tempSelectedTeam]) {
                if (this.props.activeSimulation.simulation.teams[this.state.tempSelectedTeam].features) {
                    for (var key1 in this.props.activeSimulation.simulation.teams[this.state.tempSelectedTeam].features) {
                        let key2 = key1;
                        tempStories.push(
                            <Row style={{ marginBottom: '5px' }} key={key2}>
                                <Button variant="secondary" block style={{ marginLeft: '5px', width: '80%', float: 'right', marginBottom: '5px', marginRight: '10px' }} onClick={() => { this.setState({ ...this.state, tempSelectedFeat: key2 }) }}>
                                    {this.props.activeSimulation.simulation.teams[this.state.tempSelectedTeam].features[key1]}
                                    {(this.state.tempSelectedFeat === key2) ? <MdDelete style={{ float: 'right' }} onClick={() => { this.props.handleDeleteTeamFeature(this.props.activeSimulation.simulation.key, this.state.tempSelectedTeam, key2) }} /> : <></>}
                                </Button>
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
                            <Card.Title style={{ marginRight: '40px' }}>Teams</Card.Title>
                            <Form.Group controlId="simulationName">
                                <Form.Control type='username' placeholder='New Team Name' onChange={(text) => { this.setState({ ...this.state, tempNewTeam: text.target.value }) }} />
                            </Form.Group>
                        <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={() => { if (this.state.tempNewTeam !== '') { this.props.handleNewTeam(this.props.activeSimulation.simulation.key, this.state.tempNewTeam); alert(this.state.tempNewTeam + ' Created!'); } }}>
                            Create Team
                        </Button>
                        </Form>
                    </Card.Header>
                    <div className="p-3" style={{ width: '30%', left: '0', overflowY: 'auto', backgroundColor: 'lightGrey', height: '93.5%'}}>
                        <Nav className="flex-column" variant="pills" onSelect={(eventKey) => { this.setState({ ...this.state, tempSelectedTeam: eventKey }) }}>
                            {temp}
                        </Nav>
                    </div>
                    {(this.state.tempSelectedTeam !== '' && this.props.activeSimulation.simulation.teams) ?
                        (this.props.activeSimulation.simulation.teams[this.state.tempSelectedTeam]) ? 
                        <div style={{ marginLeft: '30%', width: '65%', position: 'absolute', top: '100px'}}>
                            <Card.Header>
                                <Form inline>
                                        <Form.Group>
                                            <Form.Control
                                                as="select"
                                                className="my-1 mr-sm-2"
                                                onChange={(text) => { if (text.target.value !== '') { this.setState({ ...this.state, tempSelectedFeat: text.target.value }) } }}
                                                defaultValue=''
                                                custom
                                            >
                                                <option value='' disabled>Give Feature To Team</option>
                                                {Object.keys(this.props.activeSimulation.simulation.features).map((key) => {
                                                    return (<option value={key} key={key}>{this.props.activeSimulation.simulation.features[key].name}</option>)
                                                })}
                                            </Form.Control>
                                        </Form.Group>
                                        <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={() => { if (this.state.tempSelectedFeat !== '') { this.props.handleAddTeamFeature(this.props.activeSimulation.simulation.key, this.state.tempSelectedTeam, this.state.tempSelectedFeat, this.props.activeSimulation.simulation.features[this.state.tempSelectedFeat].name); } }}>
                                        Give Feature
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
                {this.teams()}
                <div style={{ position: 'absolute', width: '55vw', left: '42%', top: '20px', height: '100%' }}>
                    <CompleteView team={this.state.tempSelectedTeam} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeSimulation: state.activeSimulation
    }
}

export default connect(mapStateToProps, { handleUpdateActiveStory, handleNewTeam, handleAddTeamFeature, handleAddTeamIteration, handleUpdateTeamIteration, handleDeleteTeam, handleDeleteTeamFeature })(Main);