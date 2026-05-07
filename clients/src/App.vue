<script setup>

import { onMounted } from 'vue' //using the OnMounted to display the app.vue to the Manda. 
import NewStudentForm from "./components/NewStudentForm.vue"; // this will import all three .vue components to the app.vue section.
import StudentTable from "./components/StudentTable.vue";
import StudentMessage from "./components/StudentMessage.vue"; // each .vue will receive different data from these imports and don't always press tab when the app tries to suggest you something.

import {useStudentStore} from "./stores/StudentStore"; //importing the student store into the app.vue

const studentStore = useStudentStore()

// always double check.


onMounted( () => {
  studentStore.getAllStudents()
})

</script>

<template>

<NewStudentForm></NewStudentForm>

<StudentTable></StudentTable>

<StudentMessage></StudentMessage>

</template>

<style scoped>


</style>
