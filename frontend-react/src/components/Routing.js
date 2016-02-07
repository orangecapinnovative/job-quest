import React from 'react';
import reactMixin from 'react-mixin';
import RouterMixin from 'react-mini-router';
import InspirationsComponent from './home'
import InspirationDetailComponent from './InspirationDetail'

var ContentComponent = React.createClass({
    mixins: [RouterMixin.RouterMixin],
    routes: {
        '/': 'home',
        '/inspiration/:id': 'inspiration'
    },
    render: function() {
        return this.renderCurrentRoute();
    },
    home: function() {
        return <div><InspirationsComponent></InspirationsComponent></div>;
    },
    inspiration: function(id) {
        return <div><InspirationDetailComponent id={id}></InspirationDetailComponent></div>;
    },
    notFound: function(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }
});

ContentComponent.defaultProps = {};

export default ContentComponent;
