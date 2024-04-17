import { Pipe, PipeTransform } from '@angular/core';
import { MuscleGroup } from '../add-edit-max-wieght-modal/musle-groups.const';
import { EXERCISES } from '../add-edit-max-wieght-modal/exercises.const';
import { MaxWeight } from '../domain';

@Pipe({
  name: 'appExercise',
  standalone: true,
})
export class ExercisePipe implements PipeTransform {
  transform(maxWeight: MaxWeight): string {
    return (
      EXERCISES.get(maxWeight.muscleGroup)?.find(
        (e) => e.value === maxWeight.exercise
      )?.name ?? ''
    );
  }
}
