    'use strict';

    let React = require('react');

    const Questions = React.createClass({

      askQuestion(question) {
        this.props.emit('ask', question);
      },

      addQuestion(question, i){
        return (
          <div key={i} className="col-xs-8 col-sm-6 col-md-6">
            <span onClick={this.askQuestion.bind(null, question)}>{question.q}</span>
          </div>
        );
      },

      render() {
        return (
          <div className="panel panel-default col-*-8">
                <div className="panel-heading"><h2>Available Polls :</h2></div>
                    <div className="panel-body">
                        <div id="questions" className="row">
                            {this.props.questions.map(this.addQuestion)}
                        </div>
                    </div>
          </div>
        );
      }
    });

    module.exports = Questions;
