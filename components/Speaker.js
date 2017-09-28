'use strict';

let React = require('react');
let Display = require('./parts/Display');
let JoinSpeaker = require('./parts/JoinSpeaker');
let Attendance = require('./parts/Attendance');
let Questions = require('./parts/Questions');
let SurveyAdd = require('./parts/AddSurvey');
let Result = require('./parts/Result.js');

const Speaker = React.createClass({
     render() {
   return (
      <div className="form speaker animated tada">
        <Display if={this.props.status === 'connected'}>
          <Display if={this.props.member.name && this.props.member.type === 'speaker'}>
            <h2>Wow !! We got <u><i>{this.props.audience.length}</i></u> members online</h2>
            <Questions emit={this.props.emit} questions={this.props.questions}></Questions>
            <Display if={this.props.options != "undefined"}>
                <hr/>
                <Result options={this.props.results}></Result>
            </Display>
            <hr/>
            <SurveyAdd emit={this.props.emit}></SurveyAdd>
            <hr/>
          </Display>
          <Display if={!this.props.member.name}>
            <h2>Start a Survey session:</h2>
            <JoinSpeaker emit={this.props.emit}></JoinSpeaker>
          </Display>
        </Display>
      </div>
    );
  }
});

module.exports = Speaker;
