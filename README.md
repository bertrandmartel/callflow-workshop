# Call Flow Workshop

[![Build Status](https://travis-ci.org/bertrandmartel/callflow-workshop.svg?branch=master)](https://travis-ci.org/bertrandmartel/callflow-workshop)
[![License](http://img.shields.io/:license-mit-blue.svg)](LICENSE.md)

A ReactJS powered material dashboard to build, share & download sequence diagram using [JS sequence diagram library](https://bramp.github.io/js-sequence-diagrams/)

### [Live Application](http://bertrandmartel.github.io/callflow-workshop)

Features :

* ace editor like in [the official demo](https://bramp.github.io/js-sequence-diagrams/)
* drag-resizable window for best experience
* share a single URL linking to the same page you are seeing (with the same settings) ([example](https://bertrandmartel.github.io/callflow-workshop/?diagram_input=RGV2aWNlLT5Hb29nbGU6IHVzZXIgdXRoZW50aWNhdGlvbgpHb29nbGUtPkRldmljZTogaWRfdG9rZW4KRGV2aWNlLT5hdXRoX3NlcnZlcjogc2VuZCBpZF90b2tlbgphdXRoX3NlcnZlci0%2BR29vZ2xlOiBjaGVjayBpZF90b2tlbgpub3RlIG92ZXIgYXV0aF9zZXJ2ZXI6IHN0b3JlIGRldmljZV9pZCAvIGhhc2ggZW1haWwKbm90ZSBvdmVyIERldmljZTogZ2VuZXJhdGUgYWNjZXNzX3Rva2VuCkRldmljZS0%2Bbm90aWZpY2F0aW9uX3NlcnZlcjogc2VuZCByZWdpc3RyYXRpb25faWQKbm90aWZpY2F0aW9uX3NlcnZlci0%2BYXV0aF9zZXJ2ZXI6IGNoZWNrIGFjY2Vzc190b2tlbgphdXRoX3NlcnZlci0%2BR29vZ2xlOiBjaGVjayBhY2Nlc3NfdG9rZW4Kbm90ZSBvdmVyIG5vdGlmaWNhdGlvbl9zZXJ2ZXI6IHN0b3JlIHJlZ2lzdHJhdGlvbl9pZCAvIGRldmljZV9pZApEZXZpY2UtPm5vdGlmaWNhdGlvbl9zZXJ2ZXI6IHNlbmQgcGluZwpub3RpZmljYXRpb25fc2VydmVyLT5hdXRoX3NlcnZlcjogY2hlY2sgYWNjZXNzX3Rva2VuCmF1dGhfc2VydmVyLT5Hb29nbGU6IGNoZWNrIGFjY2Vzc190b2tlbgpub3RpZmljYXRpb25fc2VydmVyLT5EZXZpY2U6IEdDTSA6IHNlbmQgcGluZyByZXNwb25zZQpEZXZpY2UtPmF1dGhfc2VydmVyOiBhdXRoZW50aWNhdGlvbiBzdWNjZXNzZnVsCmF1dGhfc2VydmVyLT5Hb29nbGU6IGNoZWNrIGFjY2Vzc190b2tlbgpub3RlIG92ZXIgYXV0aF9zZXJ2ZXI6IHNlbmQgZW1haWwgKG9wdGlvbm5hbCk%3D&diagram_theme=simple&ace_theme=github&config_view=vertical&window_size_options=%7B%22vertical%22%3A%7B%22width%22%3A1164%7D%2C%22horizontal%22%3A%7B%22height%22%3A335%7D%7D&title=An%20awesome%20sequence%20diagram))
* custom title
* download as PNG
* fullscreen view
* custom style for the sequence diagram & ace editor

[![diagram](https://user-images.githubusercontent.com/5183022/32393232-f988a712-c0d8-11e7-9163-2bc20fd11a8b.png)](https://bertrandmartel.github.io/callflow-workshop/?diagram_input=RGV2aWNlLT5Hb29nbGU6IHVzZXIgdXRoZW50aWNhdGlvbgpHb29nbGUtPkRldmljZTogaWRfdG9rZW4KRGV2aWNlLT5hdXRoX3NlcnZlcjogc2VuZCBpZF90b2tlbgphdXRoX3NlcnZlci0%2BR29vZ2xlOiBjaGVjayBpZF90b2tlbgpub3RlIG92ZXIgYXV0aF9zZXJ2ZXI6IHN0b3JlIGRldmljZV9pZCAvIGhhc2ggZW1haWwKbm90ZSBvdmVyIERldmljZTogZ2VuZXJhdGUgYWNjZXNzX3Rva2VuCkRldmljZS0%2Bbm90aWZpY2F0aW9uX3NlcnZlcjogc2VuZCByZWdpc3RyYXRpb25faWQKbm90aWZpY2F0aW9uX3NlcnZlci0%2BYXV0aF9zZXJ2ZXI6IGNoZWNrIGFjY2Vzc190b2tlbgphdXRoX3NlcnZlci0%2BR29vZ2xlOiBjaGVjayBhY2Nlc3NfdG9rZW4Kbm90ZSBvdmVyIG5vdGlmaWNhdGlvbl9zZXJ2ZXI6IHN0b3JlIHJlZ2lzdHJhdGlvbl9pZCAvIGRldmljZV9pZApEZXZpY2UtPm5vdGlmaWNhdGlvbl9zZXJ2ZXI6IHNlbmQgcGluZwpub3RpZmljYXRpb25fc2VydmVyLT5hdXRoX3NlcnZlcjogY2hlY2sgYWNjZXNzX3Rva2VuCmF1dGhfc2VydmVyLT5Hb29nbGU6IGNoZWNrIGFjY2Vzc190b2tlbgpub3RpZmljYXRpb25fc2VydmVyLT5EZXZpY2U6IEdDTSA6IHNlbmQgcGluZyByZXNwb25zZQpEZXZpY2UtPmF1dGhfc2VydmVyOiBhdXRoZW50aWNhdGlvbiBzdWNjZXNzZnVsCmF1dGhfc2VydmVyLT5Hb29nbGU6IGNoZWNrIGFjY2Vzc190b2tlbgpub3RlIG92ZXIgYXV0aF9zZXJ2ZXI6IHNlbmQgZW1haWwgKG9wdGlvbm5hbCk%3D&diagram_theme=simple&ace_theme=github&config_view=vertical&window_size_options=%7B%22vertical%22%3A%7B%22width%22%3A1164%7D%2C%22horizontal%22%3A%7B%22height%22%3A335%7D%7D&title=An%20awesome%20sequence%20diagram)

Fullscreen view :

![fullscreen](https://user-images.githubusercontent.com/5183022/32393372-7f79397c-c0d9-11e7-9b04-e8981fb2def5.png)

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
