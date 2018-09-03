import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import{ FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  	username:string = "";
    email:string = "";
    user_type:string = "";

    array:any;

    user:string = "";
    uType:string = "";

  	constructor(private socketService: SocketService, private router:Router, private forms:FormsModule) {
      this.fetchUsers();
    }

    ngOnInit() {
      this.user = localStorage.getItem("username");
      this.uType = localStorage.getItem("user_type");
      console.log(this.user);
    }

  	createUser( event ) {

      if ( this.uType == "group" || this.uType == "super" ) {
        if ( this.uType == "super" ) {
          console.log(this.username);
          $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: '/users',
            data: ({
              username: this.username, 
              email: this.email, 
              user_type: this.user_type
            }),
            dataType: 'JSON',
            success: function (data) {
              console.log(data);
              alert('User: ' + data.username + ' has created');
            }
          });
         } else if ( this.uType == "group" && this.user_type == "group" || this.uType == "group" && this.user_type == "basic") {
          console.log(this.username);
          $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: '/users',
            data: ({
              username: this.username, 
              email: this.email, 
              user_type: this.user_type
            }),
            dataType: 'JSON',
            success: function (data) {
              console.log(data);
              alert('User: ' + data.username + ' has created');
            }
          });
        }
      } else {
        alert("You are not authourized!");
      }

      this.username = "";
      this.email = "";
      this.user_type = "";
    }

    fetchUsers() {
      $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/fetchUsers',
        dataType: 'JSON',
        success: function (data) {
          console.log(data);

          var x = data.array;
          for ( var i = 0; i < x.length; i++ ) {
            console.log(x[i].username);
            $('#users').append('\
                  <div class="col-sm-6">\
                    <div class="card">\
                      <div class="card-body">\
                        <h5 class="card-title">'+ x[i].username + '</h5>\
                        <p class="card-text"></p>\
                        <button class="btn btn-primary">Edit</button>\
                        <button>Delete</button>\
                      </div>\
                    </div>\
                  </div>');
          }
        }
      });
    }
}
