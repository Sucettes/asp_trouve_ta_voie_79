# trouve_ta_voie_client

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---
# Note

```js
/**
 * route : {path: '/lieu/:userId', name: 'mesLieux', component: UserLieuLstComponent},
 * compon mounted() {    this.userId = this.$route.params.userId;}
 *                 <router-link class="dropdown-item" :to="{name: 'mesLieux', params: {userId: userId}}"
 *                              v-if="isLoggedIn">Mes lieux
 *                 </router-link>
 */

{
    path: '/lieu', name: 'lieu', props: true, component: CreeModifLieuForm,
    children: [
        {path: '/', redirect: '/accueil'},
    ]
}
```
