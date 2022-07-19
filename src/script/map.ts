import L from "leaflet";
export default class LeafletMap {
  constructor(private Latitude?: number, private Longitude?: number) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
  }

  LoadMap() {
    const map = L.map("map").setView(
      [<number>this.Latitude, <number>this.Longitude],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([<number>this.Latitude, <number>this.Longitude])
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();
  }
}
