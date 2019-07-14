import { TourCreateComponent } from './tour-create.component';

describe('TourCreateComponent', () => {
  let component: TourCreateComponent;
  const dialogRef = jasmine.createSpyObj('MatDialog', ['close']);
  const mat_dialog_data = jasmine.createSpyObj('tour', ['']);
  const fb = jasmine.createSpyObj('FormBuilder', ['group']);
  const fileService = jasmine.createSpyObj('fileService', ['uploadFile']);

  beforeEach(() => {
    component = new TourCreateComponent(
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
