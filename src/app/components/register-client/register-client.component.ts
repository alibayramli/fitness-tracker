import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';
import { switchMap } from 'rxjs';

import { IClient } from 'src/app/models/client.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss'],
})
export class RegisterClientComponent implements OnInit {
  public trainerOptions = ['Yes', 'No'];
  public genders = ['Male', 'Female'];
  public packages = ['Monthly', 'Quarterly', 'Yearly'];
  public importantGoals = [
    'Toxic Fat reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness',
  ];
  public haveBeenInGymBefore = ['Yes', 'No'];
  public registerForm!: FormGroup;
  public clientIdToUpdate!: number;
  public isUpdateActive = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      mobile: [''],
      weight: [
        '',
        Validators.compose([Validators.min(5), Validators.max(300)]),
      ],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      importantGoals: [''],
      haveBeenInGymBefore: [''],
      enquiryDate: [''],
    });
    this.registerForm.controls['weight'].valueChanges.subscribe({
      next: (newWeightValue) => {
        if (!newWeightValue) {
          this.registerForm.controls['height'].patchValue('');
        }
      },
    });
    this.registerForm.controls['height'].valueChanges.subscribe({
      next: (newHeightValue) => {
        this.calculateBMI(newHeightValue);
      },
    });

    this.activatedRoute.params
      .pipe(
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

  public submitClient() {
    this.apiService.addClient(this.registerForm.value).subscribe({
      next: (res) => {
        this.toastService.success({
          detail: 'Success',
          summary: 'Enquiry Added',
          duration: 3000,
        });

        this.registerForm.reset();
      },
    });
  }

  public updateClient() {
    this.apiService
      .updateClient(this.registerForm.value, this.clientIdToUpdate)
      .subscribe({
        next: (res) => {
          this.toastService.success({
            detail: 'Success',
            summary: 'Enquiry Updated',
            duration: 3000,
          });

          this.registerForm.reset();
          this.router.navigate(['list']);
        },
      });
  }

  private fillFormToUpdate(client: IClient) {
    this.registerForm.setValue({
      firstName: client.firstName,
      lastName: client.firstName,
      email: client.email,
      mobile: client.mobile,
      weight: client.weight,
      height: client.height,
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

  private calculateBMI(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const BMI = weight / (height * height);

    if (weight && heightValue) {
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
  }
}
