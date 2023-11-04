// cSpell:ignore ecosia

module.exports = {
    'example': () => {
        browser.navigateTo("https://www.ecosia.org/");
        browser.click("[data-test-id='main-nav-toggle']");
        browser.assert.good_listEquals("[data-test-id='main-nav-menu-group'] ul", [
            'Privacy',
            'Gift trees',
            'Blog',
            'Careers',
            'Help',
            'Settings'
        ]);
        browser.assert.textEquals("[data-test-id='hero-title']", 'The greenest way to search');
    }
};