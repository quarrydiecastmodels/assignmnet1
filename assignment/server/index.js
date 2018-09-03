let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

let path = require('path');
let bodyParser = require('body-parser');

const fs = require('fs');

app.get('/users', function ( req, res ) {
	var isUser = 0;
    var userObj;
    var uname = req.query.username;
    var email = req.query.email;
    var utype = req.query.user_type;
    console.log(uname, email, utype)

	fs.readFile('users.json','utf-8', function(err, data){
          if (err){
              console.log(err);
          } else {
          	console.log(data);
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
            if (userObj[i].username == uname){
              isUser = 1;
            }
          }
          if (isUser > 0){
            //Name already exists in the file
             res.send({'username':'','success':false});
           }else{
             //Add name to list of names
             userObj.push({'username':uname, 'email': email, 'user_type': utype})
             //Prepare data for writing (convert to a string)
             var newdata = JSON.stringify(userObj);
             fs.writeFile('users.json',newdata,'utf-8',function(err){
               if (err) throw err;
               //Send response that registration was successfull.
               res.send({'username':uname,'success':true});
              });
           }
         }
      })
});

app.get('/login', function ( req, res ) {
      var uname = req.query.username;
      var userObj;

      console.log(uname);
      fs.readFile('users.json', 'utf-8', function ( err, data) {
        if ( err ) {
          console.log( err );
        } else {
          userObj = JSON.parse(data);
          for ( var i = 0; i < userObj.length; i++ ) {
            if ( uname == userObj[i].username ) {
              console.log(true);
              console.log('Welcome: ' + uname);
              res.send({
                'OK': true, 
                'username': userObj[i].username, 
                'email': userObj[i].email, 
                'user_type': userObj[i].user_type,
                'array': userObj
              });
            }
          }
        }
      });
});

app.get('/fetchUsers', function ( req, res ) {
  fs.readFile('users.json', 'utf-8', function ( err, data) {
    if ( err ) {
      console.log( err );
    } else {
      var userObj = JSON.parse(data);
      res.send({
        'OK': true,
        'array': userObj
      });
    }
  });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, '../dist/chat')));


const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
	  io.emit('message', {type: 'message', text:message});
	});
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
