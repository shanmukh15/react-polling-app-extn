    'use strict';

    let React = require('react');

    const Questions = React.createClass({

      askQuestion(question) {
        this.props.emit('ask', question);
      },
        
      reset() {
        this.props.emit('reset', null);
      },

      addQuestion(question, i){
        return (
          <div key={i} className="col-xs-8 col-sm-6 col-md-6">
            <span className={(question.type == "survey") ? "surveyQ" : "ratingQ"} onClick={this.askQuestion.bind(null, question)}>{question.q}</span>
          </div>
        );
      },

      render() {
        return (
          <div className="panel panel-default col-*-8">
                <div className="panel-heading"><h2>Available Polls :</h2></div>
                    <div className="panel-body">
                        <div className="btn btn-danger">
                            <span onClick={this.reset}>Reset</span>
                        </div>  
                        <div id="questions" className="row">
                            {this.props.questions.map(this.addQuestion)}
                        </div>
                    </div>
          </div>
        );
      }
    });

    module.exports = Questions;
