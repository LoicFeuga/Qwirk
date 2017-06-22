import { QwirkPage } from './app.po';

describe('qwirk App', () => {
  let page: QwirkPage;

  beforeEach(() => {
    page = new QwirkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
