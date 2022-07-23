import L, { Map } from "leaflet";

const form = <HTMLFormElement>document.querySelector("#form");
const distance = <HTMLElement>document.querySelector(".mapty__distance");
export default class LeafletMap {
  private _map: Map;
  constructor(private Latitude?: number, private Longitude?: number) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this._map = L.map("map");
    this.loadMap();
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
  }
  private _showForm() {
    form.classList.remove("hidden");
    distance.focus();
  }
}
