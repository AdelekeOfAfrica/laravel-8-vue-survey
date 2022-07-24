<template>

    <div  class="flex items-center justify-between">
        <h3 class="text-lg  font-bold">
            {{index.id }}.{{model.question}}

        </h3>
        <div class="flex items-center">

            <!-- Add new Question -->
            <button type="button" @click="addQuestion()" class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add
            </button>

            <!-- end of add Question -->

            <!-- Delete Question -->
            <button type="button" @click="deleteQuestion()" class="flex items-center text-xs py-1 px-3  rounded-md  border border-transparent  text-red-500 hover:border-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
               <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
                Delete
            </button>
            <!-- end Delete Question -->

        </div>
        <div class = "grid gap-3 grid-cols-12">
            <!--  Question -->
            <div class = "mt-3  col-span-9 ">
                <label :for="'question_text_' + model.data" class= "block text-sm font-medium text-gray-700 ">
                    Question
                </label>
                <input type="text" :name="'question_text_' + model.data" v-model="model.question" @change="dataChange"  :id="'question_text_' + model.data"  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md input-lg " />

            </div>
                <!-- end  Question -->

            <!-- Question type -->
            <div class = "mt-3 col-span-3">
                <label for="question_type" class= "block text-sm font-medium text-gray-700 ">
                    select question type
                </label>
                <select id="question_type" name="question_type" v-model="model.type" @change="typeChange" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                 <option v-for="type in questionTypes" :key="type" :value="type">
                     {{upperCaseFirst(type)}}
                 </option>
                </select>
            </div>
            <!--end  Question type -->
        </div>
        <!--  Question description-->
           <div class = "mt-3 col-span-9">
                <label :for="'question_description_' + model.description" class= "block text-sm font-medium text-gray-700 ">
                  Description
                </label>
                <textarea  :name="'question_description_' + model.description" v-model="model.description" @change="dataChange"  :id="'question_description_' + model.id"  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md input-lg " />
            </div>
        <!--end Question description-->
                <!--datasection-->
       <div>
           <div v-if="shouldHaveOptions()" class="mt-2">
               <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
                   options
                    <!--add new option-->
                    <button type="button" @click="addOptions()" class="flex items-center text-xs py-1 px-2 rounded-sm text-white  bg-gray-600  hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Option
                    </button>
                    <!-- end add new option-->
                </h4>

                <div v-if="!model.data.options.length" class="text-xs text-gray-600 text-center py-3">
                    You dont have any option defined
                </div>
                <div  v-for="(option) in model.data.options" :key="option.uuid" class="flex items-center mb-1">
                    <span class="w-6 text-sm"></span>
                    <input type="text" v-model="option.text" @change="dataChange" class="w-full rounded-sm py-1 px-2 text-xs  border border-gray-300 focus:border-indigo-500" >
                    <button type="button" @click="removeOption(option)" class="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transitions-colors hover:border-red-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                    </button>
                        <button type="button" @click="deleteQuestion()" class="flex items-center text-xs py-1 px-3  rounded-md  border border-transparent  text-red-500 hover:border-red-600">

                    </button>

                </div>
           </div>
       </div>
        <!--datasection-->

    </div>

</template>
<script setup>
    import {ref,computed} from 'vue';
    import {v4 as uuidv4} from "uuid";
    import store from '../../store';
    const props =defineProps({
        question: Object,
        index: Number,
    })
    const emit = defineEmits(["change","addQuestion","deleteQuestion"])

    //re-create the whole question to avoid  uninetentional reference change
    const model =  ref(JSON.parse(JSON.stringify(props.question)));

    //too get question type from vuex
    const questionTypes = computed(()=>store.state.questionTypes);

    //scroll up to see how we define the upper case of thefunction
    function upperCaseFirst(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    //checking if thequestion should have options
    function shouldHaveOptions(){
        return ["select","radio","checkbox"].includes(model.value.type);
    }
    //to get options
    function getOptions(){
        return model.value.data.options;
    }

    //toset options
    function setOptions(options){
        model.value.data.options = options;
    }

    //addoptions
    function addOptions(){
        setOptions([
            ...getOptions(),
            {uuid:uuidv4(), text:""},
        ]);
        dataChange();
    }
    //remove options
    function removeOption(op){
        setOptions(getOptions().filter((opt)=>opt!==op));
        dataChange();
    }

    //listening when the questionn change
    function typeChange() {
        if(shouldHaveOptions()){
            setOptions(getOptions() ||[]);
        }
        dataChange();
    }
    //emitting the datachange function
    function dataChange(){
        const data = JSON.parse(JSON.stringify(model.value));
        if(!shouldHaveOptions()){
            delete data.data.options;
        }
        emit("change",data);
    }

    //adding Question
    function addQuestion(){
        emit("addQuestion",props.index + 1);

    }
    //delete question
    function deleteQuestion(){
        emit("deleteQuestion", props.question);
    }

</script>
