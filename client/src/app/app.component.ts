import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './services/socket.service';
import { Room } from './models/Room';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  roomPicked: boolean = false;
  rooms: Room[] = [];
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
    this.socketService.socket.emit('hello', { hello: 'world' });

    this.socketService.socket.on('room list', (data) => {
      console.log(data)
      const roomsArray: string[] = Object.keys(data);
      console.log(roomsArray)
      const newArr: Room[] = roomsArray.map(room => {
        return { roomName: room, members: data[room].length }
      })
      console.log(newArr);
      const playerRoomArr: Room[] = newArr.filter(room => room.roomName.includes('player-'));
      console.log(playerRoomArr);
      this.rooms = playerRoomArr;
    })
  }

  testRoomPicked() {
    this.roomPicked = true;
  }

  testRoomJoin() {
    this.socketService.socket.emit('join room', { room: 'Test1' })
  }
}
