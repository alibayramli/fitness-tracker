import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from 'src/app/services/theme.service';
import { AvailableThemes } from './theme-switcher.constant';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [AsyncPipe, MatIconModule, MatButtonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  public readonly THEMES = AvailableThemes;
  constructor(public themeService: ThemeService) {}
}
