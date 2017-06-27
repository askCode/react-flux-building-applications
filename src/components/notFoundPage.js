(function () {
    "use strict";
    var React = require('react');
    var Router = require('react-router');
    var Link = Router.Link;

    var NotFoundPage = React.createClass({
        render: function () {
            return (
                <div>
                    <h1>Oops! Something went wrong. Page not found!</h1>
                    <p><Link to="app">Back to Home!</Link></p>
                </div>

            );
        }
    });

    module.exports = NotFoundPage;
})();