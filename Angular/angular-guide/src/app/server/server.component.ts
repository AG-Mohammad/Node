import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  serverId = 11;
  serverStatues = 'Offline';
  constructor() {
    this.serverStatues = Math.random() > 0.5 ? 'Online' : 'Offline';
  }
  getServerStatus() {
    return this.serverStatues;
  }
  getColor() {
    return this.serverStatues === 'Online' ? 'green' : 'red';
  }
  changeStatue() {
    if (this.serverStatues === 'Online') {
      this.serverStatues = 'Offline';
    } else {
      this.serverStatues = 'Online';
    }
  }
}
