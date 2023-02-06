import { Sort } from '@angular/material/sort';
import { SortingService } from './sorting.service';

describe('Sorting service', () => {
  let sortingService: SortingService;

  beforeEach(() => {
    sortingService = new SortingService();
  });

  it('shoud take the same sort value by subscribing', (done: DoneFn) => {
    const mockSortData: Sort = {
      active: 'mock',
      direction: 'asc',
    };

    sortingService.setSort(mockSortData);

    sortingService.sorting.subscribe((data: Sort) => {
      expect(data).toEqual(mockSortData);
      done();
    });
  });

  it('shoud take the same filter value by subscribing', (done: DoneFn) => {
    const mockQueryData: string = 'mock query';

    sortingService.setFilter(mockQueryData);

    sortingService.filter.subscribe((data: string) => {
      expect(data).toEqual(mockQueryData);
      done();
    });
  });
});
