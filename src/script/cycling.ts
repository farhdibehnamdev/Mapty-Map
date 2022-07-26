import { Workout } from "./workout";

export class Cycling extends Workout {
  private speed?: number = 0;
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
    this.calcSpeed?.();
  }

  calcSpeed?(): number {
    this.speed = this.distance / (this.duration / 60);
    console.log("speed ::", this.speed);
    return this.speed;
  }
}
