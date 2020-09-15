import React, { Component } from 'react';
import ProjectList from './projects/ProjectList';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './layout/Navbar';
import Dashboard from './dashboard/Dashboard';
import Profile from './profile/Profile';
import TaskLayout from './tasks/TaskLayout';
import Four04 from './core/Four04';

class App extends Component {
  title = 'Simple Project Manager';

  profile = {
    name: 'James Hansen',
    bio: 'Great great cat'
  }

  render() {
    return (
      <main className="container pt-3">
          <Navbar title={this.title} />
          <Switch>
            <Route path="/" exact component={ProjectList} />
            <Redirect from="/tasks/list" to="/tasks" />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/profile" exact render={() => (<Profile profile={this.profile} />) } />
            <Route path="/tasks" component={TaskLayout}  />
            <Route component={Four04} />
          </Switch>
      </main>
    );
  }
}

export default App;
