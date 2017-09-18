'use strict';

let React = require('react');
let $ = require('jquery');
let d3 = require('d3');

const Donuet = React.createClass({
  
    getInitialState(){
    return {
      data:[{  answer:"Deesa",  votes:0},{  answer:"Patan",  votes:0},{  answer:"Ahmedabad",  votes:0}],
      pieChartConfig : { mainDiv: "#chart",  colorRange: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#4941f4", "#f441d6"], caption:"answer",    tooltipLable:"Votes",    value:"votes",    centerLabel:"Live Results"}
        }
    },
    
    componentDidMount(){
        this.dataGenerator();
    },
    
    componentWillReceiveProps() {
        this.dataGenerator();
        $("#chart").empty();
        this.drawPieChart(this.state.pieChartConfig);
    },
    
    dataGenerator(){
        let srcData = this.props.result;
        var finalData = [];
        Object.keys(srcData).forEach(function(key) {
            finalData.push({answer:key,votes:srcData[key]});
        }); 
        this.setState({data:finalData});
    },
    
    pieChart() {
        this.drawPieChart(this.state.pieChartConfig);
        this.setReSizeEvent(this.state.pieChartConfig);
    },

    setReSizeEvent(data) {
        let resizeTimer;
        window.removeEventListener('resize', function() {});
        window.addEventListener('resize', function(event) {

            if (resizeTimer !== false) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(function() {
                $(data.mainDiv).empty();
                drawPieChart(data);
                clearTimeout(resizeTimer);
            }, 500);
        });
    },

    drawPieChart(config) {
            let data = this.state.data;
            let colorRange = config.colorRange;
            let mainDiv = config.mainDiv;
            let mainDivName = mainDiv.substr(1, mainDiv.length);
            let caption = config.caption;
            let tooltipLable = config.tooltipLable;
            let value = config.value;
            let centerLabel=config.centerLabel;

            let helpers = {
                getDimensions: function(id) {
                    let el = document.getElementById(id);
                    let w = 0,
                        h = 0;
                    if (el) {
                        let dimensions = el.getBBox();
                        w = dimensions.width;
                        h = dimensions.height;
                    } else {
                        console.log("error: getDimensions() " + id + " not found.");
                    }
                    return {
                        w: w,
                        h: h
                    }; 
            }
    };
    d3.select(mainDiv).append("svg").attr("width", $(mainDiv).width()).attr("height", $(mainDiv).height());
    let svg = d3.select(mainDiv + " svg"),
        margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
    let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let color = d3.scaleOrdinal(colorRange);
    let radius = Math.min(width, height) * 0.5;
    let pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d[value];
        });

    let path = d3.arc()
        .outerRadius(radius - 20)
        .innerRadius(radius*0.5)
        .cornerRadius(5);

    let label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    let arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .classed("arc", true);

    let pathArea = arc.append("path")
        .attr("d", path)
        .attr("id", function(d, i) {
            return "arc-" + i
        })
        .attr("style", "fill-opacity: 0.85;")
        .attr("fill", function(d) {
            return color(d.data[caption]);
        })
        .attr("data", function(d) {
            d.data["percentage"] = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
            return JSON.stringify(d.data);
        });

    //CBT:give blinking effect on mouse over
    pathArea.on("mouseover", function(d) {
        let currentEl = d3.select(this);
        currentEl.attr("style", "fill-opacity:1;");

        let fadeInSpeed = 120;
        d3.select("#tooltip_" + mainDivName)
            .transition()
            .duration(fadeInSpeed)
            .style("opacity", function() {
                return 1;
            });
        d3.select("#tooltip_" + mainDivName)
            .attr("transform", function(d) {
                let mouseCoords = d3.mouse(this.parentNode);
                let xCo = mouseCoords[0] + 10;;
                let yCo = mouseCoords[0] + 10;
                return "translate(" + xCo + "," + yCo + ")";
            });
        //CBT:calculate tooltips text
        let tooltipData = JSON.parse(currentEl.attr("data"));
        let tooltipsText = "";
        d3.selectAll("#tooltipText_" + mainDivName).text("");
        let yPos = 0;
        d3.selectAll("#tooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text(tooltipLable + ":  " + d3.format("0.2f")(tooltipData["percentage"]) + "%");
        let dims = helpers.getDimensions("tooltipText_" + mainDivName);
        d3.selectAll("#tooltipText_" + mainDivName + " tspan")
            .attr("x", dims.w + 2);

        d3.selectAll("#tooltipRect_" + mainDivName)
            .attr("width", dims.w + 10)
            .attr("height", dims.h + 20);
    });
        
    pathArea.on("mousemove", function(d) {
        let currentEl = d3.select(this);
        d3.selectAll("#tooltip_" + mainDivName)
            .attr("transform", function(d) {
                let mouseCoords = d3.mouse(this.parentNode);
                let xCo = mouseCoords[0] + 10;
                let yCo = mouseCoords[1] + 10;
                return "translate(" + xCo + "," + yCo + ")";
            });
    });
        
    pathArea.on("mouseout", function(d) {
        let currentEl = d3.select(this);
        currentEl.attr("style", "fill-opacity:0.85;");

        d3.select("#tooltip_" + mainDivName)
            .style("opacity", function() {
                return 0;
            });
        d3.select("#tooltip_" + mainDivName).attr("transform", function(d, i) {
            let x = -500;
            let y = -500;
            return "translate(" + x + "," + y + ")";
        });
    });

    //CBT:tooltips start
    let tooltipg = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .attr("id", "tooltip_" + mainDivName)
        .attr("style", "opacity:0")
        .attr("transform", "translate(-500,-500)");

    tooltipg.append("rect")
        .attr("id", "tooltipRect_" + mainDivName)
        .attr("x", 0)
        .attr("width", 120)
        .attr("height", 80)
        .attr("opacity", 0.8)
        .style("fill", "#000000");

    tooltipg
        .append("text")
        .attr("id", "tooltipText_" + mainDivName)
        .attr("x", 30)
        .attr("y", 15)
        .attr("fill", "#fff")
        .style("font-size", 10)
        .style("font-family", "arial")
        .text(function(d, i) {
            return "";
        });
    //CBT:tooltips end
    arc.append("text")
        .attr("transform", function(d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .attr("dy", "0.35em")
        .text(function(d) {
            return d.data[value];
        });

    arc.append("text")
        .attr("dx", 30)
        .attr("dy", -5)
        .append("textPath")
        .attr("xlink:href", function(d, i) {
            return "#arc-" + i;
        })
        .text(function(d) {
            return d.data[caption].toString();
        });

        g.append("text")
        .attr("id","centerLabel")
        .attr("transform", "translate(" + 0 + "," + 0 + ")").text(centerLabel);
        let labelDim=helpers.getDimensions("centerLabel");
        d3.selectAll("#centerLabel")
            .attr("transform", "translate(" + (labelDim.w/2)*-1 + "," + 0 + ")")

},
    
    render() {
        return (
            <div>
                <h1>Results : </h1>
                <div id="chart"></div>
            </div>
        );
    }
});


module.exports = Donuet;
    




