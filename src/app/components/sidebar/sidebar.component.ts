import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/addcity', title: 'City',  icon:'location_city', class: '' },
    { path: '/adddoctorcategory', title: 'Category',  icon:'fact_check', class: '' },
    { path: '/addsponsor', title: 'Sponsor',  icon:'person', class: '' },
    { path: '/addqualifications', title: 'Qualifications',  icon:'school', class: '' },
    { path: '/user-profile', title: 'Doctor',  icon:'medical_services', class: '' },
    {path: '/show-users', title: 'Patients',  icon:'supervisor_account', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
