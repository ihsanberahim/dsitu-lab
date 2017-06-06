Vue.use(VueRouter);

Vue.config.ignoredElements = [
 'preview',
];

Vue.component('modal', {
 template: '#modal-template',
 data: function()
 {
  return {
   app_url: ''
  };
 }
});

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
  setAppUrl: function(val)
  {
   router.push({ query: { app: val }});
   this.app_url = val;
  },
  isValidAppUrl: function()
  {
   return (this.app_url.indexOf('http')!==-1);
  },
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
  }
 },
 mounted: function()
 {
  var app_url = (this.$route.query.app||'');
  var platforms = (this.$route.query.platforms||'');

  if(app_url && app_url.indexOf('http')===-1)
  {
  }else
  {
   this.app_url = app_url;
  }

  if(platforms=='')
  {
   this.showing_android = JSON.parse(localStorage.getItem('showing_android'));
   this.showing_iphone = JSON.parse(localStorage.getItem('showing_iphone'));
   this.showing_windows = JSON.parse(localStorage.getItem('showing_windows'));
  }else
  {
   this.showing_android = (platforms.indexOf('android')!==-1);
   this.showing_iphone = (platforms.indexOf('iphone')!==-1);
   this.showing_windows = (platforms.indexOf('windows')!==-1);
  }
 }
});
