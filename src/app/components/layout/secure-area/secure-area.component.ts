import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-secure-area',
  templateUrl: './secure-area.component.html',
  styleUrls: ['./secure-area.component.scss']
})
export class SecureAreaComponent implements OnInit {

  loggedUser = 'Usuário logado';

  constructor(private authService: AuthService) { }


  logout() {
    this.authService.logout();
  }

  ngOnInit() { }

}
