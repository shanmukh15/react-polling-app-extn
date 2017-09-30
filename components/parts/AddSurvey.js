let React = require('react');

const adderS = React.createClass({
    
  join(e) {
    e.preventDefault();
    let questionval = this.refs.q.value.trim();
    let opt1val = this.refs.a.value.trim();
    let opt2val = this.refs.b.value.trim();
    let opt3val = this.refs.c.value != undefined ? this.refs.c.value.trim() : '';
    let opt4val = this.refs.d.value != undefined ? this.refs.d.value.trim() : '';
    this.props.emit('addpoll', { q: questionval, type:"survey", a: opt1val, b: opt2val, c: opt3val, d: opt4val });
    window.location.reload();
  },
    
  render() {
    return ( 
        <div className="panel panel-default col-*-8">
            <div className="panel-body">
                    <form action="javascript:void(0)" onSubmit={this.join}>         
                        <input type="text" className="form-control" ref="q" placeholder="Enter Survey Description" required/>
                        <input type="text" className="form-control" ref="a" placeholder="Option 1" required/>
                        <input type="text" className="form-control" ref="b" placeholder="Option 2" required/>
                        <input type="text" className="form-control" ref="c" placeholder="Option 3" />
                        <input type="text" className="form-control" ref="d" placeholder="Option 4" />
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
    );
  }
});

module.exports = adderS;