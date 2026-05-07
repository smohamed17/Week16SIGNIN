<script setup>

import {ref, watch} from "vue" // importing ref from the vue application. this is a MUST for any vue tools being used.
import { storeToRefs } from "pinia";
import { useStudentStore } from '../stores/StudentStore' // we are once again importing the useStudentStore from the stores directory.

const studentStore = useStudentStore() // as we are using the const to figure out the useStudentStore section.

// this is the new student section that will allow you to type out the name of the student.
const newStudentName = ref('') // this will be the v-model of the student name
const newStarID = ref('') // this will be the v-model of the starID of the student being entered.

const formErrors = ref([ // this will ensure that no errors occurs entering data on the webpage.

])


const { addNewStudentErrors } = storeToRefs(studentStore)

watch( addNewStudentErrors, () => {
  if (addNewStudentErrors.value && addNewStudentErrors.value.length > 0) {
    alert(addNewStudentErrors.value.join('\n'))
  }
})

function addStudent() { // this refers to the v-on click button from the top part of the code.
  formErrors.value = [] // resets the form errors.
  // if the code is invalid.
  if (!newStudentName.value) {
    formErrors.value.push('Student name is required! Enter student name')
  }
  // seeing if the starID is entered or not.
  if (!newStarID.value) {
    formErrors.value.push('Star ID is required! Please enter a Star ID')
  }
  // if there isn't any errors in the formErrors section.
  if (formErrors.value.length === 0) {

    let student = {
      name: newStudentName.value, // this is the string of the reactive data being shown on the webpage.
      starID: newStarID.value,
      present: false
    }

    studentStore.addNewStudent(student)
    newStudentName.value = ""
    newStarID.value = "" // both the student name and the starID will be cleared after the user types in one student.

  }
}

</script>

<template>

  <div id="new-student-form-errors" class="m-2">
    <div v-if="formErrors.length > 0" class="alert alert-danger"> <!-- this will appear with a pink box on the top if there's any errors or missing content on the webpage.  -->
      <li v-for="error in formErrors">
        {{ error }}
      </li>
    </div>
  </div>


  <div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
      <label for="name">Name</label>
      <input v-model.trim="newStudentName" id="name" class="form-control"> <!-- the v-model will allow the user to enter the name, and it will display on the vue logs.
                We can also add .trim to remove whitespaces and spacing on the textarea.  -->
    </div>

    <div class="form-group mb-3">
      <label for="starID">Star ID</label>
      <!-- v-model will display the starID that can be entered by the user, and it will show on the vue logs too.
      We can also trim down the whitespaces or spacing on the webpage.  -->
      <input v-model.trim="newStarID"id="starID" class="form-control">
    </div>

    <!-- v-on will allow the user to click the add button to add the new student.  -->
    <button v-on:click="addStudent" class="btn btn-primary">Add</button>
  </div>

</template>

<style scoped>


</style>