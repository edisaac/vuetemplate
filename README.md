# plantilla-vue

docker build -t vuejs-runtime-environment-variables .

docker run -it -p 8081:80 -v /app:/interapp --env-file=.env --rm vuejs-runtime-environment-variables

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### ENVIRONMENT CONF

```properties
VUE_APP_KEYCLOAK_URL=https://wsrecruitdev.certus.edu.pe/auth/
VUE_APP_KEYCLOAK_REALM=test
VUE_APP_KEYCLOAK_CLIENT_ID=vue-test-app
```

### Visual studio code Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

{
"editor.formatOnSave": true,
"[vue]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[html]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
}
}
