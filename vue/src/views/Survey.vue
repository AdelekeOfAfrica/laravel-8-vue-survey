<template>
 <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">All Survey</h1>
          <router-link :to="{name: 'SurveyCreate'}" class="text-black-300 hover:bg-gray-700 hover:text-black', 'block px-3 py-2 rounded-md text-base font-medium" style="position:absolute;top:90px;right:100px">
          Add New Survey
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </router-link>
      </div>
    </header>
    <main>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3" style="position:absolute;top:190px;">
        <SurveyListItem v-for="survey in surveys" :key="survey.id" :survey="survey" @delete = "deleteSurvey(survey)"/>
      </div>
    </main>
  </div>
</template>
<script setup>
import store from '../store';
import {computed} from "vue";
import SurveyListItem from '../components/SurveyListItem.vue';

const surveys = computed(() => store.state.surveys.data);
//fetching of the data from the getSurveys that will be created in the index.js
store.dispatch('getSurveys')


function deleteSurvey(survey){
  if(confirm(`Are you sure you want to delete this survey? Operation can't be undone!!`
  )

  )
  {
     //delete survey
    store.dispatch('deleteSurvey',survey.id)
      .then(()=>{
        store.dispatch('getSurveys');
      });
  }
}
</script>
