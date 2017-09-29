'use strict';

var express = require('express');
var _ = require('lodash');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var connections = [];
var audience = [];
var results = { t:0,u:0,v:0,e:0};
  
var questions = require('./data/questions');
var currentQuestion = '';
var speaker = {};
var defaults = {
  title: 'Blend \'17'
};

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));
app.use(express.static('./node_modules/animate.css'));
app.use(express.static('./node_modules/font-awesome'));

io.on('connection', function(socket) {
  connections.push(socket);

  socket.on('join', function(payload) {
    var newMember = {
      id: this.id,
      name: payload.name,
      type: 'member'
    };
    audience.push(newMember);
    this.emit('joined', newMember);

    io.sockets.emit('audience', audience);
  });

  socket.on('start', function(payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = 'speaker';
    this.emit('joined', speaker);
    io.sockets.emit('start', {title: payload.title, speaker: speaker.name});
  });
    
  socket.on('reset', function(payload) {
    currentQuestion = '';
    io.sockets.emit('ask', {question: currentQuestion, results: results});
  });

  socket.on('ask', function(question) {
    currentQuestion = question;
    results = {};      
        if(question.type === "rating"){
            results["Stars"] = 0;
        }else {
            Object.keys(question).forEach(function(key) {
                if(key != 'q' && key != 'type') {    results[question[key]]= 0;      }
            });
        }
    io.sockets.emit('ask', {question: currentQuestion, results: results});
  });

  socket.on('answer', function(payload) {
    if(payload.question.type ==="survey"){
        if(payload.update) {
            results[payload.old]--;
        }
        results[payload.choice]++;
        io.sockets.emit('resUpdate', results);
    }else{
        results["Stars"] = Number(results["Stars"]) + Number(payload.choice);
        io.sockets.emit('resUpdate', results);
       }
  });
  
  socket.on('addpoll', function(payload) {
    questions[questions.length] = payload;
  });

  socket.emit('welcome', {
    title: defaults.title,
    audience: audience,
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion,
      results:results
  });

  socket.once('disconnect', function() {
    var member = _.findWhere(audience, {id: this.id});

    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit('audience', audience);
      console.log('Left: %s, (%s audience members connected)', member.name, audience.length);
    } else if (this.id === speaker.id) {
      io.sockets.emit('end', {title: defaults.title, speaker: ''});
    }

    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('A socket was disconnected. %s sockets remaining', connections.length);
  });

  console.log('Connected %s sockets', connections.length);
});

server.listen(8080, console.log('Server is running at \'localhost\' : 8080'));