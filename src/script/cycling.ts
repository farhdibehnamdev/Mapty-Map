import { Workout } from "./workout";

export class Cycling extends Workout {
  constructor(
    public typeWorkout: string,
    public distance: number,
    public duration: number,
    public elevGain: number
  ) {
    super(typeWorkout, distance, duration);
  }
}
