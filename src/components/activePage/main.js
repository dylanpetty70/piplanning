import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleNewActiveSimulation, handleGrabActiveSimulation, handleDeleteActiveSimulation } from '../../actions/simulation';
import { handleChangeUserStatus } from '../../actions/userStatus';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SimulationSheet from './simulationSheet';
import PulseLoader from 'react-spinners/PulseLoader';
import { withRouter } from 'react-router';

const password = 'ACoEAccess';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNew: false,
            showDelete: false,
            tempNewName: '',
            tempNewTemplate: '',
            selectSim: '',
            status: true,
            tempPassword: '',
            tempPasswordCorrect: true
        }
        this.newSimulation = this.newSimulation.bind(this);
        this.deleteSimulation = this.deleteSimulation.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.userStatus = this.userStatus.bind(this);
    }

    userStatus() {
        return (
            <Modal
                show={!this.props.userStatus}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>ACoE Access Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="container">
                        <Form.Group controlId="simulationName">
                            <Form.Control type='password' placeholder='Password' onKeyPress={event => { if (event.key === "Enter") { event.preventDefault(); if (this.state.tempPassword === password) { this.props.handleChangeUserStatus(); } else { this.setState({ ...this.state, tempPasswordCorrect: false }); }} }} onChange={(text) => { this.setState({ ...this.state, tempPassword: text.target.value }) }} />
                            {(!this.state.tempPasswordCorrect) ? <Form.Text style={{ color: 'red' }}>Incorrect Password</Form.Text> : <></>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { if (this.state.tempPassword === password) { this.props.handleChangeUserStatus(); } else { this.setState({ ...this.state, tempPasswordCorrect: false }); } }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    newSimulation() {
        return (
            <Modal
                show={this.state.showNew}
                onHide={() => { this.setState({ ...this.state, showNew: false }) }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>New Active Simulation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="container">
                        <Form.Group controlId="simulationName">
                            <Form.Label>Simulation Name</Form.Label>
                            <Form.Control type='username' placeholder='Enter New Simulation Name' onChange={(text) => { this.setState({ ...this.state, tempNewName: text.target.value }) }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Choose Template Simulation to Use</Form.Label>
                            <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                                onChange={(text) => { if (text.target.value !== '') { this.setState({ ...this.state, tempNewTemplate: text.target.value }) } }}
                            defaultValue=''
                            custom
                            >
                                <option value='' disabled>Choose Template Simulation</option>
                                {Object.keys(this.props.templateSimulation.options).map((key) => {
                                    return (<option value={key} key={key}>{this.props.templateSimulation.options[key]}</option>)
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {(this.state.tempNewTemplate !== '' && this.state.tempNewName !== '') ?
                        <Button variant="primary" onClick={() => { this.props.handleNewActiveSimulation(this.state.tempNewName, this.state.tempNewTemplate); this.setState({ ...this.state, showNew: false, tempNewName: '', tempNewTemplate: '' }); alert(this.state.tempNewName + ' Created!'); }}>
                            Create
                    </Button>
                        : <></>}
                    <Button variant="secondary" onClick={() => { this.setState({ ...this.state, showNew: false, tempNewName: '', tempNewTemplate: '' }) }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    deleteSimulation() {
        return (
            <Modal
                show={this.state.showDelete}
                onHide={() => { this.setState({ ...this.state, showDelete: false }) }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Are you sure you want to delete {this.props.activeSimulation.simulation.activeName}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => { this.setState({ ...this.state, showDelete: false, selectSim: '' }); this.props.handleDeleteActiveSimulation(this.state.selectSim); }}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => { this.setState({ ...this.state, showDelete: false }) }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    copyToClipboard() {
        const el = document.createElement('textarea');
        const root = window.location.origin + '/viewsimulation/';
        el.value = root + this.props.activeSimulation.simulation.key;
        el.setAttribute('readOnly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('Copied: ' + root + this.props.activeSimulation.simulation.key);
    }

    render() {
        return (
            <div>
                {this.newSimulation()}
                {this.deleteSimulation()}
                {this.userStatus()}
                <Form inline style={{ margin: '20px' }}>
                    <Form.Control
                        as="select"
                        className="my-1 mr-sm-2"
                        onChange={(text) => { if (text.target.value !== '') { this.setState({ ...this.state, selectSim: text.target.value, status: false }); this.props.handleGrabActiveSimulation(text.target.value); setTimeout(() => { this.setState({ ...this.state, status: true }) }, 1000) } }}
                        defaultValue=''
                        custom
                    >
                        <option value='' disabled>Choose Active Simulation</option>
                        {Object.keys(this.props.activeSimulation.options).map((key) => {
                            return (<option value={key} key={key}>{this.props.activeSimulation.options[key]}</option>)
                        })}
                    </Form.Control>
                    <Button variant="outline-success" style={{ marginLeft: '10px' }} onClick={() => { this.setState({ ...this.state, showNew: true }) }}>
                        Create Active Simulation
                    </Button>
                    {(this.state.selectSim !== '') ? <>
                        <Button variant="outline-danger" style={{ marginLeft: '10px' }} onClick={() => { this.setState({ ...this.state, showDelete: true }) }}>
                            Delete Current Simulation
                        </Button>
                        <Button variant="outline-secondary" style={{ marginLeft: '10px' }} onClick={() => { this.copyToClipboard() }}>
                            Copy Simulation Link
                        </Button> </>
                        : <></>}
                </Form>
                {(this.state.status) ?
                    (this.state.selectSim !== '') ?
                        <SimulationSheet sim={this.state.selectSim} /> :
                        <></>

                    :
                    <PulseLoader
                        css={{ position: 'absolute', top: '40vh', left: '40vw' }}
                        size={100}
                        color={"#123abc"}
                        loading={true}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeSimulation: state.activeSimulation,
        templateSimulation: state.templateSimulation,
        userStatus: state.userStatus
    }
}

export default withRouter(connect(mapStateToProps, { handleNewActiveSimulation, handleGrabActiveSimulation, handleDeleteActiveSimulation, handleChangeUserStatus })(Main));