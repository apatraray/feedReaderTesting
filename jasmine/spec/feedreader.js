/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable has been
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed in the allFeeds object
         * and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have url defined', function(){
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* Test that loops through each feed in the allFeeds object
         * and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name defined', function(){
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* Test suite having name "The menu" */
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('changes visibility on click', function(){
            //when menu icon is clicked first time, menu items should not be hidden
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            //when menu icon is clicked second time, menu items should be hidden
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite for name "Initial Entries" */
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
    describe('Initial Entries', function() {
        var entryCount = 0;
        beforeEach(function(done){
            loadFeed(0, function(){
                entryCount = $('.entry').length;
                done();
            });
        });
        it('has at least a single entry element within the feed container', function(){
            expect(entryCount).not.toBe(0);
        });
    });
    /* Test suite for name "New Feed Selection" */
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
    describe('New Feed Selection', function() {
        var initialContent,
            laterContent;
        initialContent = $('.feed').innerHTML;
        beforeEach(function(done){
            loadFeed(1, function(){
                initialContent = $('.feed').html();
            loadFeed(2, function(){
                laterContent = $('.feed').html();
                done();
            });
        });
        });
        it('ensures the content actually changes when a new feed is loaded by loadFeed function', function(){
            expect(laterContent).not.toEqual(initialContent);
        });
    });
}());