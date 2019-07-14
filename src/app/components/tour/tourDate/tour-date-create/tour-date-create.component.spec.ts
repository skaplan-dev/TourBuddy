import { TourDateCreateComponent } from './tour-date-create.component';

describe('TourDateCreateComponent', () => {
  let component: TourDateCreateComponent;
  const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  const mat_dialog_data = jasmine.createSpy('MAT_DIALOG_DATA');
  const fb = jasmine.createSpyObj('FormBuilder', ['group']);
  const mapboxService = jasmine.createSpyObj('MapboxService', [
    'getCoordinates'
  ]);
  beforeEach(() => {
    component = new TourDateCreateComponent(
      dialogRef,
      mat_dialog_data,
      fb,
      mapboxService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
