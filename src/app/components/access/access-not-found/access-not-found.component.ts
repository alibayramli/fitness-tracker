import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-access-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './access-not-found.component.html',
  styleUrls: ['./access-not-found.component.scss'],
})
export default class AccessNotFoundComponent {}
