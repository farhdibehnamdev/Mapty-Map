type CurrentLocation = {
  Latitude: number;
  Longitude: number;
};

class UserLocation {
  constructor(public Latitude?: number, public Longitude?: number) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
  }

  getCurrentLocation(): void {
    if (!navigator.geolocation) {
      console.log("Your browser doesn't support Geolocation");
      return;
    } else {
      navigator.geolocation.getCurrentPosition(
        this.onSuccess,
        this.onError,
        this.getOptions()
      );
    }
  }

  private getOptions(): PositionOptions {
    return { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
  }

  private onSuccess(pos: GeolocationPosition) {
    const coord = pos.coords;
    this.location.Latitude = <number>coord.latitude;
    this.location.Longitude = <number>coord.longitude;
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
  new UserLocation();
});
