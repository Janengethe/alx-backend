#!/usr/bin/env python3
"""
Module 0-app
Basic flask app
"""
from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """Language configuration class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


@app.route("/")
def index() -> str:
    """Index route"""
    return render_template("1-index.html")


if __name__ == "__main__":
    """Entry point"""
    app.run(host="0.0.0.0", port=5000, debug=True)
