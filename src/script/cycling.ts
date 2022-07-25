import { Workout } from "./workout";

export class Cycling extends Workout {
  private speed?: number = 0;
  constructor(
    public typeWorkout: string,
    public distance: number,
    public duration: number,
    public elevGain?: number
  ) {
    super(typeWorkout, distance, duration);
    this.calcSpeed?.();
  }

  calcSpeed?(): number {
    this.speed = this.distance / (this.duration / 60);
    console.log("speed ::", this.speed);
    return this.speed;
  }
}
