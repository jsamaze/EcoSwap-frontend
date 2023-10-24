import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import {useUserStore} from '../store/UserStore'
import { useLoadStore } from '../store/InitialLoadStore'

import axios from 'axios'
import {socket} from '../socket'

// Step 1.IMPORT before using
import ItemOwnerInformationView from '../views/item/ItemOwnerInformationView.vue'

import ItemListingView from '../views/item/ItemListingView.vue'
import ItemListingAddView from '../views/item/ItemListingAddView.vue'
import ItemListingEditingView from '../views/item/ItemListingEditingView.vue'

import ItemUploadPhotoView from '../views/item/ItemUploadPhotoView.vue'
import ItemDeletePhotoView from '../views/item/ItemDeletePhotoView.vue'

import LoginView from '../views/userAdmin/LoginView.vue'
import RegisterView from '../views/userAdmin/RegisterView.vue'
import ForgotPasswordView from '../views/userAdmin/ForgotPasswordView.vue'
import OTPView from '../views/userAdmin/OTPView.vue'
import SetBusStop from '../views/userAdmin/SetBusStop.vue'
import UserPhotoUpdateView from '../views/user/UserPhotoUpdateView.vue'
import AccountSettingsView from '../views/user/AccountSettingsView.vue'

import UserMarketplaceView from '../views/item/UserMarketplaceView.vue'
import GuestMarketplaceView from '../views/item/GuestMarketplaceView.vue'

import HomeGuestView from '../views/HomeGuestView.vue'

import ChatView from '../views/chat/ChatView.vue'

import MapView from '../views/item/MapView.vue'

import RewardView from '../views/RewardView.vue'
import ReviewView from '../views/ReviewView.vue'

import NotFoundView from '../views/NotFoundView.vue'

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
                          // if null, either is fine
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
        needAuth :null,
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
      path: '/item/:itemId/addPhoto',
      name: 'item add photo',
      component: ItemUploadPhotoView,
      meta : {
        needAuth :true,
      }
    },
    {
      path: '/item/:itemId/deletePhoto',
      name: 'item delete photo',
      component: ItemDeletePhotoView,
      meta : {
        needAuth :true,
      }
    },

    {
      path: '/item/:itemId',
      name: 'item listing',
      component: ItemListingView,
      meta : {
        needAuth :null,
      }
    },
    {
      path: '/item/add',
      name: 'item add',
      component: ItemListingAddView,
      meta : {
        needAuth :true,
      }
    },

    {
      path: '/item/:itemId/edit',
      name: 'item edit',
      component: ItemListingEditingView,
      meta : {
        needAuth :true,
      }
    },
    {
      path: '/reward',
      name: 'reward',
      component: RewardView,
      meta : {
        needAuth :true,
      }
    },
    {
      path: '/review/:username',
      name: 'review',
      component: ReviewView,
      meta : {
        needAuth :true,
      }
    },
      
    // C. Marketplace

    {
      path: '/marketplace', // for guests to see trending items and search bar
      name: 'Guest Marketplace',
      component: GuestMarketplaceView,
      meta : {
        needAuth :false,
      }
    },

    {
      path: '/user/marketplace', // for logged-in users to see trending items, recommended items and search bar
      name: 'User Marketplace',
      component: UserMarketplaceView,
      meta : {
        needAuth :true,
      }
    },

    {
      path: '/map',
      name : 'map',
      component: MapView,
      meta : {
        needAuth :true,
      }
    },


    // D. Homepage
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

    {
      path: '/user/busStop',
      name : 'Change Bus Stop',
      component: SetBusStop,
      meta : {
        needAuth :true,
      }
    },


    //F . Chat

    {
      path: '/chat/:username?',
      name : 'Chat',
      component: ChatView,
      meta : {
        needAuth :true,
      }
    },

    // Information of the Item Owner of the clicked listing
    {
      path: '/user/:username',
      name: 'itemOwnerInformation',
      component: ItemOwnerInformationView,
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

  const loadStore = useLoadStore();

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
  if (!isLoggedIn && from == START_LOCATION){
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

  if (!socket.connected && isLoggedIn){
    await socket.connect()
  }
  loadStore.loading=false
  
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

