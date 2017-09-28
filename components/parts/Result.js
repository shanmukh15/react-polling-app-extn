'use strict';

let React = require('react');


const Result = React.createClass({
     
    addoption(rester){
        let lis = [];
        for(let ster in rester){
            if(rester.hasOwnProperty(ster)){
                lis.push(<li key={ster} className="list-group-item">{ster} <span className="badge">{rester[ster]}</span></li>);
            }
        }
        return (
            <ul className="list-group"> 
            {lis}
            </ul>
        );
    },
    
    render() {
   return (
      <div className="panel panel-default col-*-8">
                <div className="panel-heading"><h2>Live Results :</h2></div>
                    <div className="panel-body">
                        <div id="questions" className="row">
                            {this.addoption(this.props.options)}
                        </div>
                    </div>
          </div>
    );
  }
});

module.exports = Result;
