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
    console.log('running socket controller')
    this.socketService.socket.emit('room check', this.room)

    this.socketService.socket.on('room check back', (data) => {
      console.log(data);
    })
  }

  handleLeaveRoom() {
    this.leaveRoom.emit();
  }
}
