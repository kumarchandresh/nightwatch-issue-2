// cSpell:ignore ecosia

module.exports = {
    'example': () => {
        browser.navigateTo("https://www.ecosia.org/");
        browser.click("[data-test-id='main-nav-toggle']");

        browser.assert.bad_listEquals("[data-test-id='main-nav-menu-group'] ul", [
            'Privacy',
            'Gift trees',
            'Blog',
            'Careers',
            'Help',
            'Settings'
        ]); // <- Nightwatch will stop execution without any warning

        // The following will never run
        browser.assert.textEquals("[data-test-id='hero-title']", 'The greenest way to search');
    }
};