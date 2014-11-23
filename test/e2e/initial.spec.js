// Describe a feature
describe('My app has three tabs and can navigate', function() {
  it('start in Dashboard', function() {
    //browser.get('http://localhost:8100');
    var mytitle = element(by.css('.title'));
    expect(mytitle.getText()).toEqual('Dashboard');

    // element(by.model('todoText')).sendKeys('write a protractor test');
    // element(by.css('[value="add"]')).click();

    // var todoList = element.all(by.repeater('todo in todos'));
    // expect(todoList.count()).toEqual(3);
    // expect(todoList.get(2).getText()).toEqual('write a protractor test');
  });
  it('can go to friends', function() {
    
    //click in the Friends icon
    element(by.css('.ion-heart')).click();
    //Then i should be on the Friends tab
    var mytitle = element(by.css('.title'));
    expect(mytitle.getText()).toEqual('Friends');

  });
  it('can go to acount', function() {
    //click in the Friends icon
    element(by.css('.ion-gear-b')).click();
    //Then i should be on the Friends tab
    var mytitle = element(by.css('.title'));
    expect(mytitle.getText()).toEqual('Account');

  });
  it('can go back to dashboard', function() {
    //click in the Friends icon
    element(by.css('.ion-home')).click();
    //Then i should be on the Friends tab
    var mytitle = element(by.css('.title'));
    expect(mytitle.getText()).toEqual('Dashboard');
  });

 
});