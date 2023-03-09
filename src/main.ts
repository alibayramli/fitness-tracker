import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app/components/app.component';
import { AppRoutingModule } from './app/components/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      ReactiveFormsModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatRadioModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatCardModule,
      MatListModule,
      MatChipsModule,
      MatDialogModule,
      MatSnackBarModule,
      AppRoutingModule
    ),
    provideAnimations(),
    provideHttpClient(withInterceptors([])),
  ],
}).catch((err) => console.error(err));
