import {
  Exercise,
  exerciseValue,
} from '../add-edit-max-wieght-modal/exercises.const';

export type exerciseType = 'push1' | 'push2' | 'pull1' | 'pull2' | 'legs';

export interface ExerciseWithInfo extends Exercise {
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
    imageUrl: 'assets/exercises/push1/1-1-2-side-lateral-raises.gif',
  },
  {
    name: 'Lying tricep extensions (Superset with waiter curls)',
    value: 'lying-tricep-extensions',
    imageUrl: 'assets/exercises/push1/lying-tricep-extensions.gif',
  },
  {
    name: 'Waiter curls (Superset with lying tricep extensions)',
    value: 'lying-tricep-extensions',
    imageUrl: 'assets/exercises/push1/lying-tricep-extensions.gif',
  },
  {
    name: 'Rotator cuff external rotations',
    value: 'rotator-cuff-external-rotations',
    imageUrl: 'assets/exercises/push1/rotator-cuff-external-rotations.gif',
  },
];

const push2: ExerciseWithInfo[] = [
  {
    name: 'Barbell overhead press',
    value: 'barbel-ohp',
    imageUrl: 'assets/exercises/push2/barbell-ohp.gif',
  },
  {
    name: 'Db underhand bench press',
    value: 'underhead-db-bench-press',
    imageUrl: 'assets/exercises/push2/underhead-db-bench-press.gif',
  },
  {
    name: 'Abduction rows',
    value: 'db-abduction-rows',
    imageUrl: 'assets/exercises/push2/db-abduction-rows.gif',
  },
  {
    name: 'Db floor flys',
    value: 'db-floor-flys',
    imageUrl: 'assets/exercises/push2/db-floor-flys.gif',
  },
  {
    name: 'Close grip brench press (Superset with Db curl of choice)',
    value: 'close-grip-bench-press',
    imageUrl: 'assets/exercises/push2/close-grip-bench-press.gif',
  },
  {
    name: 'Db curl of choice (Superset with Close grip brench press)',
    value: 'db-curl-of-choice',
    imageUrl: 'assets/exercises/push2/close-grip-bench-press.gif',
  },
  {
    name: 'Pushup plus',
    value: 'pushup-plus',
    imageUrl: 'assets/exercises/push2/pushup-plus.gif',
  },
];

const pull1: ExerciseWithInfo[] = [
  {
    name: 'Deadlifts',
    value: 'barbell-deadlift',
    imageUrl: 'assets/exercises/pull1/barbell-deadlift.gif',
  },
  {
    name: 'Chest supporter row',
    value: 'chest-supporter-row',
    imageUrl: 'assets/exercises/pull1/chest-supporter-row.gif',
  },
  {
    name: 'DB pullovers',
    value: 'db-lat-pullover',
    imageUrl: 'assets/exercises/pull1/db-lat-pullover.gif',
  },
  {
    name: 'Chest supporter row',
    value: 'chest-supporter-row',
    imageUrl: 'assets/exercises/pull1/chest-supporter-row.gif',
  },
  {
    name: 'Bicep chin curls (Superset with Overhead triceps extensions)',
    value: 'biceps-chin-curls',
    imageUrl: 'assets/exercises/pull1/biceps-chin-curls.gif',
  },
  {
    name: 'Overhead triceps extensions (Superset with Bicep chin curls)',
    value: 'overhead-tricep-extension',
    imageUrl: 'assets/exercises/pull1/biceps-chin-curls.gif',
  },
  {
    name: 'Angels and devils',
    value: 'angels-and-devils',
    imageUrl: 'assets/exercises/pull1/angels-and-devils.gif',
  },
];

const pull2: ExerciseWithInfo[] = [
  {
    name: 'Snatch grip deadlifts',
    value: 'snatch-grip-deadlift',
    imageUrl: 'assets/exercises/pull2/snatch-grip-deadlift.gif',
  },
  {
    name: 'Weighted pullups',
    value: 'weighted-pull-ups',
    imageUrl: 'assets/exercises/pull2/weighted-pull-ups.gif',
  },
  {
    name: 'Db gorilla rows',
    value: 'alt-db-gorilla-rows',
    imageUrl: 'assets/exercises/pull1/alt-db-gorilla-rows.gif',
  },
  {
    name: 'Straight arm pushdowns',
    value: 'straight-arm-pushdowns',
    imageUrl: 'assets/exercises/pull2/straight-arm-pushdowns.gif',
  },
  {
    name: 'Barbell curls (Superset with Tricep pushdowns)',
    value: 'barbell-curls',
    imageUrl: 'assets/exercises/pull2/barbell-curls.gif',
  },
  {
    name: 'Tricep pushdowns (Superset with Barbell curls)',
    value: 'barbell-curls',
    imageUrl: 'assets/exercises/pull2/barbell-curls.gif',
  },
  {
    name: 'Face pulls',
    value: 'face-pulls',
    imageUrl: 'assets/exercises/pull2/face-pulls.gif',
  },
];

const legs: ExerciseWithInfo[] = [
  {
    name: 'Barbell squats',
    value: 'barbell-squats',
    imageUrl: 'assets/exercises/legs/barbell-squats.gif',
  },
  {
    name: 'Barbel hip thrusts',
    value: 'barbel-hip-thrusts',
    imageUrl: 'assets/exercises/legs/barbel-hip-thrusts.gif',
  },
  {
    name: 'Barbel alternating reverse lunges',
    value: 'barbel-alternating-reverse-lunges',
    imageUrl: 'assets/exercises/legs/barbel-alternating-reverse-lunges.gif',
  },
  {
    name: 'Db alternating resverse lunges',
    value: 'db-alternating-reverse-lunges',
    imageUrl: 'assets/exercises/legs/db-alternating-reverse-lunges.gif',
  },
  {
    name: 'Db single leg RDLs (Alternate with Slick floor bridge curls)',
    value: 'db-single-leg-rdls',
    imageUrl: 'assets/exercises/legs/db-single-leg-rdls.gif',
  },
  {
    name: 'Slick floor bridge curls (Alternate with Db single leg RDLs)',
    value: 'slick-floor-bridge-curls',
    imageUrl: 'assets/exercises/legs/slick-floor-bridge-curls.gif',
  },
  {
    name: 'Standing db calf raises',
    value: 'standing-db-calf-raises',
    imageUrl: 'assets/exercises/legs/standing-db-calf-raises.gif',
  },
  {
    name: 'Seated db calf raises',
    value: 'seated-db-calf-raises',
    imageUrl: 'assets/exercises/legs/seated-db-calf-raises.gif',
  },
];

export const exercisesMap = new Map<exerciseType, ExerciseWithInfo[]>([
  ['push1', push1],
  ['push2', push2],
  ['pull1', pull1],
  ['pull2', pull2],
  ['legs', legs],
]);
