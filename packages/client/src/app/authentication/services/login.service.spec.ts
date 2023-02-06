import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { setting } from "src/app/settings/setting";
import { LoginService } from "./login.service";

describe('Login service', () => {
  let loginService: LoginService;

  const router: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router }
      ]
    });
    loginService = new LoginService(router);
  });

  it('Should navigate to the Login page', () => {
    loginService.goToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('Should navigate to the Home page', () => {
    loginService.login(new Event('submit'));
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('Should generate token', () => {
    localStorage.removeItem(setting.stringConstants.storeNames.token);

    loginService.login(new Event('submit'));

    const newToken = localStorage.getItem(setting.stringConstants.storeNames.token);
    expect(newToken).toBeTruthy();
  });

  it('Should logout', () => {
    loginService.login(new Event('submit'));
    loginService.logout();

    const deletedToken = localStorage.getItem(setting.stringConstants.storeNames.token);
    expect(deletedToken).toBeFalsy();
  });

  it('Should change login state', (done: DoneFn) => {
    loginService.login(new Event('submit'));
    loginService.logout();

    loginService.loginState$.subscribe((state: boolean) => {
      expect(state).toEqual(false);
      done();
    });
  });
});
