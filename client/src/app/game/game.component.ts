import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() room: string;

  @Output() leaveRoom = new EventEmitter();

  constructor(public socketService: SocketService) { }

  ngOnInit() {
    this.socketController();
  }

  socketController() {
    this.socketService.socket.emit('hello')
  }

  handleLeaveRoom() {
    this.leaveRoom.emit();
  }
}
