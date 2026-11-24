import { computed, Injectable, signal } from '@angular/core';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../firebase';
import type { StaffRole } from '../models/staff-role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = signal<User | null>(null);
  readonly role = signal<StaffRole | null>(null);
  readonly isStaff = computed(() => this.role() !== null);
  readonly isApprover = computed(() => this.role() === 'manager' || this.role() === 'director');

  constructor() {
    onAuthStateChanged(auth, async (user) => {
      this.user.set(user);
      this.role.set(user ? await this.loadRole(user.uid) : null);
    });
  }

  async logIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async logOut(): Promise<void> {
    await signOut(auth);
  }

  private async loadRole(uid: string): Promise<StaffRole | null> {
    const staffDoc = await getDoc(doc(db, 'staff', uid));
    if (!staffDoc.exists()) {
      return null;
    }
    return staffDoc.data()['role'] ?? 'staff';
  }
}
