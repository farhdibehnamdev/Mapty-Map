import L, { Map } from "leaflet";

const form = <HTMLElement>document.querySelector(".mapty__form");
const distance = <HTMLElement>document.querySelector(".mapty__distance");
export default class LeafletMap {
  private _map: Map;
  constructor(private Latitude?: number, private Longitude?: number) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this._map = L.map("map");
    this._init();
    this.loadMap();
  }
  private _init() {
    document.addEventListener("submit", (e) => {
      this.formSubmit(e);
    });
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

  formSubmit(e: any) {
    e.preventDefault();

    if (!e.target.match(".mapty__form")) return;
    if (!form.classList.contains("hidden")) {
    }
  }
  private _showForm() {
    form.classList.remove("hidden");
    distance.focus();
  }
}
// document.addEventListener("submit", (e: any) => {
//   new LeafletMap().formSubmit(e);
// });
