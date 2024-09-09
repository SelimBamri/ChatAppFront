import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  API_URL: string = 'https://localhost:7277';

  public messages$ = new BehaviorSubject<any>([]);
  public users$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${this.API_URL}/chat`)
    .configureLogging(signalR.LogLevel.Information)
    .build();
  constructor() {
    this.start();
    this.connection.on(
      'RecieveMessage',
      (user: string, message: string, messageTime: string) => {
        this.messages = [...this.messages, { user, message, messageTime }];
        this.messages$.next(this.messages);
      }
    );
    this.connection.on('ConnectedUser', (users: any) => {
      this.users$.next(users);
    });
  }

  public async start() {
    try {
      await this.connection.start();
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        this.start();
      }, 5000);
    }
  }

  public async joinRoom(user: string, room: string) {
    return this.connection.invoke('JoinRoom', { user, room });
  }
}
