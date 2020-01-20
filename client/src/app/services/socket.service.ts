import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = io.connect('localhost:3001');

  constructor() { }

  
}
