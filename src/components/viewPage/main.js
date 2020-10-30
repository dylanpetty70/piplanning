import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleNewActiveSimulation, handleGrabActiveSimulation, handleDeleteActiveSimulation } from '../../actions/simulation';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router';
import TeamInfo from './teamInfo';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectTeam: '',
            status: true,
            ready: false
        }
    }

    componentDidMount() {
        this.props.handleGrabActiveSimulation(this.props.match.params.id);
        setTimeout(() => {
            this.setState({ ...this.state, ready: true})
        }, 500)
    }

    render() {
        return (
            <div>
                {(this.state.ready) ? 
                <div>
                <Form inline style={{ margin: '20px' }}>
                    <Form.Control
                        as="select"
                        className="my-1 mr-sm-2"
                        onChange={(text) => { if (text.target.value !== '') { this.setState({ ...this.state, selectTeam: text.target.value, status: false }); setTimeout(() => { this.setState({ ...this.state, status: true }) }, 1000) } }}
                        defaultValue=''
                        custom
                    >
                        <option value='' disabled>Choose Team</option>
                        {(this.props.activeSimulation.simulation.teams) ?
                                Object.keys(this.props.activeSimulation.simulation.teams).map((key) => {
                                    return (<option value={key} key={key}>{this.props.activeSimulation.simulation.teams[key].name}</option>)
                                })
                            : <></>}
                    </Form.Control>
                    </Form>
                    </div>
                    : <></>}
                {(this.state.selectTeam !== '') ?  
                    <TeamInfo team={this.state.selectTeam} />
                    : <></>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeSimulation: state.activeSimulation,
        templateSimulation: state.templateSimulation
    }
}

export default withRouter(connect(mapStateToProps, { handleNewActiveSimulation, handleGrabActiveSimulation, handleDeleteActiveSimulation })(Main));