import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/ThemeService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  darkMode = false;
  username: string | null = null;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((darkMode) => {
      this.darkMode = darkMode;
    });
    
    const email = localStorage.getItem('email');
    this.username = email ? email.split('@')[0] : null;
  }

  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

  logOut() {
    localStorage.removeItem('email'); 
    window.location.href = '/login';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
