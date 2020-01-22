import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  @Input() room: string;

  @Output() leaveRoom = new EventEmitter();

  constructor(public socketService: SocketService) { }

  ngOnInit() {
    this.checkRoom();
  }

  ngOnDestroy() {
    this.socketService.socket.emit('leave room', this.room)
  }

  handleLeaveRoom() {
    this.leaveRoom.emit();
  }

  checkRoom() {
    this.socketService.socket.emit('room check', this.room)
  }
}
