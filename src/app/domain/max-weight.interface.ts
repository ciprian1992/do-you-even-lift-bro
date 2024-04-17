// create maxweight model

import { Exercise } from '../add-edit-max-wieght-modal/exercises.const';
import { MuscleGroup } from '../add-edit-max-wieght-modal/musle-groups.const';

export interface MaxWeight {
  id: string;
  muscleGroup: MuscleGroup;
  exercise: string;
  date: number;
  reps?: number;
  maxWeight?: number;
  info?: string;
}
