import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public socketService: SocketService) { }

  ngOnInit() {
    console.log(this.socketService.socket)
    this.socketService.socket.emit('hello')
  }


}
