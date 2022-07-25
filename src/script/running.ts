import { Workout } from "./workout";

export class Running extends Workout {
  private pace?: number = 0;
  constructor(
    public typeWorkout: string,
    public distance: number,
    public duration: number,
    public cadence?: number
  ) {
    super(typeWorkout, distance, duration);
    this.calcPace?.();
  }

  calcPace?(): number {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
