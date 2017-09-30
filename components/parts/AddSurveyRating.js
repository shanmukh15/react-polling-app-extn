let React = require('react');

const adderR = React.createClass({
  
    
  join(e) {
    e.preventDefault();
    this.props.emit('addpoll', { q: this.refs.q.value.trim(), type:"rating", a: "", b: "", c: "", d: "" });
    window.location.reload();
  },
    
  render() {
    return ( 
        <div className="panel panel-default col-*-8">
            <div className="panel-body">
                    <form action="javascript:void(0)" onSubmit={this.join}>         
                        <input type="text" className="form-control" id="exampleInputEmail1" ref="q" placeholder="Enter Survey Description" required/>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
            </div>
        </div>
    );
  }
});

module.exports = adderR;