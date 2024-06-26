import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {

  title = 'wish_list';
  visible : boolean = false;
  mostrarOpcaoHeader: boolean = true;
  width: number = window.innerWidth;
  constructor(private router: Router) {
    // Observa mudanças na navegação
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica se a URL é '/login'
        if(event.url == '/signin' || event.url == '/signup'){
        this.mostrarOpcaoHeader = false;

      }else{
        this.mostrarOpcaoHeader = true;
      }

      }
    });
  }


  ngOnInit() {
    window.addEventListener('resize', this.onResize);
  }

  onResize() {
    this.width = window.innerWidth;

  }

}
