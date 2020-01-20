import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './services/socket.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(public socketService: SocketService) { }

  ngOnInit() {
   console.log(this.socketService.socket)
   this.socketService.socket.emit('hello', {hello: 'world'});
  }

  ngOnDestroy() {

  }

  
}
