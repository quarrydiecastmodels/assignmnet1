import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import{ FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username:string = "";
    password:string = "";

    array: string[] = [];
    name:string = "";
    auth:boolean = false;


	constructor(private socketService: SocketService, private router:Router, private forms:FormsModule) {
  		
	}

	ngOnInit() {}

	login( event ) {
		if ( this.username == "super") {
			localStorage.setItem("username", this.username);
			this.router.navigateByUrl('/dashboard');
		} else {
			console.log(this.username);
		    $.ajax({
		        type: 'GET',
		        contentType: 'application/json',
		        url: '/login',
		        data: ({username: this.username}),
		        dataType: 'JSON',
		        success: function (data) {
		        	console.log(data);
		        	if ( true ) {
		        		localStorage.setItem("username", data.username);
		        		localStorage.setItem("user_type", data.user_type);
		        		alert('Welcome: ' + data.username + '\nemail: ' + data.email + '\nUser Type: ' + data.user_type);
		        	}
		        }
		    });
		}
	}

	getUsers = this.array;

}
