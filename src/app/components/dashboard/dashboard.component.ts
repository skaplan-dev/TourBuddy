import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public opened: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {}

  public toggleSidebar() {
    this.opened = !this.opened;
  }

  public signOut() {
    this.router.navigate(['login']);
  }
}
