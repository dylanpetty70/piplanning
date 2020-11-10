import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGrabTemplateSimulation, handleNewTemplateSimulation } from '../../actions/simulation';
import { handleNewTemplateFeature, handleDeleteTemplateFeature, handleUpdateTemplateFeature, handleNewTemplateStory, handleUpdateTemplateStory } from '../../actions/features';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 'iterations',
        }
        this.iterations = this.iterations.bind(this);
        this.pageSelection = this.pageSelection.bind(this);
        this.calculateCapacity = this.calculateCapacity.bind(this);
        this.calculateLoad = this.calculateLoad.bind(this);
        this.features = this.features.bind(this);
        this.storiesSized = this.storiesSized.bind(this);
        this.storiesAssigned = this.storiesAssigned.bind(this);
        this.piObjectives = this.piObjectives.bind(this);
        this.risks = this.risks.bind(this);
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

    iterations() {
        let temp = [];

        let rows = (this.props.activeSimulation.simulation.teams && this.props.activeSimulation.simulation.teams[this.props.team] && this.props.activeSimulation.simulation.teams[this.props.team].iterations) ?
            Object.keys(this.props.activeSimulation.simulation.teams[this.props.team].iterations).map((l, i) => {
                let data = this.props.activeSimulation.simulation.teams[this.props.team].iterations[l];
                return (
                    <Row key={'iterationrow' + i}>
                        <Col>
                            {this.props.activeSimulation.simulation.teams[this.props.team].name}
                        </Col>
                        <Col>
                            {data.name}
                        </Col>
                        <Col>
                            {this.calculateCapacity(l)}
                        </Col>
                        <Col>
                            {this.calculateLoad(l)}
                        </Col>
                    </Row>
                );
            })
            : [];

        temp.push(
            <Container style={{ height: '100%', width: '100%', paddingTop: '20px', overflowY: 'auto' }} key={'iterationcontainer'}>
                <Row>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Team</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Iteration</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Capacity</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Load</Card.Title>
                    </Col>
                </Row>
                {rows}
            </Container>
        );

        return temp;
    }

    storiesSized(feature) {
        let total = Object.keys(feature.stories).length;
        let count = 0;

        for (var key in feature.stories) {
            if (feature.stories[key].size) {
                count += 1;
            }
        }

        let percentage = Math.floor(100 * count / total);

        return String(percentage) + '%';
    }

    storiesAssigned(feature) {
        let team = this.props.activeSimulation.simulation.teams[this.props.team];
        let storiesAssigned = {};

        for (var key in team.iterations) {
            for (var key1 in team.iterations[key].story) {
                if (storiesAssigned[team.iterations[key].story[key1].featKey]) {
                    storiesAssigned[team.iterations[key].story[key1].featKey].push(team.iterations[key].story[key1].key);
                } else {
                    storiesAssigned[team.iterations[key].story[key1].featKey] = [team.iterations[key].story[key1].key];
                }
            }
        }

        let total = Object.keys(feature.stories).length;
        let overlap = (storiesAssigned[feature.key]) ? storiesAssigned[feature.key] : [];

        let percentage = Math.floor(100 * overlap.length / total);

        return String(percentage) + '%';
    }

    features() {
        let temp = [];

        let rows = (this.props.activeSimulation.simulation.teams && this.props.activeSimulation.simulation.teams[this.props.team] && this.props.activeSimulation.simulation.teams[this.props.team].features && this.props.activeSimulation.simulation.features) ?
            Object.keys(this.props.activeSimulation.simulation.teams[this.props.team].features).map((l, i) => {
                let data = this.props.activeSimulation.simulation.features[l];
                return (
                    <Row key={'iterationrow' + i}>
                        <Col>
                            {this.props.activeSimulation.simulation.teams[this.props.team].name}
                        </Col>
                        <Col>
                            {data.name}
                        </Col>
                        <Col>
                            {this.storiesSized(data)}
                        </Col>
                        <Col>
                            {this.storiesAssigned(data)}
                        </Col>
                    </Row>
                );
            })
            : [];

        temp.push(
            <Container style={{ height: '100%', width: '100%', paddingTop: '20px', overflowY: 'auto' }} key={'iterationcontainer'}>
                <Row>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Team</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Feature</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Stories Sized</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Stories Assigned</Card.Title>
                    </Col>
                </Row>
                {rows}
            </Container>
        );

        return temp;
    }

    piObjectives() {
        let temp = [];

        let rows = (this.props.activeSimulation.simulation.teams && this.props.activeSimulation.simulation.teams[this.props.team] && this.props.activeSimulation.simulation.teams[this.props.team].piObjectives) ?
            Object.keys(this.props.activeSimulation.simulation.teams[this.props.team].piObjectives).map((l, i) => {
                let data = this.props.activeSimulation.simulation.teams[this.props.team].piObjectives[l];
                return (
                    <Row key={'iterationrow' + i}>
                        <Col>
                            {this.props.activeSimulation.simulation.teams[this.props.team].name}
                        </Col>
                        <Col>
                            {data.name}
                        </Col>
                        <Col>
                            {data.type}
                        </Col>
                        <Col>
                            {data.value}
                        </Col>
                    </Row>
                );
            })
            : [];

        temp.push(
            <Container style={{ height: '100%', width: '100%', paddingTop: '20px', overflowY: 'auto' }} key={'iterationcontainer'}>
                <Row>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Team</Card.Title>
                    </Col>
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
                {rows}
            </Container>
        );

        return temp;
    }

    risks() {
        let temp = [];

        let rows = (this.props.activeSimulation.simulation.teams && this.props.activeSimulation.simulation.teams[this.props.team] && this.props.activeSimulation.simulation.teams[this.props.team].risks) ?
            Object.keys(this.props.activeSimulation.simulation.teams[this.props.team].risks).map((l, i) => {
                let data = this.props.activeSimulation.simulation.teams[this.props.team].risks[l];
                return (
                    <Row key={'iterationrow' + i}>
                        <Col>
                            {this.props.activeSimulation.simulation.teams[this.props.team].name}
                        </Col>
                        <Col>
                            {data.name}
                        </Col>
                        <Col>
                            {data.type}
                        </Col>
                        <Col>
                            {data.roam}
                        </Col>
                    </Row>
                );
            })
            : [];

        temp.push(
            <Container style={{ height: '100%', width: '100%', paddingTop: '20px', overflowY: 'auto' }} key={'iterationcontainer'}>
                <Row>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Team</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Risk</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>Type</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title style={{ fontSize: '14px' }}>ROAM</Card.Title>
                    </Col>
                </Row>
                {rows}
            </Container>
        );

        return temp;
    }

    pageSelection() {
        switch (this.state.selectedPage) {
            case 'iterations':
                return this.iterations();
            case 'features':
                return this.features();
            case 'risks':
                return this.risks();
            case 'piObjectives':
                return this.piObjectives();
            default:
                return this.iterations();
        }
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
            <Card>
                <Card.Body>
                    <Card.Header>
                        <Form>
                            <Card.Title style={{ marginRight: '40px' }}>Simulation Overview</Card.Title>
                                <Card.Subtitle style={{ marginRight: '40px' }}>Information will become available as the selected team creates the data</Card.Subtitle>
                                <br/>
                        </Form>
                            <Nav variant="tabs" activeKey={this.state.selectedPage} onSelect={(eventKey) => { this.setState({ ...this.state, selectedPage: eventKey }) }}>
                            <Nav.Item>
                                <Nav.Link eventKey={'iterations'}>
                                    Iterations
                                </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={'features'}>
                                        Features
                                </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={'risks'}>
                                        Risks
                                </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={'piObjectives'}>
                                        PI Objectives
                                </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        {this.pageSelection()}
                </Card.Body>
            </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeSimulation: state.activeSimulation
    }
}

export default connect(mapStateToProps, { handleGrabTemplateSimulation, handleNewTemplateSimulation, handleNewTemplateFeature, handleDeleteTemplateFeature, handleUpdateTemplateFeature, handleNewTemplateStory, handleUpdateTemplateStory })(Main);