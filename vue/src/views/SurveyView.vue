<template>

    <div class="min-h-full">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900">
                  {{route.params.id ? model.title : "create a survey " }}
                </h1>
            </div>
          <button v-if="route.params.id" type="button" @click="deleteSurvey()" class="absolute top-20 right-px py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-500" >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Survey
          </button>
        </header>
        <main>
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <div class="px-4 py-6 sm:px-0">
                  <div v-if="surveyLoading" class="flex justify-center">Loading...</div>
                   <form v-else @submit.prevent="saveSurvey">
                        <div class = "shadow sm:rounded-md sm:overflow-hidden">
                            <!-- survey fields -->
                            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <!-- image section-->
                                <div>
                                  <label class = "block text-sm font-medium text-grey-700">
                                      Image
                                  </label>
                                  <div class="mt-1 flex items-center">
                                     <img  v-if="model.image_url" :src="model.image_url" :alt="model.title" class="w-64 h-48 object-cover"/>
                                     <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                     </span>
                                     <button type="button" class="relative overflow-hidden ml-5 bg-white py-2 px-3  border border-gray-300 rounded-md shadow-sm text-sm leading-4  font-medium  text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                         <input type="file" @change="onImageChoose" class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer">
                                         change
                                     </button>
                                  </div>
                                </div>
                                   <!-- end of image section-->
                                    <!-- start of title section-->
                                <div>
                                    <label for="title" class= "block text-sm font-medium  text-gray-700">Title</label>
                                    <input type="text" name="title" id="title" v-model ="model.title" autocomplete="survey_title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                                <!-- end of title section-->
                              <!-- start of description section-->
                            <div>
                                <label for="Description" class= "block text-sm font-medium  text-gray-700 "> Description</label>
                                <div class = "mt-1">
                                    <textarea name="description" id="description" v-model ="model.description" row = "3" placeholder="describe your survey" autocomplete="survey_title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                    </textarea>
                                </div>
                            </div>
                            <!-- end of description section-->
                            <!-- start of expiry date section-->
                            <div>
                               <label for="Expiry_date " class= "block text-sm font-medium  text-gray-700 ">Expiry date </label>
                               <input type="date" name="expiry_date" id="expiry_date" v-model="model.expiry_date" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-grey-300  rounded-md">
                            </div>
                              <!-- end of expiry date section-->
                               <!-- status section-->
                            <div class="flex item-start">
                                <div class = "flex item-center h-5">
                                    <input id="status" name="status" type="checkbox" v-model="model.status" class="focus:ring-indigo-500 h-4 w-4  text-indigo-600 border-gray-300 rounded /">
                                </div>
                                <div class="ml-3 text-sm">
                                   <label for="status" class= "block text-sm font-medium  text-gray-700 ">Active</label>
                                </div>
                            </div>
                             <!-- end of  status section-->
                            </div>
                             <!-- end of survey -->
                             <!-- question secection-->
                             <div class ="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <h3 class = "text-2xl font-semibold flex items-center justify-between ">
                                    Questions
                                    <button type="button" @click="addQuestion()" class="flex item-center text-sm  py-1 px-4  rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add question
                                    </button>
                                </h3>
                                <!--question check -->
                                <div v-if ="!model.questions.length " class="text-center  text-gray-600 ">
                                    you dont have any question
                                </div>
                                    <!-- these will check for changes in question , edit or delete -->
                                <div v-for="(question,index) in model.questions" :key="question.id">
                                    <QuestionEditor :question="question" :index ="index" @change="questionChange"  @addQuestion="addQuestion" @deleteQuestion="deleteQuestion"/>
                                </div>
                             </div>
                             <!-- end of question secection-->
                            <div class = "px-4 py-3 bg-gray-50 text-right sm:px-6">
                             <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                            </div>
                        </div>
                   </form>
                </div>
                <!-- /End replace -->
            </div>
        </main>
    </div>

</template>
<script setup>
import {v4 as uuidv4} from "uuid";
import {ref,watch,computed} from 'vue'
import store from "../store"
import {useRoute,useRouter} from "vue-router"
import QuestionEditor from '../components/editor/QuestionEditor.vue'

const router = useRouter();
const  route =useRoute();
const surveyLoading = computed(()=>store.state.currentSurvey.loading);

//creating an empty survey
   let model = ref({
       title:"",
       status:false,
       description:null,
     image_url:null,
       expiry_date:null,
       questions:[],
   })
//watch to current survey data change  and when this happens we update the local model
    watch(
      () =>store.state.currentSurvey.data,
      (newVal,oldVal) =>{
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
          status:newVal.status !== "draft",
        };
      }
    );
   if(route.params.id){
       store.dispatch('getSurvey', route.params.id);
   }
   //adding the image
   function onImageChoose(ev){
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () =>{
        // the field  to send  on backend and apply validations
        model.value.image = reader.result;
        // the field to display here
        model.value.image_url = reader.result;
    }
    reader.readAsDataURL(file);

   }
    // this is what is being called from the QuestionEditorfor addQuestion
   function  addQuestion(index){
       const newQuestion = {
           id:uuidv4(),
           type:"text",
           question:"",
           description:null,
           data:{},
       };

       model.value.questions.splice(index,0,newQuestion);
   }
    // this is what is being called from the QuestionEditorfor deleteQuestion
   function deleteQuestion(question){
       model.value.questions =model.value.questions.filter();
       (q)=>q!== question
   }
   //whenquestion change
   function changeQuestion(question){
        model.value.questions =model.value.questions.map((q)=>{
            if(q.id === question.id){
                return JSON.parse(Json.stringify(question))
            }
            return q;
        });
   }

   //creating the savesurvey used in the form
   function saveSurvey(){
       store.dispatch("saveSurvey", model.value).then(({data})=>{
           router.push({
               name:"SurveyView",
               params:{ id:data.data.id },

           });
       });
   }

   //delete function
function deleteSurvey(){
     if(confirm('are you sure you want to delete these survey operation cannot be undone ')){
       store.dispatch("deleteSurvey",model.value.id)
         .then(()=>{
           router.push({
             name:"Survey"
           })
         });
     }
}
</script>
