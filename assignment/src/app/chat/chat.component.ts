import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import{ FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	username: string;
	message: string;
	messages: string[] = [];
	connection;

	constructor(private socketService: SocketService, private router:Router, private forms:FormsModule) { }

	sendMessage( event ) {
		event.preventDefault();
	  	this.socketService.sendMessage(this.message + ' (' + this.username + ')');
	  	console.log(this.message);
	}

	ngOnInit() {
		this.username = localStorage.getItem("username");

	    this.connection = this.socketService
	      .getMessages()
	      .subscribe((message: string) => {
	        this.messages.push(message);
	        this.message = '';
	      });
	}

}
