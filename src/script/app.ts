import "../../node_modules/leaflet/dist/leaflet.css";
import "../assets/scss/style.scss";
import logo from "../assets/images/logo.png";
import LeafletMap from "./map";
const lg = <HTMLImageElement>document.querySelector(".mapty__logo");
lg.src = logo;

class App {
  constructor() {
    this.getCurrentLocation().then((position) => {
      new LeafletMap(position.coords.latitude, position.coords.longitude);
    });
  }

  private getCurrentLocation(): Promise<GeolocationPosition> {
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
}

const app = new App();
