import { MiniLeadscorePage } from './app.po';

describe('mini-leadscore App', () => {
  let page: MiniLeadscorePage;

  beforeEach(() => {
    page = new MiniLeadscorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
