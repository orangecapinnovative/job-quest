import React from 'react';
import jQuery from 'jquery';

var InspirationsComponent = React.createClass({
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
                      <a href={'#!/inspiration/'+inspriation._id}>
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

export default InspirationsComponent;
