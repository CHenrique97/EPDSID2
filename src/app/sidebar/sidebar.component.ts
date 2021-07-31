import { Component, OnInit,Output, EventEmitter } from '@angular/core';

export interface JSON {
  ano: string[];
  periodo: string[];
  var1: string;
  var2: string;
}
export interface JSONout {
  var1_avg: number;
  var1_std: number;
  var2_avg: number;
  var2_std: number;
  graph1: string;
  graf2: string;
  graf3: string;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  @Output() sendEvent = new EventEmitter<JSONout>();
  years="2020,2021";
  period="2020-01-01,2020-01-30";
  var1="ELEVATION";
  var2="ELEVATION";
  constructor() { }

  ngOnInit(): void {
  }
  makeAndSend():void{
    let data:JSON = {"ano":this.years.split(','),
    "periodo":this.period.split(','),
    "var1":this.var1,
    "var2":this.var2
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://127.0.0.1:4000/', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(data));
    console.log(JSON.stringify(data));
    this.sendEvent.emit(JSON.parse(xmlHttp.responseText));
  }
}
