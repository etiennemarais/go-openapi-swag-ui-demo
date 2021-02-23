import SwaggerUI from 'swagger-ui'
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist"
import 'swagger-ui/dist/swagger-ui.css';
import 'swagger-ui-themes/themes/3.x/theme-muted.css'
import yaml from 'js-yaml'

let serviceUrls = []
let baseServicesUrl = 'http://localhost:8080/services/'

const allFiles = (ctx => {
  let keys = ctx.keys();
  let values = keys.map(ctx);
  return keys.reduce((o, k, i) => { 
    let serviceYamlFilename = baseServicesUrl + k.substr(k.indexOf('./')+2, k.length)
    serviceUrls.push({url: serviceYamlFilename})
    o[k] = values[i]; return o; 
  }, {});
})(require.context('../services', true, /\.yaml$/));

serviceUrls.forEach(async (item, index) => {
  let response = await fetch(item.url);

  if (response.ok) { // if HTTP-status is 200-299
    let body = await response.blob()
    let yamlData = await body.text()
    
    let doc = yaml.load(yamlData)
    serviceUrls[index].name = doc.info.title

    const ui = SwaggerUI({
      urls: serviceUrls,
      dom_id: '#swagger',
      deepLinking: true,
      "urls.primaryName": "Example Service", 
      presets: [  
        SwaggerUIBundle.presets.apis,  
        SwaggerUIStandalonePreset  
      ],  
      plugins: [  
        SwaggerUIBundle.plugins.DownloadUrl  
      ],  
      layout: "StandaloneLayout"
    });
    
    ui.initOAuth({
      appName: "Swagger UI Multiple API Demo",
      clientId: 'implicit'
    });
  } else {
    alert("HTTP-Error: " + response.status);
  }
})
