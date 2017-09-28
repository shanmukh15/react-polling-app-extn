'use strict';

let React = require('react');
let Display = require('./parts/Display');
let Join = require('./parts/Join');
let Ask = require('./parts/Ask');

const Audience = React.createClass({
    
  render() {
    return (
      <div className="form animated flipInX">
        
        <Display if={this.props.status === 'connected'}>

          <Display if={this.props.member.name}>
            <Display if={!this.props.currentQuestion}>
              <h2>Welcome {this.props.member.name}</h2>
              <p>Wow !! We got {this.props.audience.length} members online</p>
              <p>Thank you for joining. Stay connected we will post the surveys as we head on..</p>
            </Display>
            <Display if={this.props.currentQuestion}>
              <Ask question={this.props.currentQuestion} result={this.props.results} emit={this.props.emit}></Ask>
            </Display>
          </Display>

          <Display if={!this.props.member.name}>
            <h2>!Make your vote Count!</h2>
            <Join emit={this.props.emit}/>
          </Display>
        </Display>
      </div>
    );
  }
});

module.exports = Audience;
