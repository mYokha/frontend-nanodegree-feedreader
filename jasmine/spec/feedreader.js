/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function () {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty.
		 */
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('URLs are defined', function () {
			allFeeds.forEach(function (item) {
				expect(item.url).toBeDefined();
				expect(item.url).not.toBe('');
			});
		});
		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('names are defined', function () {
			allFeeds.forEach(function (item) {
				expect(item.name).toBeDefined();
				expect(item.name).not.toBe('');
			});
		});
	});

	/* A test suite named "The menu" */
	describe('The menu', function () {
		/* A test that ensures the menu element is
		 * hidden by default.
		 */
		it('is hidden by default', function () {
			expect($('body').hasClass('menu-hidden')).toBeTruthy();
		});
		/* A test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * has two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it('Changes visibility when icon is clicked', function () {
			if ($("body").hasClass("menu-hidden")) {
				$('.menu-icon-link').trigger('click');
				expect($('body').hasClass('menu-hidden')).toBeFalsy();
			}
			if (!($("body").hasClass("menu-hidden"))) {
				$('.menu-icon-link').trigger('click');
				expect($('body').hasClass('menu-hidden')).toBeTruthy();
			}
		});
	});
	/* A test suite named "Initial Entries" */
	describe('Initial Entries', function () {
		/* A test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * As loadFeed() is asynchronous this test uses
		 * Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function (done) {
			loadFeed(0, done);
		});

		it('there is at least a single .entry element within the .feed container', function () {
			expect($('.feed .entry').length).toBeGreaterThan(0);
			/*
		    * Another way to implement this:
			* expect($('.feed .entry')[0]).toBeTruthy();
			*/
		});
	});
	/* A test suite named "New Feed Selection" */
	describe('New Feed Selection', function () {
		/* A test that ensures that when a new feed is loaded
		 * by the loadFeed function the content actually changes.
		 * B.T.W. loadFeed() is asynchronous.
		 */
		var firstFeed, secondFeed;

		beforeEach(function (done) {
			loadFeed(0, function () {
				firstFeed = $('.feed').html();
				done();
			});
		});

		it('when a new feed is loaded the content actually changes', function (done) {
			loadFeed(1, function () {
				secondFeed = $('.feed').html();
				expect(secondFeed).not.toEqual(firstFeed);
				done();
			});
		});
	});
}());