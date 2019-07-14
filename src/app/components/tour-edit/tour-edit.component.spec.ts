import { TourEditComponent } from './tour-edit.component';

describe('TourEditComponent', () => {
  let component: TourEditComponent;
  const dialogRef = jasmine.createSpyObj('MatDialog', ['close']);
  const mat_dialog_data = jasmine.createSpyObj('tour', ['']);
  const fb = jasmine.createSpyObj('FormBuilder', ['group']);
  const fileService = jasmine.createSpyObj('fileService', [
    jasmine
      .createSpy('uploadFile')
      .and.returnValue({ task: { percentageChanges: () => {} } })
  ]);

  beforeEach(() => {
    component = new TourEditComponent(
      dialogRef,
      mat_dialog_data,
      fb,
      fileService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
