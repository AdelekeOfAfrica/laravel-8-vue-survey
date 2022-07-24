import {createRouter, createWebHistory} from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import SurveyView from '../views/SurveyView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DefaultLayout from '../views/Defaultlayout.vue'
import Survey from '../views/Survey.vue'
import store from'../store/index.js'
import AuthLayout from'../components/AuthLayout.vue'

const routes=[{
    path:'/',
    redirect:'/dashboard',
    component:DefaultLayout,
    meta:{requiresAuth: true},
    children:[
        
            {path:'/dashboard',name:'dashboard',component:Dashboard},
            {path:'/survey', name:'Survey',component:Survey},
            {path:'/survey/create', name: 'SurveyCreate',component:SurveyView},
            {path:'/survey/:id', name: 'SurveyView',component:SurveyView},

            
        
    ]
    
},
{
path:'/auth',
redirect:'/login',
name:'Auth',
component:AuthLayout,
meta:{isGuest: true},
children:[
    
        {path:'/login',name:'login',component:Login},

        {path:'/register', name:'register',component:Register}
]
},

{
    path:'/login',
    name:'login',
    component:Login
},
{
    path:'/register',
    name:'register',
    component:Register
},
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from,next)=>{
if (to.meta.requiresAuth && !store.state.user.token){
    next({name:'login'});
}
       else if (store.state.user.token && (to.meta.isGuest))
       {
        next({name:'dashboard'});
       }
       else{
           next();
       }
   
    
})

export default router;