import { createRouter, createWebHistory } from 'vue-router'
// import {useUserStore} from '../store/UserStore'

// Step 1.IMPORT before using 
import TestView from '../views/TestView.vue'
import MapView from '../views/MapView.vue'
import UserProfileView from '../views/UserProfileView.vue'

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
      path: '/map',
      name : 'map',
      component: MapView
    },
    {
      path: '/userProfile',
      name : 'userProfile',
      component: UserProfileView
    }
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
