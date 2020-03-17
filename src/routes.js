import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import visualChart from './components/chart/visual_chart';
import upload from './components/upload/upload_file';
import {history} from './history'

export default class Routes extends React.Component {
    render() {
      return (
        <Router history={history}>         
                <Switch>
                   <Route path="/upload-file" component={upload} />
                   <Route path="/visual-charts" component={visualChart} />
                   <Route path="/" component={upload} />
                </Switch>
        </Router>
      )
    }
  }
  