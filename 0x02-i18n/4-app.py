#!/usr/bin/env python3
""" Basic Flask app """
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """class that set default language and timezone"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """
    a function determine the best match
    with our supported languages.
    Force locale with URL parameter
    """
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        print(locale)
        return locale
    
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', strict_slashes=False)
def index() -> str:
    """a method that render the index"""
    # title = _("home_title")
    # header = _("home_header")
    # return render_template('3-index.html', title=title, header=header)
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run(debug=True)
