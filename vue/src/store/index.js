import {createStore} from "vuex";
import axiosClient from '../axios'





const  store =createStore({
    state:{
        user:{
            data:{},
            token: sessionStorage.getItem('TOKEN'),
        },
      currentSurvey:{
          loading:false,
        data:{}
      },
      surveys:{
          loading:false,
        data:[]
      },
        questionTypes:["text","select","radio","checkbox","textarea"],

    },

    getters:{},

    actions:{
      //fetching of all info from the survey tables
      getSurveys({commit}){
        commit ('setSurveysLoading', true);
        return axiosClient.get("/survey").then((res)=>{
          commit('setSurveysLoading', false);
          commit("setSurveys",res.data);
          return res;
        });

      },
      //fetching of data by id from the database
      getSurvey({commit},id){
          commit("setCurrentSurveyLoading",true);
          return axiosClient.get(`/survey/${id}`).then((res)=>{
            commit("setCurrentSurvey",res.data);
            commit("setCurrentSurveyLoading",false);
            return res;
          }).catch((err)=>{
            commit("setCurrentSurveyLoading",false);
            throw err;
          });
      },
      //saving of information from the form to the database
        saveSurvey({commit},survey){
            delete survey.image_url;
            let response;
            if(survey.id){
                response = axiosClient.put(`/survey/${survey.id}`,survey)
                .then((res)=>{
                    commit("setCurrentSurvey",res.data);
                });
            }else{
               response = axiosClient.post("/survey",survey).then((res)=>{
                   commit("setCurrentSurvey",res.data);
                   return res;
               });
            }
        },
      //deleting of the information from the form to the database
      deleteSurvey({},id){
        return axiosClient.delete(`/survey/${id}`);
      },
      //registering of the user into the system
        register({ commit },user) {
            return axiosClient.post('/register',user)
            .then(({data})=>{
                commit('setUser',data);
                return data;
            })
        },
        //logging of the users into the system
        login({ commit },user) {
            return axiosClient.post('/login',user)
            .then(({data})=>{
                commit('setUser',data);
                return data;
            })
        },
        //logging out the users from the system
        logout({ commit }) {
            return axiosClient.post('/logout')
            .then(response =>{
                commit('logout')
                return response;
            })
        },
    },

    mutations:{
      setSurveysLoading:(state,loading)=>{
        state.surveys.loading = loading;

      },

      setSurveys:(state,surveys)=>{
        state.surveys.data = surveys.data;
      },

      setCurrentSurveyLoading:(state,loading)=>{
        state.currentSurvey.loading = loading;

      },

      setCurrentSurvey:(state,survey)=>{
        state.currentSurvey.data = survey.data;
      },
        logout: (state)=>{
           state.user.data ={},
           state.user.token = null
        },
        setUser:(state, userData)=>{
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);

        }
    },

    modules:{}
});

export default store;
