import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from 'src/app/services/theme.service';
import {
  AvailableThemes,
  AvailableThemesMappingsDefault,
} from './switcher-theme.constant';
import {} from '@angular/core';

@Component({
  selector: 'app-switcher-theme',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './switcher-theme.component.html',
  styleUrls: ['./switcher-theme.component.scss'],
})
export class SwitcherThemeComponent {
  public readonly THEMES = AvailableThemes;
  public readonly AvailableThemesMappingsDefault =
    AvailableThemesMappingsDefault;

  constructor(public themeService: ThemeService) {}
}
