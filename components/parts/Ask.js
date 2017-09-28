'use strict';

let React = require('react');
let Display = require('./Display');

const Ask = React.createClass({

  getInititalState() {
    return {
      choices: [],
      answer: ''
    }
  },

  componentWillMount() {
    this.loadChoices();
  },   
    
  componentWillReceiveProps() {
    this.loadChoices();
  },

  loadChoices() {
    console.log('sessionStorage.answer', sessionStorage.answer);
    var choices = Object.keys(this.props.question);
    choices.shift();
    this.setState({
      choices: choices,
      answer: sessionStorage.answer
    });
  },

  addChoice(choice, i) {
    return(
      <button onClick={this.selectChoice.bind(null, choice)} key={i} className={"col-xs-12 col-sm-6 btn"}>
        {this.props.question[choice]}
      </button>
    );
  },

  selectChoice(choice) {
    if(this.state.answer){
        this.props.emit('answer', {
            question: this.props.question,
            choice: this.props.question[choice], 
            update : true,
            old : this.state.answer
        });
    }else {
        this.props.emit('answer', {
            question: this.props.question,
            choice: this.props.question[choice], 
            update : false,
            old : ''
        });
    }
    this.setState({answer: this.props.question[choice]});
    sessionStorage.answer = this.props.question[choice];
  },

  render() {
    return (
      <div id="currentQuestion">
        <Display if={this.state.answer}>
          <h2>{this.props.question.q}</h2>
          <div className="row">
            {this.state.choices.map(this.addChoice)}
          </div>
          <hr/>
          <h2>Your opted for : </h2>
          <h3>{this.state.answer}</h3>
        </Display>
        <Display if={!this.state.answer}>
          <h2>{this.props.question.q}</h2>
          <div className="row">
            {this.state.choices.map(this.addChoice)}
          </div>
        </Display>
        
      </div>
    );
  }
});

module.exports = Ask;
