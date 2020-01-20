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

  }

  socketController() {
    console.log(this.socketService.socket)
    this.socketService.socket.emit('hello', {hello: 'world'});

    this.socketService.socket.on('test', () => {
      console.log('test received')
    })
  }

  testRoom() {
    this.roomPicked = true;
  }
  
}
