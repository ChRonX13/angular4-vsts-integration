import { AppPage } from './app.po';
import {by, element} from 'protractor';

describe('angular-tour-of-heroes App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Tour of Heroes');
  });

  it ('should goto heroes page when Heroes link is clicked', () => {
    page.navigateTo();

    element(by.id('heroesLink')).click().then(() => {
      element(by.id('myHeroesHeader')).getText().then(function(text) {
        expect(text).toEqual("My Heroes");
      });
    });
  });

  it('should display new hero when it is added to the list', () => {
    page.navigateTo();

    element(by.id('heroesLink')).click().then(() => {
      element(by.id('addHeroInput')).sendKeys("newTestHero");
      element(by.id('addButton')).click().then(() => {
        var listElements = element.all(by.id('heroName'));
        expect(listElements.filter(function (heroName) {
          return heroName.getText().then(function (text) {
            return text === "newTestHero";
          });
        }).then(function (filteredElements) {
          return filteredElements.length > 0;
        })).toBe(true);
      });
    });
  });
});
