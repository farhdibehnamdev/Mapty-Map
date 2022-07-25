export class Workout {
  constructor(
    public typeWorkout: string,
    public distance: number,
    public duration: number,
    public coords: LngLatLoc,
    public date: string
  ) {}

  makeWorkout() {}
}
