import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  // Because of how socket callback is firing multiple times when nested in this component
  // Have to pull in all of the stuff from app.comp.ts

  @Input() room: string;  // room name
  @Input() playerArray: string[]; // socket id's of players in room
  @Input() initOrder: number; // Initial placement of player in room, either 0 or 1;
  

  @Output() leaveRoom = new EventEmitter();

  constructor(public socketService: SocketService) { }

  ngOnInit() {
    this.checkRoom();
  }

  // ngOnDestroy() {
  //   this.socketService.socket.emit('leave room', this.room)
  // }

  handleLeaveRoom() {
    this.leaveRoom.emit();
  }

  checkRoom() {
    this.socketService.socket.emit('room check', this.room)
  }
}
