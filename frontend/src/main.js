import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@babel/polyfill'
import Chart from 'chart.js';

import moment from 'moment'
require('devicons/css/devicons.css');

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
});
Vue.use(vuetify);
Vue.config.productionTip = false;

new Vue({
    vuetify,

    render: h => h(App)
}).$mount('#app')
