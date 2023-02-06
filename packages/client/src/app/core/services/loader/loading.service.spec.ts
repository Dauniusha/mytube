import { LoadingService } from './loading.service';

describe('Loading service ', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    loadingService = new LoadingService();
  });

  it('when calling a function loding should toogle isLoading state to true', () => {
    loadingService.loading();
    expect(loadingService.isLoading).toBeTrue();
  });

  it('when calling a function lodout should toogle isLoading state to false', () => {
    loadingService.loaded();
    expect(loadingService.isLoading).toBeFalse();
  });
});
