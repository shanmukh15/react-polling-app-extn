'use strict';

let React = require('react');
let Display = require('./parts/Display');
let JoinSpeaker = require('./parts/JoinSpeaker');
let Attendance = require('./parts/Attendance');
let Questions = require('./parts/Questions');
let SurveyAdd = require('./parts/AddSurvey');

const Speaker = React.createClass({
     render() {
   return (
      <div className="form animated flipInX">
        <Display if={this.props.status === 'connected'}>
          <Display if={this.props.member.name && this.props.member.type === 'speaker'}>
            <Questions emit={this.props.emit} questions={this.props.questions}></Questions>
            <Display if={this.props.results != "undefined"}><div>{JSON.stringify(this.props.results)}</div></Display>
            <SurveyAdd emit={this.props.emit}></SurveyAdd>
            <Attendance audience={this.props.audience}></Attendance>
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
