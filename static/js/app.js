Vue.use(VueRouter);

Vue.config.ignoredElements = [
 'preview',
];

var router = new VueRouter({
 mode: 'history',
 routes: []
});

var app = new Vue({
 router,
 el: '#root',
 data: {
  app_url: '',
  showing_android: false,
  showing_iphone: false,
  showing_windows: false,
 },
 methods: {
  getAppUrl: function(platform)
  {
   if(!this['showing_'+platform]) return '';
   if(this.app_url.indexOf('http')===-1) return '';

   switch(platform)
   {
    case 'android':
    case 'windows':
     return this.app_url+'/?ionicplatform='+platform;
    break;
    case 'iphone':
     return this.app_url+'/?ionicplatform=ios&amp;ionicstatusbarpadding=true';
    break;
   }
  },
  devicesChanged: function()
  {
   localStorage.setItem('showing_android', this.showing_android);
   localStorage.setItem('showing_iphone', this.showing_iphone);
   localStorage.setItem('showing_windows', this.showing_windows);
   console.log('devicesChanged');
  }
 },
 mounted: function()
 {
  console.log('Prepare.. mounted');

  var app_url = this.$route.query.app;
  // var exmaple_app_url = 'http://indiebooks.dsitu.com';
  var exmaple_app_url = '';

  if(!app_url || (app_url && app_url.indexOf('http')===-1))
  {
   router.push({ query: { app: exmaple_app_url }});

   app_url = exmaple_app_url;
  }

  this.app_url = app_url;
  this.showing_android = JSON.parse(localStorage.getItem('showing_android'));
  this.showing_iphone = JSON.parse(localStorage.getItem('showing_iphone'));
  this.showing_windows = JSON.parse(localStorage.getItem('showing_windows'));

  console.log({
   showing_android: this.showing_android,
   showing_iphone: this.showing_iphone,
   showing_windows: this.showing_windows,
  });
 }
});
