import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { setting } from "src/app/settings/setting";
import { AuthenticationService } from "./authentication.service";

describe('Auth service', () => {
  let authService: AuthenticationService;

  const router: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router }
      ]
    });
    authService = new AuthenticationService(router);
  });

  it('Should navigate to the Home page', () => {
    authService.login(new Event('submit'));
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('Should generate token', () => {
    localStorage.removeItem(setting.stringConstants.storeNames.token);

    authService.login(new Event('submit'));

    const newToken = localStorage.getItem(setting.stringConstants.storeNames.token);
    expect(newToken).toBeTruthy();
  });

  it('Should logout', () => {
    authService.signIn(new Event('submit'));
    authService.logout();

    const deletedToken = localStorage.getItem(setting.stringConstants.storeNames.token);
    expect(deletedToken).toBeFalsy();
  });

  it('Should change login state', (done: DoneFn) => {
    authService.login(new Event('submit'));
    authService.logout();

    authService.loginState$.subscribe((state: boolean) => {
      expect(state).toEqual(false);
      done();
    });
  });
});
