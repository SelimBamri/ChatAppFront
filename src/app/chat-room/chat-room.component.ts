import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgFor,
    AsyncPipe,
    FormsModule,
    NgClass,
    FontAwesomeModule,
  ],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private scrollContainer!: ElementRef;
  faPaperPlane = faPaperPlane;
  messages: any[] = [];
  users: string[] = [];
  router = inject(Router);
  roomName = localStorage.getItem('room');
  loggedInUserName = localStorage.getItem('user');
  inputMessage!: string;
  chatService = inject(ChatService);
  leaveChat() {
    localStorage.clear();
    this.chatService.leaveChat();
    this.router.navigate(['']);
  }
  sendMessage() {
    this.chatService.sendMessage(this.inputMessage);
  }
  ngOnInit(): void {
    this.roomName = localStorage.getItem('room');
    this.loggedInUserName = localStorage.getItem('user');
    this.chatService.messages$.subscribe((res) => {
      this.messages = res;
      console.log(this.messages);
    });

    this.chatService.users$.subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
  }

  ngAfterViewChecked(): void {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }
}
