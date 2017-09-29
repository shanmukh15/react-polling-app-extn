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

  addChoice(choice, i) {
    if(choice != ''){
      return(
      <button onClick={this.selectChoice.bind(null, choice)} key={i} className={"col-xs-12 col-sm-6 btn"}>
        {this.props.question[choice]}
      </button>
    );}
    
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
      
  submitRating() {
    let rate = document.querySelector('input[name="rating"]:checked').value;
    if(this.state.answer){
        this.props.emit('answer', {
            question: this.props.question,
            choice: Number(rate) - Number(this.state.answer), 
            update : true,
            old : ''
        });
    }else {
        this.props.emit('answer', {
            question: this.props.question,
            choice: Number(rate), 
            update : false,
            old : ''
        });
    }
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
                <fieldset className="rating">
                    <input type="radio" id="star5" name="rating" value="5" />
                    <label forName="star5" title="5"></label>
                    <input type="radio" id="star4" name="rating" value="4" />
                    <label forName="star4" title="4"></label>
                    <input type="radio" id="star3" name="rating" value="3" />
                    <label forName="star3" title="3"></label>
                    <input type="radio" id="star2" name="rating" value="2" />
                    <label forName="star2" title="2"></label>
                    <input type="radio" id="star1" name="rating" value="1" />
                    <label forName="star1" title="1"></label>
                </fieldset>
                <div className="btn btn-danger submit" onClick={this.submitRating}>Submit</div>
            </div>
        </Display>

        <Display if={this.state.answer}>
          <hr/>
          <h2>Your opted for : </h2>
          <h3>{this.state.answer}</h3>
        </Display>
        
      </div>
    );
  }
});

module.exports = Ask;
