import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { combineLatest, filter, switchMap, tap } from 'rxjs';
import { IClient } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import {
  TRAINER_OPTIONS,
  GENDERS,
  PACKAGES,
  IMPORTANT_GOALS,
  HAVE_BEEN_IN_GYM_BEFORE,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_WEIGHT,
  MAX_WEIGHT,
  RegisterClientSnackBar,
  BMIResult,
} from './client-register.constant';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-register-client',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatButtonModule,
    SpinnerComponent,
  ],
})
export class ClientRegisterComponent implements OnInit {
  public readonly trainerOptions = TRAINER_OPTIONS;
  public readonly genders = GENDERS;
  public readonly packages = PACKAGES;
  public readonly importantGoals = IMPORTANT_GOALS;
  public readonly haveBeenInGymBefore = HAVE_BEEN_IN_GYM_BEFORE;
  private readonly minHeight = MIN_HEIGHT;
  private readonly maxHeight = MAX_HEIGHT;
  private readonly minWeight = MIN_WEIGHT;
  private readonly maxWeight = MAX_WEIGHT;
  public registerForm!: FormGroup;
  public clientIdToUpdate!: number;
  public isUpdateActive = false;

  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      mobile: [''],
      height: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(this.minHeight),
          Validators.max(this.maxHeight),
        ]),
      ],
      weight: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(this.minWeight),
          Validators.max(this.maxWeight),
        ]),
      ],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      importantGoals: [''],
      haveBeenInGymBefore: [''],
      enquiryDate: [''],
    });

    combineLatest([
      this.registerForm.controls['height'].valueChanges,
      this.registerForm.controls['weight'].valueChanges,
    ])
      .pipe(
        tap(() => {
          if (!this.isHeightAndWeightValid) {
            this.resetBMI();
          }
        }),
        filter(() => this.isHeightAndWeightValid)
      )
      .subscribe({
        next: ([height, weight]) => {
          this.calculateBMI(height, weight);
        },
      });

    this.activatedRoute.params
      .pipe(
        filter((paramConfig) => !!Object.keys(paramConfig).length),
        switchMap((value) => {
          this.clientIdToUpdate = value['id'];
          return this.clientService.getClientById(this.clientIdToUpdate);
        })
      )
      .subscribe({
        next: (client) => {
          this.isUpdateActive = true;
          this.fillFormToUpdate(client);
        },
      });
  }

  private get isHeightAndWeightValid() {
    return (
      this.registerForm.controls['height'].valid &&
      this.registerForm.controls['weight'].valid
    );
  }

  public submitClient() {
    this.clientService.addClient(this.registerForm.value).subscribe({
      next: () => {
        this.snackBarService.openSnackBar(
          RegisterClientSnackBar.REGISTER_SUCCESS
        );
        this.registerForm.reset();
        this.router.navigate(['client-lists']);
      },
    });
  }

  public updateClient() {
    this.clientService
      .updateClient(this.registerForm.value, this.clientIdToUpdate)
      .subscribe({
        next: () => {
          this.snackBarService.openSnackBar(
            RegisterClientSnackBar.UPDATE_SUCCESS
          );
          this.registerForm.reset();
          this.router.navigate(['client-lists']);
        },
      });
  }

  private fillFormToUpdate(client: IClient) {
    this.registerForm.setValue({
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      mobile: client.mobile,
      height: client.height,
      weight: client.weight,
      bmi: client.bmi,
      bmiResult: client.bmiResult,
      gender: client.gender,
      requireTrainer: client.requireTrainer,
      package: client.package,
      importantGoals: client.importantGoals,
      haveBeenInGymBefore: client.haveBeenInGymBefore,
      enquiryDate: client.enquiryDate,
    });
  }

  private calculateBMI(height: number, weight: number) {
    const BMI = weight / (height * height);

    this.registerForm.controls['bmi'].patchValue(BMI);

    switch (true) {
      case BMI < 18.5:
        this.registerForm.controls['bmiResult'].patchValue(
          BMIResult.UNDERWEIGHT
        );
        break;
      case BMI >= 18.5 && BMI < 25:
        this.registerForm.controls['bmiResult'].patchValue(BMIResult.NORMAL);
        break;
      case BMI >= 25 && BMI < 30:
        this.registerForm.controls['bmiResult'].patchValue(
          BMIResult.OVERWEIGHT
        );
        break;
      default:
        this.registerForm.controls['bmiResult'].patchValue(BMIResult.OBESE);
        break;
    }
  }

  private resetBMI() {
    this.registerForm.controls['bmi'].patchValue('');
    this.registerForm.controls['bmiResult'].patchValue('');
  }
}
