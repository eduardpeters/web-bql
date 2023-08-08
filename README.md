# Block Query Language

> A nice way of playing with SQL queries

## About
*BQL* offers a friendly UI to practice basic SQL querying skills on a SQLite database.

It was created with the goal of providing an open source SQL playground that sets itself apart by the use of a drag and drop interface instead of a text one. The idea is to quickly experiment with databases with all available elements of the query at hand.

It is being developed as a SvelteKit project (the author's first).

## Features

- Integrates the WASM SQLite implementation to make it a client-side App
- All available elements of a query are displayed as blocks the user can drag and drop to build their queries
- Users may use the default database ([thank you Stanford for this](http://2016.padjo.org/tutorials/sql-simplefolks-overview/)) or upload their own SQLite database
- Tables and Columns are extracted to use as blocks by the App, so there is always visibility of what and where queries can be performed.

## Contributions
Contributions are encouraged as the project can benefit from any help available (and me as a developer from learning from others). Issues are constantly being added as development progresses and things get noticed. The best is being done to close them off, but it'd be awesome to see this grow beyond a single developer project and see contributions come in. 

Please let me know if you'd like to work on an issue to have it assigned and then make a pull request from a fork of the repo.
