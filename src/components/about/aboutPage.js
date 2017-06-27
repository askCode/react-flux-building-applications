(function () {
    "use strict";
    var React = require('react');

    var AboutPage = React.createClass({
        statics: {
            willTransitionTo: function (transition, params, query, callback) {
                if (!confirm('Are you sure want to read details about us?')) {
                    transition.abort();
                }
                else {
                    callback();
                }
            },
            willTransitionFrom: function (transition, component) {
                if (!confirm('Are you sure want to leave the page?')) {
                    transition.abort();
                }
            }
        },
        render: function () {
            return (
                <div>
                    <h1>About</h1>
                    <p> This application uses the following technologies:
                    <ul>
                            <li>React</li>
                            <li>React Router + Flux + Node + Gulp + Browserify + Bootstrap</li>
                        </ul>
                    </p>
                </div>
            );
        }
    });

    module.exports = AboutPage;
})();