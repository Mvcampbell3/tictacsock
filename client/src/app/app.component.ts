import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './services/socket.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  roomPicked: boolean = false;
  title = 'client';

  constructor(public socketService: SocketService) { }

  ngOnInit() {
   this.socketController()
  }

  ngOnDestroy() {
    this.socketService.socket.disconnect();
  }

  socketController() {
    console.log(this.socketService.socket)
    this.socketService.socket.emit('hello', {hello: 'world'});

    this.socketService.socket.on('room list', (data) => {
      console.log(data)
    })
  }

  testRoomPicked() {
    this.roomPicked = true;
  }
  
  testRoomJoin() {
    this.socketService.socket.emit('join room', {room: 'Test1'})
  }
}
