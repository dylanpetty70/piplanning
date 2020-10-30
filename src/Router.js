import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import RedirectPage from "./components/404";
import TemplateSimulations from './components/HighLevel/templateSimulations';
import ActiveSimulations from './components/HighLevel/activeSimulations';
import ViewSimulation from './components/HighLevel/viewSimulation';


class Router extends Component {
    

    render() {
      return (
        <div>
            <Switch>
                  <Route exact path="/"><TemplateSimulations /></Route>
                  <Route exact path="/activesimulations"><ActiveSimulations /></Route>
                  <Route exact path="/viewsimulation/:id"><ViewSimulation /></Route>
                <Route path="*"> 
                    <RedirectPage/>
                </Route>
            </Switch>
        </div>
      );
   }
}

const mapStateToProps = state => {
	return{
	}
}

export default connect(mapStateToProps, {})(Router);
