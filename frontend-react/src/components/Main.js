  require('normalize.css');
require('styles/main.scss');
require('styles/Header.scss');
import React from 'react';
import jQuery from 'jquery';
import ContentComponent from './Routing'
let yeomanImage = require('../images/yeoman.png');
class AppComponent extends React.Component {
  render() {
    return (
      <div className = "index" id="main">
        <HeaderComponent>
        </HeaderComponent>
        <ContentComponent>
        </ContentComponent>
      </div>
      );
  }
}

class HeaderComponent extends React.Component {

  handleClick (i) {
    this.setState({menu:!this.state.menu})

  }
  constructor(props) {
    super(props);
    this.state = { menu : false}
  }
  render() {
    return (
      <div className = "header" id="header">
        <div className="wrap row">
          <div className="left column">
            <div className="logo">
              <a href="#/">
                <img src="images/logo.png"></img>
                </a>
            </div>
            <div className="search-input-container">
              <div className="ui fluid search selection dropdown">
                <input name="wheretogo" type="hidden" />
                <i className="dropdown icon" />
                <div className="default text">
                  <i className="search icon" />
                  Where to go?
                </div>
                <div className="menu">
                  <div className="item" data-value="af">
                    Bangkok
                  </div>
                  <div className="item" data-value="ax">
                    Chonburi
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right column">
            <div
              className="open-menu"
              onClick={this.handleClick.bind(this)}
              >
              <i className="icon sidebar"
                />
            </div>
            <div
              className={"menu-list "+ ((this.state.menu) ? "show":"")}
              >
              <a
                className="close-menu"
                onClick={this.handleClick.bind(this)}
                >
                <i className="icon close" />
              </a>
              <button className="item ui black signup basic button">
                Sign up
              </button>
              <a className="item" href="#">
                Log in
              </a>
              <a className="item" href="#">
                How it works
              </a>
              <button
                className="item ui button"
                style={{background: '#1eb6e7', color: 'white'}}>
                List your trip
              </button>
            </div>
          </div>


        </div>
      </div>
);
  }
}
//Routing



AppComponent.defaultProps = {};

export default AppComponent;
