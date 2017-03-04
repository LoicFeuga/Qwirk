import { Qwirk2Page } from './app.po';

describe('qwirk2 App', function() {
  let page: Qwirk2Page;

  beforeEach(() => {
    page = new Qwirk2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
