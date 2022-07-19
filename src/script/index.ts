import "../assets/scss/style.scss";

type CurrentLocation = {
  Latitude: number;
  Longitude: number;
};

class UserLocation {
  constructor(private Latitude?: number, private Longitude?: number) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
  }

  getCurrentLocation(): void {
    if (!navigator.geolocation) {
      console.log("Your browser doesn't support Geolocation");
      return;
    } else {
      navigator.geolocation.getCurrentPosition(
        this.onSuccess.bind(this),
        this.onError,
        this.getOptions()
      );
    }
  }

  private getOptions(): PositionOptions {
    console.log("getOptions :::", this);
    return { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
  }

  private onSuccess(pos: GeolocationPosition): void {
    const coord = pos.coords;

    this.Latitude = <number>coord.latitude;
    this.Longitude = <number>coord.longitude;
  }

  private onError(): void {
    alert("Failed to get your location.");
  }

  get location(): CurrentLocation {
    return {
      Latitude: <number>this.Latitude,
      Longitude: <number>this.Longitude,
    };
  }
}

window.addEventListener("load", () => {
  const loc = new UserLocation();
  loc.getCurrentLocation();
});
