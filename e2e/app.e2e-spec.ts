import { BabyUniversePage } from './app.po';

describe('baby-universe App', () => {
  let page: BabyUniversePage;

  beforeEach(() => {
    page = new BabyUniversePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
