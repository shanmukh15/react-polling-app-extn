'use strict';

let React = require('react');

const Questions = React.createClass({
    
  askQuestion(question) {
    this.props.emit('ask', question);
  },

  addQuestion(question, i){
    return (
      <div key={i} className="col-xs-12 col-sm-6 col-md-3">
        <span onClick={this.askQuestion.bind(null, question)}>{question.q}</span>
      </div>
    );
  },
  
  render() {
    return (
      <div id="questions" className="row">
        <h2>Available Polls :</h2>
        {this.props.questions.map(this.addQuestion)}
      </div>
    );
  }
});

module.exports = Questions;
