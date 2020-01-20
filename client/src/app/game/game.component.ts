import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SocketService } from '../services/socket.service';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  @Input() room: string;

  @Output() leaveRoom = new EventEmitter();

  items: Observable<any[]>;

  constructor(public socketService: SocketService, public db: AngularFirestore) { 
    this.items = db.collection('/items').valueChanges()
  }


  ngOnInit() {
    this.checkRoom();
    this.socketController();
  }

  ngOnDestroy() {
    this.socketService.socket.emit('leave room', this.room)
  }

  socketController() {
    this.socketService.socket.on('room check back', (data) => {
      console.log(data);
    })
  }

  handleLeaveRoom() {
    this.leaveRoom.emit();
  }

  checkRoom() {
    this.socketService.socket.emit('room check', this.room)
  }

  testFire() {
    this.items.subscribe(
      (data:any) => {
        console.log(data)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }
}
