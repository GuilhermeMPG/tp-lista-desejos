import { AuthService } from './../../../auth/service/auth.service';
import { Router, Routes } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnChanges {
  constructor(private router: Router, private authService: AuthService) {}

  @Input() public visible: boolean = false;
  @Output() public visibleChange = new EventEmitter();

  sidebarVisible = false;
  tableMarginLeft = 0;
  showSidebar: boolean = false;
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('visible')) {
      const newValue = changes['visible'].currentValue;
      this.showSidebar = newValue;
      this.sidebarVisible = this.showSidebar;
      this.tableMarginLeft = this.sidebarVisible ? 8000 : 0;
    }
  }

  sair() {
    this.authService.logout();
    this.navigator('signin');
  }

  navigator(url: string) {
    this.showSidebar = false;
    this.sidebarVisible= false;
    this.visibleChange.emit(this.showSidebar);
    this.router.navigate([`/${url}`]);
  }
}
