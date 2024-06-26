import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  visible : boolean = false;

  constructor() { }
  @Output() visibleChange = new EventEmitter();
  @Input()  exibirOpcoes : boolean = true;
  ngOnInit(): void {
  }
  func(){
    this.visible = !this.visible;

  }


}
