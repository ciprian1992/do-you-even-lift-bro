import {
  Exercise,
  exerciseValue,
} from '../add-edit-max-wieght-modal/exercises.const';

export type exerciseType = 'push1' | 'push2' | 'pull1' | 'pull2' | 'legs';

interface ExerciseWithInfo extends Exercise {
  imageUrl: string;
}

const push1: ExerciseWithInfo[] = [
  {
    name: 'Barbell bench press',
    value: 'barbell-bench-press',
    imageUrl: 'assets/exercises/push1/barbell-bench-press.gif',
  },
  {
    name: 'Hi to low crossovers',
    value: 'hi-to-low-crossovers',
    imageUrl: 'assets/exercises/push1/hi-to-low-crossovers.gif',
  },
  {
    name: 'Db shoulder press',
    value: 'db-shoulder-press',
    imageUrl: 'assets/exercises/push1/db-shoulder-press.gif',
  },
  {
    name: '1-1-2 side lateral raises',
    value: '1-1-2-side-lateral-raises',
    imageUrl: 'assets/exercises/push1/side-lateral-raises.gif',
  },
  {
    name: 'Lying tricep extensions (Superset with waiter curls)',
    value: 'lying-tricep-extensions',
    imageUrl: 'assets/exercises/push1/lying-triceps-waiter-curls.gif',
  },
  {
    name: 'Waiter curls (Superset with lying tricep extensions)',
    value: 'lying-tricep-extensions',
    imageUrl: 'assets/exercises/push1/lying-triceps-waiter-curls.gif',
  },
  {
    name: 'Rotator cuff external rotations',
    value: 'rotator-cuff-external-rotations',
    imageUrl: 'assets/exercises/push1/rotator_cuff_extension.gif',
  },
];

export const exercisesMap = new Map<exerciseType, Exercise[]>([
  ['push1', push1],
]);
