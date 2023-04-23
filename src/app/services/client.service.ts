import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { IClient } from '../models/client.model';
import { BehaviorSubject, defer, finalize, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public clientsRef!: CollectionReference<DocumentData>;
  private isSpinnerActive = new BehaviorSubject<boolean>(false);
  public isSpinnerActive$ = this.isSpinnerActive.asObservable();

  constructor(private db: Firestore) {
    this.clientsRef = collection(this.db, 'clients');
  }

  getClients() {
    this.isSpinnerActive.next(true);
    return defer(() => from(getDocs(this.clientsRef))).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as IClient;
        });
      }),
      finalize(() => this.isSpinnerActive.next(false))
    );
  }

  getClientById(id: number) {
    this.isSpinnerActive.next(true);
    const clientDocRef = doc(this.db, `clients/${id}`);
    return defer(() => from(getDoc(clientDocRef))).pipe(
      map((doc) => {
        return { id: doc.id, ...doc.data() } as IClient;
      }),
      finalize(() => this.isSpinnerActive.next(false))
    );
  }

  addClient(client: IClient) {
    return defer(() => addDoc(this.clientsRef, client));
  }

  updateClient(client: IClient, id: number) {
    const clientDocRef = doc(this.db, `clients/${id}`);
    return defer(() => from(updateDoc(clientDocRef, { ...client })));
  }

  deleteClient(id: number) {
    const clientDocRef = doc(this.db, `clients/${id}`);
    return defer(() => from(deleteDoc(clientDocRef)));
  }
}
