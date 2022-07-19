import "../../node_modules/leaflet/dist/leaflet.css";
import "../assets/scss/style.scss";
import LeafletMap from "./map";
type CurrentLocation = {
  Latitude: number;
  Longitude: number;
};

class UserLocation {
  constructor(private Latitude?: number, private Longitude?: number) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    console.log("after :::", this);
  }

  getCurrentLocation(): Promise<GeolocationPosition> {
    if (!navigator.geolocation) {
      console.log("Your browser doesn't support Geolocation");
      return Promise.reject();
    } else {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          this.getOptions()
        );
      });
    }
  }

  private getOptions(): PositionOptions {
    return { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
  }

  location(): CurrentLocation {
    return {
      Latitude: <number>this.Latitude,
      Longitude: <number>this.Longitude,
    };
  }
}

window.addEventListener("load", () => {
  const loc = new UserLocation();
  loc.getCurrentLocation().then((position) => {
    new LeafletMap(
      position.coords.latitude,
      position.coords.longitude
    ).LoadMap();
  });
});
