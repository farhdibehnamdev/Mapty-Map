import { Workout } from "./workout";

export class Cycling extends Workout {
  speed?: number;
  constructor(
    public id: string,
    public typeWorkout: string,
    public distance: number,
    public duration: number,
    public coords: LngLatLoc,
    public date: string,
    public elevGain?: number
  ) {
    super(typeWorkout, distance, duration, coords, date);
    this.speed = this.calcSpeed?.();
  }

  calcSpeed?(): number {
    return parseInt((this.distance / (this.duration / 60)).toFixed(1));
  }
}
