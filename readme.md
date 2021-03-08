# Swagger UI Demo

This project aims to demo how a webpack based build of the swagger UI projects works. This UI auto builds to netlify and loads the relevant services yaml files into the scope of the documentation. The added features here are that the output files get generated from [somewhere else entirely](https://github.com/etiennemarais/go-openapi-swag-demo) and get pushed to this repo as a single source of truth.

Netlify will pick up the change, build it and ship it so that it is viewable by someone on your team. This should take a little bit of the sting out of having living documentation in your engineering team and supports multi-service, multi-language api documentation as long as it generates swagger or openapi specifications.

## Demo

[Viewable on Netlify](https://vigilant-kepler-02cd3c.netlify.app)

![Screenshot](https://user-images.githubusercontent.com/4479918/110334729-c317d480-802b-11eb-8acc-a2ed4a23d492.png)