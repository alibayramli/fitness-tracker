import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-access-not-authorized',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './access-not-authorized.component.html',
  styleUrls: ['./access-not-authorized.component.scss'],
})
export default class AccessNotAuthorizedComponent {}
