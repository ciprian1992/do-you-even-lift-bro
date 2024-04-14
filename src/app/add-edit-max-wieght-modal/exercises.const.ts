import { MuscleGroup } from './musle-groups.const';

export interface Exercise {
  name: string;
  value: string;
}

export const EXERCISES = new Map<MuscleGroup, Exercise[]>([
  [
    'pull',
    [
      { name: 'Barbell deadlift', value: 'barbell-deadlift' },
      { name: 'Chest supporter row', value: 'chest-supporter-row' },
      { name: 'Db lat pullover', value: 'db-lat-pullover' },
      { name: 'Db high pulls', value: 'db-high-pulls' },
      { name: 'Biceps chin curls', value: 'biceps-chin-curls' },
      { name: 'Angels and devils', value: 'angels-and-devils' },
      { name: 'Snatch grip deadlift', value: 'snatch-grip-deadlift' },
      { name: 'Weighted pull ups', value: 'weighted-pull-ups' },
      { name: 'Alt db gorilla rows', value: 'alt-db-gorilla-rows' },
      { name: 'Straight arm pushdowns', value: 'straight-arm-pushdowns' },
      { name: 'Barbell curls', value: 'barbell-curls' },
      { name: 'Ez curls', value: 'ez-curls' },
      { name: 'Face pulls', value: 'face-pulls' },
      { name: 'Db waiters curls', value: 'db-waiters-curls' },
      { name: 'Db curl of choice', value: 'db-curl-of-choice' },
    ],
  ],
  [
    'push',
    [
      { name: 'Barbell bench press', value: 'barbell-bench-press' },
      { name: 'Hi-to-low crossovers', value: 'hi-to-low-crossovers' },
      { name: 'Db shoulder press', value: 'db-shoulder-press' },
      {
        name: '1 1/2 side lateral raises',
        value: '1-1-2-side-lateral-raises',
      },
      { name: 'Lying tricep extensions', value: 'lying-tricep-extensions' },
      {
        name: 'Rotator cuff external rotations',
        value: 'rotator-cuff-external-rotations',
      },
      { name: 'Barbel ohp', value: 'barbel-ohp' },
      { name: 'Underhead db bench press', value: 'underhead-db-bench-press' },
      { name: 'Db abduction rows', value: 'db-abduction-rows' },
      { name: 'Db floor flys', value: 'db-floor-flys' },
      { name: 'Close grip bench press', value: 'close-grip-bench-press' },
      { name: 'Pushup plus', value: 'pushup-plus' },
      { name: 'Overhead tricep extension', value: 'overhead-tricep-extension' },
      { name: 'Triceps pushdowns', value: 'triceps-pushdowns' },
    ],
  ],
  [
    'legs',
    [
      { name: 'Barbell squats', value: 'barbell-squats' },
      { name: 'Barbel hip thrusts', value: 'barbel-hip-thrusts' },
      {
        name: 'Barbel alternating reverse lunges',
        value: 'barbel-alternating-reverse-lunges',
      },
      {
        name: 'Db alternating resverse lunges',
        value: 'db-alternating-reverse-lunges',
      },
      {
        name: 'Db single leg RDLs',
        value: 'db-single-leg-rdls',
      },
      {
        name: 'Slick floor bridge curls',
        value: 'slick floor bridge curls',
      },
      {
        name: 'Standing db calf raises',
        value: 'standing-db-calf-raises',
      },
      {
        name: 'Seated db calf raises',
        value: 'seated-db-calf-raises',
      },
    ],
  ],
  [
    'abs',
    [
      { name: 'Side-abs', value: 'side-abs' },
      { name: 'Cruncher', value: 'cruncher' },
    ],
  ],
]);
