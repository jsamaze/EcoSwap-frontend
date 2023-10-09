import { createRouter, createWebHistory } from 'vue-router'
// import {useUserStore} from '../store/UserStore'

// Step 1.IMPORT before using 
import TestView from '../views/TestView.vue'

import UserMarketplaceView from '../views/UserMarketplaceView.vue'

import MapView from '../views/MapView.vue'
import HomeGuestView from '../views/HomeGuestView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

import AccountSettingsView from '../views/AccountSettingsView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import PhotoView from '../views/PhotoView.vue'
import ListingGuestView from '../views/ListingGuestView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  //this array contains routes - Vue Router
  routes: [
    // Step 2. Define the route so you can access
    {
      path: '/',  //this will be matched on the URL e.g. /test
      name: 'pageName', //page name
      component: TestView, //this is the imported view (.vue)
    },
    {
      path: '/marketplace',
      name: 'User Marketplace',
      component: UserMarketplaceView,
    },
    {
      path: '/map',
      name : 'map',
      component: MapView
    },
    {
      path: '/accountsetting',
      name : 'accountsetting',
      component: AccountSettingsView
    },

    {
      path: '/register',  
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/homepageguest',
      name: 'homepageguest',
      component: HomeGuestView,
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPasswordView,
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPasswordView,
    },
    {
      path: '/photo',
      name: 'photo',
      component: PhotoView,
    },
    {
      path: '/listingguest',
      name: 'listingguest',
      component: ListingGuestView,
    },
  ]
})


export default router

//IMPORTANT : in privileged pages, there must be at least one privileged AJAX call that can indicate not logged in

// router.beforeEach(async (to,from)=>{
//   const userStore = useUserStore();
//   console.log(userStore.username)
//   var isLoggedIn = !!userStore.username;
//   const needAuth = to.matched.some((record) => record.meta.needAuth);
//   // if not logged in lets check whether that is the case
//   if (!isLoggedIn){
//     try {
//       console.log("axios")
//         //try calling login - guaranteed to fail due to lack of body
//         const response = await axios.post(`${import.meta.env.VITE_BACKEND}/user/login`,{});
//         console.log(response);
//       } catch (error) {
//         console.log(error)
//         // actually already logged in because return code 301
//         // note if 500 means not logged in
//         console.log(error.response.status)
//         if (error.response.status == 301) {
//           console.error(error);
//           isLoggedIn=true
//           //lets restore the sessionStorage
//           userStore.username = error.response.data.username
//         }
//     }
//   }
//   if (needAuth && !isLoggedIn){
//       return { name :'login'}
//   } else if (isLoggedIn && !needAuth)  {
//     return { name :'home'}
//     }
//   }
// )


//IGNORE
// {
//   path: '/randomItems', //match
//   name: 'randomItems',
//   component: RandomItems, //then put
//   meta : {
//     needAuth :true,
//   }
// },
