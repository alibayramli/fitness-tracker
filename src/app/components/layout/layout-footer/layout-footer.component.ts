import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-layout-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss'],
})
export class LayoutFooterComponent {}
