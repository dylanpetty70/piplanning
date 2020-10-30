import React, { Component } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import Page from '../viewPage/main';
import { connect } from 'react-redux';
import { handleGrabTemplateSimulation, handleGrabTemplateSimulationOptions } from '../../actions/simulation';


class TemplateSimulation extends Component {

    constructor(props) {
        super(props);
        this.state = { status: false };
    }

    componentDidMount() {
        this.props.handleGrabTemplateSimulationOptions();
        setTimeout(() => {
            this.setState({ status: true });
        }, 600)
    }

    render() {
        return (
            <div>
                {(this.state.status) ?
                    <Page /> :
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
    return {}
}

export default connect(mapStateToProps, { handleGrabTemplateSimulation, handleGrabTemplateSimulationOptions })(TemplateSimulation);