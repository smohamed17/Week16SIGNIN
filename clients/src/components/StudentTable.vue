<script setup>

import { useStudentStore } from "../stores/StudentStore.js"

import { storeToRefs } from 'pinia' // we are finding ways to store the ref in this section.

import { computed } from 'vue' // importing the computed properties from vue.

import StudentRow from './StudentRow.vue'

const studentStore = useStudentStore() // this is defining the store from the StudentStore.js

const { sortedStudents, studentCount } = storeToRefs(studentStore) // this will provide the placeholder data from the StudentStore.js, and it will display the information on the webpage.
// this also will provide how many student exist in the list.
const deleteStudent = (student) => {
  studentStore.deleteStudent(student) // allowing the user to delete the student from the active list.
}

const presentOrNotPresent = (student, isStudentPresent) => {
  student.present = isStudentPresent
  studentStore.arriveOrLeft(student) // this is allowing the user to check and see if a student is currently present or not based on the most recent student.
}

const pluralStudentMessage = computed(() => {
  if (studentCount.value === 1) { // provides the grammar issue and removing "student(s)" in the code.
    return 'There is 1 student in the class'
  } else {
    return `There are ${studentCount.value} students in the class`
  } // returning this as a computed properties rather than a function or reactive data.
})

</script>

<template>
<!-- this is the table used in the student list section.  -->
  <div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <h5 class="card-subtitle text-muted"> {{ pluralStudentMessage }} </h5> <!-- this will count how many students are in the classroom.  -->
    <div id="student-table">
      <table class="table">
        <thead>
        <tr> <!-- this is the table labels -->
          <th>Name</th>
          <th>StarID</th>
          <th>Present?</th>
          <th>Delete?</th>
        </tr>
        </thead>

        <tbody> <!-- this will display the table on the webpage. using the tbody section.   -->
        <!-- this will import the StudentRow.vue table row to the StudentTable.vue into separated components. -->
          <StudentRow
              v-for="student in sortedStudents"
              v-bind:student="student"
              v-on:arrivedOrLeft="presentOrNotPresent"
              v-on:delete-student="deleteStudent"
          ></StudentRow>
<!-- each v- represents different models and events in the StudentRow section of this code. This will also delete student.  -->
        </tbody>

      </table>
    </div>
  </div>

</template>

<style scoped>

#student-table {
  max-height: 400px;
  overflow: scroll;
}

th, tr {
  width: 25%;
}

h4 {
  font-family: Century Gothic, serif;
  background-color: lightgrey;
  font-weight: bolder;
}

body {
  background-color: lightsteelblue;
}

tbody {
  background-color: lightgrey;
}

</style>