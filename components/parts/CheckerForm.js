'use strict';

let React = require('react');
let AdderS = require('./AddSurvey');
let AdderR = require('./AddSurveyRating');

const CheckerForm = React.createClass({
  
    getInitialState: function() {
        return {
            isChecked: true
        };
    },
    
    toggleChange: function() {
        this.setState({
            isChecked: !this.state.isChecked
        }, function() { }.bind(this));
    },
  
    render() {
      return (
        <div className="panel panel-default col-*-8">
            <div className="panel-heading"><h2>Add Survey</h2></div>
                <div className="panel-body">
                    <div>
                        <div className="switch name">Survey</div>
                            <label className="switch">
                            <input type="checkbox" checked={this.state.isChecked} onChange={this.toggleChange}/>
                            <span className="slider round"></span>
                            </label>
                        <div className="switch name">Rating</div>
                    </div>
                    {this.state.isChecked ? (<AdderR emit={this.props.emit}></AdderR>) : (<AdderS emit={this.props.emit}></AdderS>)}
                </div>
        </div>
    );
  }
});

module.exports = CheckerForm;