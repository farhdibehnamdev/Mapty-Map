import { Workout } from "./workout";

export class Running extends Workout {
  constructor(
    public typeWorkout: string,
    public distance: number,
    public duration: number,
    public cadence: number
  ) {
    super(typeWorkout, distance, duration);
  }
}
