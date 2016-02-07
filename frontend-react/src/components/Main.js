require('normalize.css');
require('styles/main.scss');
require('styles/Header.scss');
import React from 'react';
import reactMixin from 'react-mixin';
import RouterMixin from 'react-mini-router';
import jQuery from 'jquery';

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
var ContentComponent = React.createClass({
    mixins: [RouterMixin.RouterMixin],
    routes: {
        '/': 'home',
        '/trip/:id': 'trip'
    },
    render: function() {
        return this.renderCurrentRoute();
    },
    home: function() {
        return <div><InspirationComponent></InspirationComponent></div>;
    },
    trip: function(id) {
        return <div></div>;
    },
    notFound: function(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }
});

var InspirationComponent = React.createClass({
  getInitialState:function(){
    return { };
  },
  componentDidMount: function() {
    this.serverRequest = jQuery.get(
      'https://www.takemetour.com/api/home',
      function(res){
        this.setState({
          inspiration_layouts:res.inspiration_layouts
        })
      }.bind(this)
    );
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render:function(){
    if (!this.state.inspiration_layouts){
      return <div>No data</div>;
    }
    return (
      <div className="gallery">
        {
          this.state.inspiration_layouts.map((row,i)=>{
            return (
              <div className="row" key={i}>
                {
                  row.columns.map((inspriation,index)=>{
                    let item = inspriation.inspiration_id;
                    return <div className={'item col-'+inspriation.size} key={index}>
                      <a href={'#/inspiration/'+inspriation._id}>
                        <div className="wrap">
                          <div className="name">
                            {item.name}
                          </div>
                          <img className='thumbnail' src={'images/'+item.thumbnail_media_id.file_name} />

                        </div>
                      </a>
                    </div>
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }
})



AppComponent.defaultProps = {};

export default AppComponent;
