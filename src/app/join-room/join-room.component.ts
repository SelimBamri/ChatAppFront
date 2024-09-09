import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.scss',
})
export class JoinRoomComponent implements OnInit {
  joinRoomForm!: FormGroup;
  fb = inject(FormBuilder);
  chatService = inject(ChatService);
  hola: string = '';
  ngOnInit() {
    this.joinRoomForm = this.fb.group({
      user: ['', Validators.required],
      room: ['', Validators.required],
    });
  }

  joinRoom() {
    const { user, room } = this.joinRoomForm.value;
    this.chatService
      .joinRoom(user, room)
      .then(() => {
        console.log('Hello');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
