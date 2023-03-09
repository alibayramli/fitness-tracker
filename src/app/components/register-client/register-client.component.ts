import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { combineLatest, filter, switchMap, tap } from 'rxjs';

import { IClient } from 'src/app/models/client.model';
import { ApiService } from 'src/app/services/api.service';
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
} from './register-client.constant';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss'],
})
export class RegisterClientComponent implements OnInit {
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
    private apiService: ApiService,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
          return this.apiService.getClientById(this.clientIdToUpdate);
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
    this.apiService.addClient(this.registerForm.value).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Registered Successfully');
        this.registerForm.reset();
        this.router.navigate(['list']);
      },
    });
  }

  public updateClient() {
    this.apiService
      .updateClient(this.registerForm.value, this.clientIdToUpdate)
      .subscribe({
        next: () => {
          this.snackBarService.openSnackBar('Updated Successfully');
          this.registerForm.reset();
          this.router.navigate(['list']);
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
        this.registerForm.controls['bmiResult'].patchValue('Underweight');
        break;
      case BMI >= 18.5 && BMI < 25:
        this.registerForm.controls['bmiResult'].patchValue('Normal');
        break;
      case BMI >= 25 && BMI < 30:
        this.registerForm.controls['bmiResult'].patchValue('Overweight');
        break;
      default:
        this.registerForm.controls['bmiResult'].patchValue('Obese');
        break;
    }
  }

  private resetBMI() {
    this.registerForm.controls['bmi'].patchValue('');
    this.registerForm.controls['bmiResult'].patchValue('');
  }
}
