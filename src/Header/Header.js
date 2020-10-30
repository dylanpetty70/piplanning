import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router';

class Header extends Component {

	constructor(props){
		super(props);
        this.state = {name: ''};
	}

	componentDidMount(){
		
	}

	render(){
		return(
			<div className="App">
				<Navbar collapseOnSelect expand="lg" style={{backgroundColor: '#296d98'}}>
                  <Navbar.Brand href="/" style={{color: 'white'}}>PI Planning Simulation</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {(this.props.location.pathname.substring(0,5) !== '/view') ?
                            <Nav className="mr-auto">
                                <Nav.Link href="/" style={{ color: 'white' }}>Template Simulations</Nav.Link>
                                <Nav.Link href="/activesimulations" style={{ color: 'white' }}>Active Simulations</Nav.Link>
                            </Nav>
                            : <></>}
                  </Navbar.Collapse>
                </Navbar>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
	}
}

export default withRouter(connect(mapStateToProps, {})(Header));