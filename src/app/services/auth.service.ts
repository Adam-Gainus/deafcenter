import { Injectable, signal } from '@angular/core';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = signal<User | null>(null);
  readonly isStaff = signal(false);

  constructor() {
    onAuthStateChanged(auth, async (user) => {
      this.user.set(user);
      this.isStaff.set(user ? await this.checkStaff(user.uid) : false);
    });
  }

  async logIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async logOut(): Promise<void> {
    await signOut(auth);
  }

  private async checkStaff(uid: string): Promise<boolean> {
    const staffDoc = await getDoc(doc(db, 'staff', uid));
    return staffDoc.exists();
  }
}
