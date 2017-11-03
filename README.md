# Call Flow Workshop

[![Build Status](https://travis-ci.org/bertrandmartel/callflow-workshop.svg?branch=master)](https://travis-ci.org/bertrandmartel/callflow-workshop)
[![License](http://img.shields.io/:license-mit-blue.svg)](LICENSE.md)

A ReactJS powered material dashboard to build, share & download sequence diagram using [JS sequence diagram library](https://bramp.github.io/js-sequence-diagrams/)

### [Live Application](http://bertrandmartel.github.io/callflow-workshop)

Features :

* ace editor like in [the official demo](https://bramp.github.io/js-sequence-diagrams/)
* drag-resizable window for best experience
* share a single URL linking to the same page you are seeing (with the same settings)
* custom title
* download as PNG
* fullscreen view
* custom style for the sequence diagram & ace editor

This project is using :

* [React](https://github.com/facebook/react)
* [Material UI](https://github.com/callemall/material-ui)
* [JS sequence diagram](https://bramp.github.io/js-sequence-diagrams/)
* [react-ace](https://github.com/securingsincity/react-ace)
* [react-sequence-diagram](https://github.com/zfanta/react-sequence-diagram)
* [react-resizable-component](https://github.com/wongherlung/react-resizable-component)
* [react-download-svg](https://github.com/derrickpelletier/react-download-svg)

This project has been created using [create-react-app](https://github.com/facebookincubator/create-react-app)

### Docker

Modify `homepage` field from `package.json` to match the target host :

* build

```
docker build . -t callflow-workshop
```

* run

```
docker run -p 5000:5000 callflow-workshop
```

## License

The MIT License (MIT) Copyright (c) 2017 Bertrand Martel
