import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from 'src/app/services/theme.service';
import { AvailableThemes } from './switcher-theme.constant';

@Component({
  selector: 'app-switcher-theme',
  standalone: true,
  imports: [AsyncPipe, MatIconModule, MatButtonModule],
  templateUrl: './switcher-theme.component.html',
  styleUrls: ['./switcher-theme.component.scss'],
})
export class SwitcherThemeComponent {
  public readonly THEMES = AvailableThemes;
  constructor(public themeService: ThemeService) {}
}
