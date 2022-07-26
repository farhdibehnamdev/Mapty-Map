import { Workout } from "./workout";

export class Running extends Workout {
  pace?: number;
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
    this.pace = this.calcPace?.();
  }

  calcPace?(): number {
    return this.duration / this.distance;
  }
}
