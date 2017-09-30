'use strict';

let React = require('react');
let Display = require('./Display');
let Rater = require('react-star-rating').default;

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
    
        let tempChoice = Object.keys(this.props.question);
        tempChoice.shift();tempChoice.shift();
        let choices = [];
        if(this.props.question.type == "survey"){
           for(let i in tempChoice){
                if(this.props.question[tempChoice[i]] != ""){
                    choices.push(tempChoice[i]);
                }
            }
        }else if(this.props.question.type == "rating"){
                choices = tempChoice;
        }
        
        this.setState({
            choices: choices,
            answer: sessionStorage.answer
        });
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
      
  submitRating(data) {
      let rate = data;
        this.props.emit('answer', {
            question: this.props.question,
            choice: (this.state.answer) ? (Number(rate) - Number(this.state.answer)) : Number(rate), 
            update : true,
            old : ''
        });
        this.setState({answer: rate});
        sessionStorage.answer = rate;
  },
      
  render() {
    return (
      <div id="currentQuestion">
        
        <Display if={this.props.question.type === "survey"}>
            <h2>{this.props.question.q}</h2>
            <div className="row">
                {this.state.choices.map(this.addChoice)}
            </div>
        </Display>
        <Display if={this.props.question.type === "rating"}>
            <h2>{this.props.question.q}</h2>
            <div className="row">
                <Rater name="sert" totalStars={7} size={30} onRatingClick={(e,data) => {e.preventDefault();e.stopPropagation();this.submitRating(data.rating);}} />
            </div>
        </Display>

        <Display if={this.state.answer}>
          <hr/>
          <h2>Your opted for : </h2>
          <h3>{this.state.answer}</h3>
        </Display>
        
      </div>
    );
  },
  
  addChoice(choice, i) {
    if(choice != ''){
      return (
      <button onClick={this.selectChoice.bind(null, choice)} key={i} className={"col-xs-12 col-sm-6 btn"}>
        {this.props.question[choice]}
      </button>
    );
   }  
  }
});

module.exports = Ask;
