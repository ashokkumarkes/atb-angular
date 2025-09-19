import { Component } from '@angular/core';
import { UserImageComponent } from './user-image/user-image.component';

@Component({
  selector: 'app-chat-box',
  imports: [UserImageComponent],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {
  userID:any
  ngOnInit() {
    // this.handleUserId('default-id'); // Default ID for initialization
  }
  handleUserId(id: string) {
    this.userID = id;
    console.log('Received from child:', id);
    // here you can call any function with that id
  }
  sendSms() {
    // Logic to send SMS
    console.log('SMS sent');
  }
}
