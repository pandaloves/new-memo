import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  toggleTheme() {
    const currentMode = this.darkModeSubject.value;
    this.darkModeSubject.next(!currentMode);
    document.documentElement.setAttribute(
      'data-theme',
      !currentMode ? 'dark' : 'light'
    );
  }
}
