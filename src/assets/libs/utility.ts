export default class Utility {
  constructor() {}
  static generatorId() {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }
}
