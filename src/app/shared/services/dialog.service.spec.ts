import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        MatDialog,
        Overlay,
        {
          provide: MAT_DIALOG_SCROLL_STRATEGY,
          useValue: undefined,
        }
      ],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
