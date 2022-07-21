import L, { map, Map } from "leaflet";
export default class LeafletMap {
  private _map: Map;

  constructor(private Latitude?: number, private Longitude?: number) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.loadMap();
    this._map = L.map("map");
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

    this._map.on("click", () => {});
  }

  addNewPosition() {}
}
