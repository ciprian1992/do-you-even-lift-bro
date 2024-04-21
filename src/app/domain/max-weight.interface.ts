// create maxweight model

import { Timestamp } from 'firebase/firestore';
import { Exercise } from '../add-edit-max-wieght-modal/exercises.const';
import { MuscleGroup } from '../add-edit-max-wieght-modal/musle-groups.const';

export interface MaxWeight {
  id: string;
  muscleGroup: MuscleGroup;
  exercise: string;
  date: Timestamp;
  reps?: number;
  maxWeight?: number;
  info?: string;
}
