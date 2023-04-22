import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { IClient } from '../models/client.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:3000/enquiry';
  clientCollection!: CollectionReference<DocumentData>;

  constructor(private http: HttpClient, private db: Firestore) {
    this.clientCollection = collection(this.db, 'clients');
  }

  getClients() {
    return collectionData(this.clientCollection) as Observable<IClient[]>;
    return this.http.get<IClient[]>(`${this.baseUrl}`);
  }

  getClientById(id: number) {
    return this.http.get<IClient>(`${this.baseUrl}/${id}`);
  }

  addClient(client: IClient) {
    return from(
      addDoc(this.clientCollection, [
        {
          firstName: 'Ali',
          lastName: 'Bayramli',
          email: 'ali@gmail.com',
          mobile: '1234567',
          height: 1.78,
          weight: 76,
          bmi: 23.661438615467823,
          bmiResult: 'Normal',
          gender: 'Male',
          requireTrainer: 'No',
          package: 'Monthly',
          importantGoals: [
            'Energy and Endurance',
            'Healthier Digestive System',
            'Fitness',
          ],
          haveBeenInGymBefore: 'Yes',
          enquiryDate: '2023-04-10T20:00:00.000Z',
        },
        {
          firstName: 'Monica',
          lastName: 'Bellucci',
          email: 'monicabelluci@example.com',
          mobile: '11223344',
          height: 1.71,
          weight: 64,
          bmi: 21.887076365377382,
          bmiResult: 'Normal',
          gender: 'Female',
          requireTrainer: 'No',
          package: 'Quarterly',
          importantGoals: [
            'Toxic Fat reduction',
            'Sugar Craving Body',
            'Fitness',
          ],
          haveBeenInGymBefore: 'Yes',
          enquiryDate: '2023-05-08T20:00:00.000Z',
        },
        {
          firstName: 'Megan',
          lastName: 'Fox',
          email: 'meganfox@example.com',
          mobile: '1234567',
          height: 1.63,
          weight: 49,
          bmi: 18.442545824080696,
          bmiResult: 'Underweight',
          gender: 'Female',
          requireTrainer: 'Yes',
          package: 'Monthly',
          importantGoals: ['Healthier Digestive System', 'Sugar Craving Body'],
          haveBeenInGymBefore: 'Yes',
          enquiryDate: '2023-03-02T20:00:00.000Z',
        },
        {
          firstName: 'Raphael',
          lastName: 'Varane',
          email: 'raphaelvarane@example.com',
          mobile: '135792486',
          height: 1.89,
          weight: 82,
          bmi: 22.955684331345708,
          bmiResult: 'Normal',
          gender: 'Male',
          requireTrainer: 'No',
          package: 'Yearly',
          importantGoals: [
            'Energy and Endurance',
            'Healthier Digestive System',
            'Fitness',
          ],
          haveBeenInGymBefore: 'Yes',
          enquiryDate: '2023-06-18T20:00:00.000Z',
        },
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          mobile: '123123123',
          height: 1.81,
          weight: 92,
          bmi: 28.082170873904946,
          bmiResult: 'Overweight',
          gender: 'Male',
          requireTrainer: 'Yes',
          package: 'Monthly',
          importantGoals: ['Toxic Fat reduction'],
          haveBeenInGymBefore: 'No',
          enquiryDate: '2023-05-13T20:00:00.000Z',
        },
        {
          firstName: 'Some',
          lastName: 'Demo',
          email: 'some@demo.com',
          mobile: '123123133',
          height: 1.82,
          weight: 103,
          bmi: 31.095278348025598,
          bmiResult: 'Obese',
          gender: 'Female',
          requireTrainer: 'Yes',
          package: 'Yearly',
          importantGoals: [
            'Energy and Endurance',
            'Building Lean Muscle',
            'Sugar Craving Body',
          ],
          haveBeenInGymBefore: 'Yes',
          enquiryDate: '2023-04-26T20:00:00.000Z',
        },
      ])
    );
    return this.http.post<IClient>(`${this.baseUrl}`, client);
  }

  updateClient(client: IClient, id: number) {
    const clientDocumentReference = doc(this.db, `clients/${client.id}`);
    return from(updateDoc(clientDocumentReference, { ...client }));
    return this.http.put<IClient>(`${this.baseUrl}/${id}`, client);
  }

  deleteClient(id: number) {
    const clientDocumentReference = doc(this.db, `clients/${id}`);
    return from(deleteDoc(clientDocumentReference));
    return this.http.delete<number>(`${this.baseUrl}/${id}`);
  }
}
