<script setup>

import { useStudentStore } from "../stores/StudentStore.js" // once again importing from the student store.
import { storeToRefs } from 'pinia' // importing for the ref

const studentStore = useStudentStore()

const { mostRecentStudent } = storeToRefs(studentStore)

</script>

<template>

  <div id="welcome-or-goodbye-message" class="m-2">
    <div v-if="mostRecentStudent.name"> <!-- this is displaying the most recent student name. -->

      <div v-if="mostRecentStudent.present" class="alert alert-success">
        Welcome, {{mostRecentStudent.name}} ! <!-- this will display if the student has arrived by using the alert success method (green-colored alert) -->
      </div>

      <div v-else class="alert alert-dark">
        Goodbye {{mostRecentStudent.name}}, you'll always be welcomed back. <!-- this will display if the student isn't present by using the alert dark method (dark-grey-colored alert) -->
      </div>


    </div>
    
  </div>



</template>

<style scoped>


</style>