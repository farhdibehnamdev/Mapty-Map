import L, { latLng, Map } from "leaflet";
import { Workout } from "./workout";
import { Running } from "./running";
import { Cycling } from "./Cycling";
type CyclingRunning = Cycling & Running;

const form = <HTMLFormElement>document.querySelector("#form");
const workouts = <HTMLElement>document.querySelector(".workouts");
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
  private _workouts: CyclingRunning[];
  private _months: string[];
  constructor(private Latitude?: number, private Longitude?: number) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this._map = L.map("map");
    this.loadMap();
    this._workouts = [];
    this._months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
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

    this._map.on("click", (e) => {
      const coord = e.latlng;
      this.Latitude = coord.lat;
      this.Longitude = coord.lng;
      this._showForm();
    });
  }

  private _makeWorkoutUI(workout: CyclingRunning): string {
    return `<div class="workout workout--${workout.typeWorkout}">
    <h2 class="workout__title">${
      workout.typeWorkout
    } on ${this._getCurrentDate()}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.typeWorkout === "running" ? "🏃‍♂️" : "🚴‍♀️"
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">KM</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">MIN</span>
    </div>

    <div class="workout__details">
      <span class="workout__icon">⚡</span>
      <span class="workout__value">${
        workout.typeWorkout === "running"
          ? workout.calcPace?.()
          : workout.calcSpeed?.()
      }</span>
      <span class="workout__unit">${
        workout.typeWorkout === "running" ? "MIN/KM" : "KM/H"
      }</span>
    </div>
    <div class="workout__details">
    <span class="workout__icon">${
      workout.typeWorkout === "running" ? "🦶" : "⛰"
    }</span>
    <span class="workout__value">${
      workout.typeWorkout === "running" ? workout.cadence : workout.elevGain
    }</span>
    <span class="workout__unit">${
      workout.typeWorkout === "running" ? "SPM" : "M"
    }</span>
  </div>
  </div>`;
  }

  private _renderWorkouts() {
    workouts.innerHTML += this._makeWorkoutUI(
      <CyclingRunning>this._workouts.at(this._workouts.length - 1)
    );
  }
  private _selectWorkoutHandler(): void {
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

  formSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._newWorkout();
    console.log(this._workouts);
    this._renderWorkouts();
  }

  private _updateInputBasedOnType(
    lblName: string,
    placeHolderValue: string,
    removeClass: string,
    addClass: string
  ): void {
    const elem: HTMLElement | any = dynamicElement.closest(".mapty__row");
    const labelEl: HTMLLabelElement | any = elem?.querySelector("label");
    labelEl.textContent = lblName;
    dynamicElement.classList.remove(removeClass);
    dynamicElement.classList.add(addClass);
    dynamicElement.placeholder = placeHolderValue;
  }
  private _newMarkerLocation(popupValue: string): void {
    let newLatLng = new L.LatLng(<number>this.Latitude, <number>this.Longitude);
    L.marker([<number>this.Latitude, <number>this.Longitude])
      .addTo(this._map)
      .setLatLng(newLatLng)
      .bindPopup(popupValue)
      .openPopup();
  }
  private _getCurrentDate(): string {
    const date = new Date();
    const nameOfMonth: string = this._months[date.getMonth() + 1];
    const dayNumber = String(date.getDate()).padStart(2, "0");
    return `${nameOfMonth} ${dayNumber}`;
  }
  private _newWorkout(): void {
    const coord: LngLatLoc = {
      Latitude: this.Latitude,
      Longitude: this.Longitude,
    };
    if (typeWorkout.value === "running") {
      const running = new Running(
        typeWorkout.value,
        Number.parseInt(distance.value),
        Number.parseInt(duration.value),
        coord,
        this._getCurrentDate(),
        Number.parseInt(dynamicElement.value)
      );
      this._workouts.push(running);
      this._newMarkerLocation(`Running on ${this._getCurrentDate()}`);
    } else if (typeWorkout.value === "cycling") {
      const cycling = new Cycling(
        typeWorkout.value,
        Number.parseInt(distance.value),
        Number.parseInt(duration.value),
        coord,
        this._getCurrentDate(),
        Number.parseInt(dynamicElement.value)
      );
      this._workouts.push(cycling);
      this._newMarkerLocation(`Cycling on ${this._getCurrentDate()}`);
    }
    this._hideForm();
  }
  private _showForm(): void {
    form.classList.remove("hidden");
    distance.focus();
  }
  private _hideForm(): void {
    form.classList.add("hidden");
  }
}
