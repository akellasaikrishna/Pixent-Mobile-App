import { BehaviorSubject } from "rxjs";

class DataSharingService {
  private source = new BehaviorSubject({});
  private userType = new BehaviorSubject("CUSTOMER");
  private reloadWerkkOrderScreen = new BehaviorSubject(false);
  private checkIsWerkker = new BehaviorSubject(false);
  private notificationCount = new BehaviorSubject(0);
  private deviceLocationAddress = new BehaviorSubject("");
  private profilePic = new BehaviorSubject(null);

  getUser = this.source.asObservable();

  getUserType = this.userType.asObservable();

  getReloadWerkkOrderScreen = this.reloadWerkkOrderScreen.asObservable();

  getCheckIsWerkker = this.checkIsWerkker.asObservable();

  getNotificationCount = this.notificationCount.asObservable();

  getDeviceLocationAddress = this.deviceLocationAddress.asObservable();

  getProfilePic = this.profilePic.asObservable();

  constructor() {}

  setUser(data: any) {
    this.source.next(data);
  }

  setUserType(data: any) {
    this.userType.next(data);
  }

  setReloadWerkkOrderScreen(data: any) {
    this.reloadWerkkOrderScreen.next(data);
  }

  setCheckIsWerkker(data: any) {
    this.checkIsWerkker.next(data);
  }

  setNotificationCount(data: any) {
    this.notificationCount.next(data);
  }

  setDeviceLocationAddress(data: any) {
    this.deviceLocationAddress.next(data);
  }

  setProfilePic(data: any) {
    this.profilePic.next(data);
  }
}

export default new DataSharingService();
