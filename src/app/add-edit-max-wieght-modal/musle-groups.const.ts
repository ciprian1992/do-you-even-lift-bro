export type MuscleGroup = 'push' | 'pull' | 'legs' | 'abs';

export const muscleGroups: Map<MuscleGroup, string> = new Map([
  ['push', 'Push'],
  ['pull', 'Pull'],
  ['legs', 'Legs'],
  ['abs', 'Abs'],
]);
