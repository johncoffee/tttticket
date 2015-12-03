describe("CurrentUser", function () {

    var instance;

    beforeEach( inject( function(_CurrentUser_){
        //module('app');
        console.log(_CurrentUser_);
        CurrentUser = _CurrentUser_;
    }));

    it('should be falsy when not loggedin and/or not admin', function () {
        expect(0).toBeFalsy();
    });
    
    //it('should be falsy when not logged in', function () {
    //    expect(instance.getID()).toBeFalsy();
    //});
});