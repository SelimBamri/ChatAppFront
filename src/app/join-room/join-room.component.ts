import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

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
  router = inject(Router);
  chatService = inject(ChatService);
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
        localStorage.setItem('user', user);
        localStorage.setItem('room', room);
        this.router.navigate(['/chat']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
