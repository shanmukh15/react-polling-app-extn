"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var PieChart = require('react-d3-basic').PieChart;

const Dolet = React.createClass({

    getInitialState(){
        return {
          width : 700,
          height:400,
          chartSeries: [ { "field": "<5", "name": "less than 5"},
                        { "field": "5-13", "name": "5 to 13"},
                        { "field": "14-17", "name": "14 to 17"},
                        { "field": "18-24", "name": "18 to 24"},
                        { "field": "25-44", "name": "25 to 44"},
                        { "field": "45-64", "name": "45 to 64"}],
          innerRadius:10,
          generalChartData : [{age: "<5", population:"234567"},{age: "25-44", population:"4567"}],
          value : (d)=>{ return +d.population; },
          name : (d)=>{ return d.age; }
        }
    },
  
  render() {
        return (
            <div>
                <PieChart data= {this.state.generalChartData} width= {this.state.width} height= {this.state.height} chartSeries= {this.state.chartSeries} value = {this.state.value} name = {this.state.name} innerRadius = {this.state.innerRadius} />
            </div>
        );
    }
});

module.exports = Dolet;