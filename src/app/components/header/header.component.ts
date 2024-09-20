import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
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

    this.getUsernameFromToken();
  }

  // Open the menu
  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  // Close the menu
  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

  // Retrieve the username from the token
  getUsernameFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.username = decodedToken.Username;
      } catch (error) {
        console.error('Failed to decode token:', error);
        this.username = null;
      }
    }
  }

  // Log out the user
  logOut() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  // Toggle the theme
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
