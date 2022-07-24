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
const dynamicElement = <HTMLInputElement>(
  document.querySelector(".mapty__cadence")
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
    typeWorkout.addEventListener(
      "change",
      this._selectWorkoutHandler.bind(this)
    );
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

  private _selectWorkoutHandler() {
    if (typeWorkout.value === "running") {
      if (!dynamicElement.classList.contains("mapty__cadence")) {
        this._updateInputBasedOnType(
          "Cadence",
          "step/min",
          "mapty__elev",
          "mapty__cadence"
        );
      }
    } else if (typeWorkout.value === "cycling") {
      if (!dynamicElement.classList.contains("mapty__elev")) {
        this._updateInputBasedOnType(
          "Elev Gain",
          "meters",
          "mapty__cadence",
          "mapty__elev"
        );
      }
    }
  }
  formSubmit(e: SubmitEvent) {
    e.preventDefault();
    this._newWorkout();
    console.log(this._workouts);
  }

  private _updateInputBasedOnType(
    lblName: string,
    placeHolderValue: string,
    removeClass: string,
    addClass: string
  ) {
    const elem: HTMLElement | any = dynamicElement.closest(".mapty__row");
    const labelEl: HTMLLabelElement | any = elem?.querySelector("label");
    labelEl.textContent = lblName;
    dynamicElement.classList.remove(removeClass);
    dynamicElement.classList.add(addClass);
    dynamicElement.placeholder = placeHolderValue;
  }

  private _newWorkout(): void {
    if (typeWorkout.value === "running") {
      const running = new Running(
        typeWorkout.value,
        Number.parseInt(distance.value),
        Number.parseInt(duration.value),
        Number.parseInt(dynamicElement.value)
      );
      this._workouts.push(running);
    } else if (typeWorkout.value === "cycling") {
      const cycling = new Cycling(
        typeWorkout.value,
        Number.parseInt(distance.value),
        Number.parseInt(duration.value),
        Number.parseInt(dynamicElement.value)
      );
      this._workouts.push(cycling);
    }
  }
  private _showForm() {
    form.classList.remove("hidden");
    distance.focus();
  }
}
