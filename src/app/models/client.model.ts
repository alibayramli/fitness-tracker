export interface IClient {
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  weight: number;
  height: number;
  bmi: number;
  bmiResult: number;
  gender: string;
  requireTrainer: string;
  package: string;
  importantGoals: string;
  haveBeenInGymBefore: string;
  enquiryDate: string;
  id: string;
}
export class Client implements IClient {
  firstName!: string;
  lastName!: string;
  email!: string;
  mobile!: number;
  weight!: number;
  height!: number;
  bmi!: number;
  bmiResult!: number;
  gender!: string;
  requireTrainer!: string;
  package!: string;
  importantGoals!: string;
  haveBeenInGymBefore!: string;
  enquiryDate!: string;
  id!: string;

  constructor(values?: IClient) {
    Object.assign(this, values);
  }
}
