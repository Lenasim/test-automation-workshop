import { getDisplayName, TrainingType } from './Wilder';

describe('getDisplayName', () => {
  describe('when not passed city', () => {
    it('returns question mark and full name', () => {
      expect(getDisplayName('Lucie', 'Laforêt')).toEqual('[?] Lucie Laforêt');
    });
  });

  describe('when passed city', () => {
    describe('when passed city without custom code', () => {
      it('returns city and full name', () => {
        expect(getDisplayName('Lucie', 'Laforêt', 'Marseille')).toEqual(
          '[Marseille] Lucie Laforêt'
        );
      });
    });

    describe('when passed city with custom code', () => {
      it('returns city code and full name', () => {
        expect(getDisplayName('Lucie', 'Laforêt', 'Paris')).toEqual(
          '[PAR] Lucie Laforêt'
        );
        expect(getDisplayName('Lucie', 'Laforêt', 'Strasbourg')).toEqual(
          '[SXB] Lucie Laforêt'
        );
      });
    });
  });

  describe('when passed WORK_AND_STUDY as training type', () => {
    it('returns WnS label and full name', () => {
      expect(
        getDisplayName(
          'Lucie',
          'Laforêt',
          undefined,
          TrainingType.WORK_AND_STUDY
        )
      ).toEqual('[? - WnS] Lucie Laforêt');
    });
  });
});
