import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './services/socket.service';
import { Room } from './models/Room';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  roomPicked: boolean = false;  // trigger for game component
  rooms: Room[] = [];  // list of rooms from socket
  title = 'client'; // whatever this angular bs thing does
  room: string = ''; // selected room name - passed to game component

  createRoomName: string = ''; // create room name from input on app.comp.html

  constructor(public socketService: SocketService) { }

  ngOnInit() {
    this.socketController()
  }

  ngOnDestroy() {
    this.socketService.socket.disconnect();
  }

  socketController() {

    /*
      Putting socket.on functions inside of other components has made the callback from server 
      run multiple times, whereas leaving the .on functions inside this function seems to have
      the callbacks run once. Still testing to see what is up, but if you want to be able to rely
      on on callback per move, it might have to be all run through this socketController
    */

    this.socketService.socket.emit('hello');

    this.socketService.socket.on('room list', (data) => {
      /* 
        Gets rooms that are made by socket.io;
        each id creates a room automatically;
        maps rooms to create room object which has roomName and members - number of people in the room;
        then filters out rooms with player- in the name, which are rooms created by players;
        then slices out 'player-' from room name for display to page;
      */

      const roomsArray: string[] = Object.keys(data);
      const newArr: Room[] = roomsArray.map(room => {
        return { roomName: room, members: data[room].length }
      })

      const playerRoomArr: Room[] = newArr.filter(room => room.roomName.includes('player-'));
      playerRoomArr.forEach(room => {
        room.roomName = room.roomName.slice(7)
      })

      console.log(playerRoomArr)
      this.rooms = playerRoomArr;
    })

    this.socketService.socket.on('room created', (data) => {
      console.log(data);
      this.enterRoom(data)
    })

    this.socketService.socket.on('room check back', (data) => {
      console.log(data);
    })
  }

  testRoomPicked() {
    this.roomPicked = true;
  }

  testRoomJoin() {
    this.socketService.socket.emit('join room', { room: 'Test1' })
    this.room = 'Test1';
    this.roomPicked = true;
  }

  testRoomClick(players, roomName) {
    console.log(players) // I only want to be able to join a room if there is 1 person in the members list
    if (players === 1) {
      console.log('would join room');
      this.socketService.socket.emit('join room', { room: roomName })
    } else {
      console.log('would not join room');
    }
  }

  enterRoom(room) {
    this.room = room;
    this.createRoomName = '';
    this.roomPicked = true;
  }

  leaveRoom() {
    this.socketService.socket.emit('leave room', { room: this.room })
    this.room = '';
    this.roomPicked = false;
  }

  handleCreateRoom(e) {
    e.preventDefault();
    console.log(this.createRoomName)
    this.socketService.socket.emit('join room', { room: this.createRoomName })
  }
}
