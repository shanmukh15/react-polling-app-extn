let React = require('react');

const adderS = React.createClass({
  
    
  join(e) {
    e.preventDefault();
    let questionval = this.refs.q.value.trim();
    let opt1val = this.refs.a.value.trim();
    let opt2val = this.refs.b.value.trim();
    let opt3val = this.refs.c.value.trim();
    let opt4val = this.refs.d.value.trim();
    this.props.emit('addpoll', { q: questionval, a: opt1val, b: opt2val, c: opt3val, d: opt4val });
    window.location.reload();
  },
    
  render() {
    return ( 
        <div className="panel panel-default col-*-8">
            <div className="panel-heading"><h2>Add Survey</h2></div>
                <div className="panel-body">
                    <form action="javascript:void(0)" onSubmit={this.join}>         
                        <label forName="exampleInputEmail1">Question</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" ref="q" placeholder="Enter Survey Description" required/>
                        <label forName="exampleInputEmail2">option1</label>
                        <input type="text" className="form-control" id="exampleInputEmail2" ref="a" placeholder="Option 1" required/>
                        <label forName="exampleInputEmail3">option2</label>
                        <input type="text" className="form-control" id="exampleInputEmail3" ref="b" placeholder="Option 2" required/>
                        <label forName="exampleInputEmail4">option3</label> 
                        <input type="text" className="form-control" id="exampleInputEmail4" ref="c" placeholder="Option 3" required/>
                        <label forName="exampleInputEmail5">option4</label>
                        <input type="text" className="form-control" id="exampleInputEmail5" ref="d" placeholder="Option 4" required/>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
    );
  }
});

module.exports = adderS;