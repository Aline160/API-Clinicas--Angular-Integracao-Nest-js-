import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secure-area',
  templateUrl: './secure-area.component.html',
  styleUrls: ['./secure-area.component.scss']
})
export class SecureAreaComponent implements OnInit {

  loggedUser = 'Usuário logado';

  logout(){
    console.log(`Loggou!`);
  }

  ngOnInit() {}
  
}
