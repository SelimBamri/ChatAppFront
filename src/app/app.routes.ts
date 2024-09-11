import { Routes } from '@angular/router';
import { JoinRoomComponent } from './join-room/join-room.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

export const routes: Routes = [
  { path: '', component: JoinRoomComponent },
  { path: 'chat', component: ChatRoomComponent },
];
