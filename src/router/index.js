import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from '../store/UserStore'
import axios from 'axios'

// Step 1.IMPORT before using
import ItemListingView from '../views/item/ItemListingView.vue'

import LoginView from '../views/userAdmin/LoginView.vue'
import RegisterView from '../views/userAdmin/RegisterView.vue'
import ForgotPasswordView from '../views/userAdmin/ForgotPasswordView.vue'
import OTPView from '../views/userAdmin/OTPView.vue'

import UserMarketPlaceView from '../views/item/UserMarketplaceView.vue'
import HomeGuestView from '../views/HomeGuestView.vue'


import NotFoundView from '../views/NotFoundView.vue'

import UserPhotoUpdateView from '../views/user/UserPhotoUpdateView.vue'

import AccountSettingsView from '../views/user/AccountSettingsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  //this array contains routes - Vue Router
  routes: [
    // Step 2. Define the route so you can access

    // A. User Admin functions // new : let's categorise the views
    {
      path: '/register',  
      name: 'register',
      component: RegisterView,
      meta : {
        needAuth :false, // new feature : if true, user must be logged in
                          // if false, user must NOT be logged in
                          // if null, neither is fine
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta : {
        needAuth :false,
      }
    },
    {
      path: '/forgotPassword',
      name: 'Forgot Password',
      component: ForgotPasswordView,
      meta : {
        needAuth :false,
      }
    },
    {
      path: '/otp',
      name: 'OTP entry (for all purposes)',
      component: OTPView,
      meta : {
        needAuth :null,
      }
    },

    // B. ONE Item related views
    {
      path: '/item/:itemId',
      name: 'item listing',
      component: ItemListingView,
      meta : {
        needAuth :false,
      }
    },

    // C. Many item related view

    {
      path: '/marketplace', //for user to see trending items and search bar
      name: 'User Marketplace',
      component: UserMarketPlaceView,
      meta : {
        needAuth :true,
      }
    },
    // {
    //   path: '/map',
    //   name : 'map',
    //   component: MapView,
    //   meta : {
    //     needAuth :true,
    //   }
    // },


    // D. For not logged in users
    {
      path: '/landing',
      alias:'/',
      name: 'Guest Homepage',
      component: HomeGuestView,
      meta : {
        needAuth : false,
      }
    },

    // E. to manage user accounts

    {
      path: '/user/photo',
      name: 'User Photo Update',
      component: UserPhotoUpdateView,
      meta : {
        needAuth :true,
      }
    },

    {
      path: '/user/settings',
      name : 'account settings',
      component: AccountSettingsView,
      meta : {
        needAuth :true,
      }
    },



    //ETC - for not found page
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFoundView,
      meta : {
        needAuth :null,
      }
    },
  ]
})


export default router

//IMPORTANT : in privileged pages, there must be at least one privileged AJAX call that can indicate not logged in

router.beforeEach(async (to,from)=>{
  const userStore = useUserStore();

  var isLoggedIn = !!userStore.username;
  var skip= false
  const needAuth = to.matched.some(
  (record) => {
    if (record.meta.needAuth==null){
      skip = true
    }
    return record.meta.needAuth
  });


  // if not logged in lets check whether that is the case
  if (!isLoggedIn){
    try {
        //try calling login - guaranteed to fail due to lack of body
        const response = await axios.post(`${import.meta.env.VITE_BACKEND}/user/login`,{});
      } catch (error) {

        // actually already logged in because return code 301
        // note if 500 means not logged in
        if (!error.response.status){
          // backend is not on
          return {name : "NotFound"}
        }
        if (error.response.status == 301) {
          console.error(error);
          isLoggedIn=true
          //lets restore the piniaStore
          userStore.username = error.response.data.username
          userStore.userId = error.response.data.userId
        }
    }
  }

  
  if (skip){
    return true;
  }
  if (needAuth && !isLoggedIn){
      return { name :'Guest Homepage'}
  } else if (isLoggedIn && !needAuth)  {
    return {name :'User Marketplace'}
    }
  }
)


//IGNORE
// {
//   path: '/randomItems', //match
//   name: 'randomItems',
//   component: RandomItems, //then put
//   meta : {
//     needAuth :true,
//   }
// },
