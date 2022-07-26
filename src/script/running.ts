import { Workout } from "./workout";

export class Running extends Workout {
  private pace?: number = 0;
  constructor(
    public id: string,
    public typeWorkout: string,
    public distance: number,
    public duration: number,
    public coords: LngLatLoc,
    public date: string,
    public cadence?: number
  ) {
    super(typeWorkout, distance, duration, coords, date);
    this.calcPace?.();
  }

  calcPace?(): number {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
