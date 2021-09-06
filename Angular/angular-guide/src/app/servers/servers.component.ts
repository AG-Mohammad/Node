import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreation = 'No server was created';
  serverName = '';
  servers = ['Test1', 'Test2'];
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }
  onCreateServer(serverName: string) {
    this.servers.push(this.serverName);
    this.serverCreation = `Server "` + serverName + `" was created \\o/`;
    this.GetColor();
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
    this.GetColor();
  }

  GetColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  ngOnInit(): void {}
}
