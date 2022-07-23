import L, { Map } from "leaflet";
import { Workout } from "./workout";
import { Running } from "./running";
import { Cycling } from "./Cycling";
const form = <HTMLFormElement>document.querySelector("#form");
const typeWorkout = <HTMLSelectElement>(
  document.querySelector(".mapty__type-workout")
);
const distance = <HTMLInputElement>document.querySelector(".mapty__distance");
const duration = <HTMLInputElement>document.querySelector(".mapty__duration");
const cadence = <HTMLInputElement>document.querySelector(".mapty__cadence");
const elevGain = <HTMLInputElement>document.querySelector(".mapty__elevGain");
const checkElementType = <HTMLInputElement>(
  document.querySelector(".type--cadence")
);
export default class LeafletMap {
  private _map: Map;
  private _workouts: Workout[];
  constructor(private Latitude?: number, private Longitude?: number) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this._map = L.map("map");
    this.loadMap();
    this._workouts = [];
    form.addEventListener("submit", this.formSubmit.bind(this));
  }

  private loadMap(): void {
    this._map.setView([<number>this.Latitude, <number>this.Longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);

    L.marker([<number>this.Latitude, <number>this.Longitude])
      .addTo(this._map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();

    this._map.on("click", () => {
      this._showForm();
    });
  }

  formSubmit(e: SubmitEvent) {
    e.preventDefault();
    this._newWorkout();
    console.log(this._workouts);
  }

  private _newWorkout() {
    if (typeWorkout.value === "running") {
      if (!cadence.value) {
        const elem: HTMLElement | any = cadence.closest(".mapty__row");
        const labelEl: HTMLLabelElement | any = elem?.querySelector("label");
        labelEl.textContent = "Cadence";
        cadence.classList.remove("mapty__elev");
        cadence.classList.add("mapty__cadence");
        cadence.placeholder = "step/min";
      }
      const running = new Running(
        typeWorkout.value,
        Number.parseInt(distance.value),
        Number.parseInt(duration.value),
        Number.parseInt(cadence.value)
      );
      this._workouts.push(running);
    } else if (typeWorkout.value === "cycling") {
      if (cadence.value) {
        const elem: HTMLElement | any = cadence.closest(".mapty__row");
        const labelEl: HTMLLabelElement | any = elem?.querySelector("label");
        labelEl.textContent = "Elev Gain";
        cadence.classList.remove("mapty__cadence");
        cadence.classList.add("mapty__elev");
        cadence.placeholder = "meters";
      }
      const cycling = new Cycling(
        typeWorkout.value,
        Number.parseInt(distance.value),
        Number.parseInt(duration.value),
        Number.parseInt(elevGain.value)
      );
      this._workouts.push(cycling);
    }
  }
  private _showForm() {
    form.classList.remove("hidden");
    distance.focus();
  }
}
