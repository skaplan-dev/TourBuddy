import { SecondsToHoursPipe } from './seconds-to-hours.pipe';

describe('SecondsToHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new SecondsToHoursPipe();
    expect(pipe).toBeTruthy();
  });
});
