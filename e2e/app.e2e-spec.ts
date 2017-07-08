import { BirdsPage } from './app.po';

describe('birds App', () => {
  let page: BirdsPage;

  beforeEach(() => {
    page = new BirdsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
