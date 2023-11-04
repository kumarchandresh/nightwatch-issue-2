/**
 *
 * @param {string} cssSelector <ul>
 * @param {string[]} expected List of expected items in the <ul>
 * @param {string} [msg]
 */
exports.assertion = function (cssSelector, expected, msg) {

    // If the custom commands operates with DOM elements, this options should be set
    // this.options = {
    //   elementSelector: true
    // };

    /**
     * Returns the message format which will be used to output the message in the console and also
     *  the arguments which will be used for replace the place holders, used in the order of appearance
     *
     * The message format also takes into account whether the .not negate has been used
     *
     * @return {{args: [], message: string}}
     */
    this.formatMessage = function () {
        // Use this.negate to determine if ".not" is in use
        // Example:
        const message = msg || `Testing if the dropdown ${this.negate ? `doesn't equal %s` : `equals %s`}`;

        return {
            message,
            args: [`[${expected.join(', ')}]`]
        }
    };

    /**
      * Returns the expected value of the assertion which is displayed in the case of a failure
      *
      * @return {string}
      */
    this.expected = function () {
        return this.negate ? `is not '[${expected.join(', ')}]'` : `is '[${expected.join(', ')}]'`;
    };

    /**
     * Given the value, the condition used to evaluate if the assertion is passed
     * @param {*} value
     * @return {Boolean}
     */
    this.evaluate = function (value) {
        if (!Array.isArray(value)) { throw new TypeError('Uh,oh! Expected command result to be an array') }
        if (!Array.isArray(expected)) { return false }
        if (value.length !== expected.length) { return false }
        for (let i = 0; i < value.length; ++i) {
            if (value[i] !== expected[i]) {
                return false;
            }
        }
        return true;
    };

    /**
     * Called with the result object of the command to retrieve the value which is to be evaluated
     *
     * @param {Object} result
     * @return {*}
     */
    this.value = function (result) {
        return result.value;
    };

    /**
     * When defined, this method is called by the assertion runner with the command result, to determine if the
     *  value can be retrieved successfully from the result object
     *
     * @param result
     * @return {boolean|*}
     */
    this.failure = function (result) {
        return result === false || result && result.status === -1;
    };

    /**
     * When defined, this method is called by the assertion runner with the command result to determine the actual
     *  state of the assertion in the event of a failure
     *
     * @param {Boolean} passed
     * @return {string}
     */
    this.actual = function (passed) {
        return passed ? `equals '[${expected.join(', ')}]'` : `not equals '[${expected.join(', ')}]'`;
    };

    /**
     * The command which is to be executed by the assertion runner; Nightwatch api is available as this.api
     * @param {function} callback
     */
    this.command = function (callback) {
        this.api.findElements(cssSelector + ' li', (result) => {
            const listItems = [];
            result.value.forEach((el, i) => this.api.elementIdText(el.getId(), (result) => { listItems[i] = result }));
            this.api.perform(() => {
                if (listItems.some(({ status }) => status !== 0)) {
                    callback({ status: -1, value: null });
                } else {
                    callback({ status: 0, value: listItems.map(({ value }) => value), });
                }
            });
        });
    };

};
