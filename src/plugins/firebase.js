import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCvvreJoorwKhdoKMPbHgHIoF-PS-_xvSc",
    authDomain: "modelingwebapp.firebaseapp.com",
    projectId: "modelingwebapp",
    storageBucket: "modelingwebapp.appspot.com",
    messagingSenderId: "172244241419",
    appId: "1:172244241419:web:54269e3175b1b8057b4b0e",
    measurementId: "G-WFWR1EB3Z1"
};

firebase.initializeApp(config)

export default ({ app, router, store, Vue }) => {
    Vue.prototype.$firebase = firebase
    router.beforeEach((to, from, next) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user && to.path != "/login") {
                next("/login");     
            }
            if (user){
                if (!user.emailVerified && to.path != "/verifyEmail" && to.path != "/completeAccount") {
                    next("/verifyEmail");
                }else if (to.path == '/login' ||to.path == "/verifyEmail" || to.path == "/completeAccount")
                {
                    next("/");
                }
            }    
            next();            
        })

    })
  }
