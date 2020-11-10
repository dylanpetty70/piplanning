import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGrabTemplateSimulation, handleNewTemplateSimulation } from '../../actions/simulation';
import { handleNewTemplateFeature, handleDeleteTemplateFeature, handleUpdateTemplateFeature, handleNewTemplateStory, handleUpdateTemplateStory } from '../../actions/features';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const sizing = [1, 2, 3, 5, 8, 13, 20, 40, 100];
const types = ['None', 'Enabler', 'Spike']

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            featName: '',
            featPriority: '',
            featDesc: '',
            featBenefit: '',
            storyName: '',
            storySize: '',
            storyType: '',
            storyAs: '',
            storyI: '',
            storySo: ''
        }
        this.features = this.features.bind(this);
        this.story = this.story.bind(this);
        this.saveStory = this.saveStory.bind(this);
        this.saveFeature = this.saveFeature.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.feature !== this.props.feature){
            this.setState({
                featName: '',
                featPriority: '',
                featDesc: '',
                featBenefit: '',
                storyName: '',
                storySize: '',
                storyType: '',
                storyAs: '',
                storyI: '',
                storySo: ''
            })

            document.getElementById('featureName').value = (this.props.templateSimulation.simulation.features[this.props.feature].name) ? this.props.templateSimulation.simulation.features[this.props.feature].name : '';
            document.getElementById('featurePriority').value = (this.props.templateSimulation.simulation.features[this.props.feature].priority) ? this.props.templateSimulation.simulation.features[this.props.feature].priority : '';
            document.getElementById('featureDesc').value = (this.props.templateSimulation.simulation.features[this.props.feature].desc) ? this.props.templateSimulation.simulation.features[this.props.feature].desc : '';
            document.getElementById('featureBenefit').value = (this.props.templateSimulation.simulation.features[this.props.feature].benefit) ? this.props.templateSimulation.simulation.features[this.props.feature].benefit: '';


        } else if(prevProps.story !== this.props.story){
            this.setState({
                storyName: '',
                storySize: '',
                storyType: '',
                storyAs: '',
                storyI: '',
                storySo: ''
            })
                    
            document.getElementById('name').value = (this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].name) ? this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].name : '';
            document.getElementById('size').value = (this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].size) ? this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].size : '';
            document.getElementById('type').value = (this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].type) ? this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].type : '';
            document.getElementById('as').value = (this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].as) ? this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].as: '';
            document.getElementById('i').value = (this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].i) ? this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].i : '';
            document.getElementById('so').value = (this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].so) ? this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story].so: '';
        
        }
    }

    saveStory() {
        let holder = this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story];
        let data = {
            key: this.props.story,
            name: (this.state.storyName === '' && holder.name) ? holder.name : this.state.storyName,
            size: (this.state.storySize === '' && holder.size) ? holder.size : this.state.storySize,
            type: (this.state.storyType === '' && holder.type) ? holder.type : this.state.storyType,
            as: (this.state.storyAs === '' && holder.as) ? holder.as : this.state.storyAs,
            i: (this.state.storyI === '' && holder.i) ? holder.i : this.state.storyI,
            so: (this.state.storySo === '' && holder.so) ? holder.so : this.state.storySo
        };
        this.props.handleUpdateTemplateStory(this.props.templateSimulation.simulation.key, this.props.feature, this.props.story, data);
    }

    saveFeature() {
        let holder = this.props.templateSimulation.simulation.features[this.props.feature];
        let data = {
            key: this.props.feature,
            stories: (holder.stories) ? holder.stories : '',
            name: (this.state.featName === '' && holder.name) ? holder.name : this.state.featName,
            priority: (this.state.featPriority === '' && holder.priority) ? holder.priority : String(this.state.featPriority),
            desc: (this.state.featDesc === '' && holder.desc) ? holder.desc : this.state.featDesc,
            benefit: (this.state.featBenefit === '' && holder.benefit) ? holder.benefit : this.state.featBenefit
        };
        this.props.handleUpdateTemplateFeature(this.props.templateSimulation.simulation.key, this.props.feature, data);
    }

    story() {
        let temp = [];
        if (this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story]) {
            let data = this.props.templateSimulation.simulation.features[this.props.feature].stories[this.props.story];
            temp.push(
                <div key={'story in edit'}>
                    <Button variant='outline-success' style={{ float: 'right' }} onClick={() => {this.saveStory()}}>Save Story</Button>
                    <h5 style={{ margin: '20px' }}>Story: {data.name}</h5>
                    <Form>
                        <Container>
                            <Row>
                                <Col sm={2}>
                                    <Form.Label>Name</Form.Label>
                                </Col>
                                <Col sm={2}>
                                    <Form.Label>Size</Form.Label>
                                </Col>
                                <Col sm={2}>
                                    <Form.Label>Type</Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <Form.Control id='name' placeholder={data.name} onChange={(text) => { this.setState({ ...this.state, storyName: text.target.value }); }} />
                                </Col>
                                <Col sm={2}>
                                    <Form.Control id='size' as="select" defaultValue={(data.size) ? data.size : ''} onChange={(text) => { this.setState({...this.state, storySize: text.target.value}); }}>
                                        <option key='chosePri' value=''>Choose</option>
                                        {sizing.map((l) => (
                                            <option key={'sizing' + l} value={l}>{l}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col sm={2}>
                                    <Form.Control id='type' as="select" defaultValue={(data.type) ? data.type : ''} onChange={(text) => { this.setState({ ...this.state, storyType: text.target.value }); }}>
                                        <option key='chosePri' value=''>Choose</option>
                                        {types.map((l) => (
                                            <option key={'types' + l} value={l}>{l}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col sm={4}>
                                    <Form.Label>As a...</Form.Label>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label> I want to...</Form.Label>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>So that...</Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Form.Control id='as' as='textarea' rows='4' placeholder={(data.as) ? data.as : ''} onChange={(text) => { this.setState({ ...this.state, storyAs: text.target.value }); }} />
                                </Col>
                                <Col sm={4}>
                                    <Form.Control id='i' as='textarea' rows='4' placeholder={(data.i) ? data.i : ''} onChange={(text) => { this.setState({ ...this.state, storyI: text.target.value }); }} />
                                </Col>
                                <Col sm={4}>
                                    <Form.Control id='so' as='textarea' rows='4' placeholder={(data.so) ? data.so : ''} onChange={(text) => { this.setState({ ...this.state, storySo: text.target.value }); }} />
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </div>
            )
        }

        return temp;
    }


    features() {
        let temp = [];
        if (this.props.feature !== '') {
            let data = this.props.templateSimulation.simulation.features[this.props.feature];
            temp.push(
                <div key={'feat in edit'}>
                    <Button variant='outline-success' style={{ float: 'right' }} onClick={() => { this.saveFeature() }}>Save Feature</Button>
                    <h5 style={{margin: '20px'}}>Feature: {data.name}</h5>
                    <Form>
                        <Container>
                            <Row>
                                <Col sm={2}>
                                    <Form.Label>Name</Form.Label>
                                </Col>
                                <Col sm={2}>
                                    <Form.Label>Priority</Form.Label>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>Desc</Form.Label>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>Benefit Hypothesis</Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <Form.Control id='featureName' placeholder={data.name} onChange={(text) => { this.setState({ ...this.state, featName: text.target.value }); }} />
                                </Col>
                                <Col sm={2}>
                                    <Form.Control id='featurePriority' as="select" defaultValue={(data.priority) ? data.priority : ''} onChange={(text) => { this.setState({ ...this.state, featPriority: text.target.value }); }}>
                                        <option key='chosePri' value=''>Choose</option>
                                        {Object.keys(this.props.templateSimulation.simulation.features).map((l, i) => (
                                            <option key={l} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col sm={4}>
                                    <Form.Control id='featureDesc' as='textarea' rows='4' placeholder={(data.desc) ? data.desc : ''} onChange={(text) => { this.setState({ ...this.state, featDesc: text.target.value }); }} />
                                </Col>
                                <Col sm={4}>
                                    <Form.Control id='featureBenefit' as='textarea' rows='4' placeholder={(data.benefit) ? data.benefit : ''} onChange={(text) => { this.setState({ ...this.state, featBenefit: text.target.value }); }} />
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </div>
            )
        }

        return temp;
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
            <Card>
                <Card.Body>
                    <Card.Header>
                        <Form inline>
                            <Card.Title style={{ marginRight: '40px' }}>Edit</Card.Title>
                        </Form>
                    </Card.Header>
                        {(this.props.feature !== '' && this.props.templateSimulation.simulation.features[this.props.feature]) ? this.features() : <></>}
                        {(this.props.feature !== '' && this.props.templateSimulation.simulation.features[this.props.feature] && this.props.story !== '' && this.props.templateSimulation.simulation.features[this.props.feature].stories) ? <>
                            <br />
                            <hr />
                            <br />
                            {this.story()}
                            </>
                        : <></>}
                </Card.Body>
            </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        templateSimulation: state.templateSimulation
    }
}

export default connect(mapStateToProps, { handleGrabTemplateSimulation, handleNewTemplateSimulation, handleNewTemplateFeature, handleDeleteTemplateFeature, handleUpdateTemplateFeature, handleNewTemplateStory, handleUpdateTemplateStory })(Main);