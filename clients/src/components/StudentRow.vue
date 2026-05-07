<script setup>

import { ref } from "vue"

const props = defineProps({ // we are using props to define and save any objects from the list. DO NOT MODIFY PROPS.
  student: Object
})

const emit = defineEmits (['arrived-or-left', 'delete-student']) // importing the define emits event.

const isStudentPresent = ref(props.student.present) // we are using this as a ref to present the button as present or not present.

const notifyPresentOrLeaving = () => {
  emit('arrived-or-left', props.student, isStudentPresent.value) // this will emit the event and notifying if the student is present or not.
}

const confirmThenDeleteStudent = () => {
  emit('delete-student', props.student) // this will emit the student and delete the student.
}

</script>

<template>
  <tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present }"> <!-- by using the v-bind, it will differentiate who is or isn't present.. using styles to help us with that. -->
    <!-- using the v-for will provide the case of array of students that the person types in the webpage.  -->

    <td>{{ student.name }}</td> <!-- this will refer to the Student List on the script section. -->
    <td>{{ student.starID }}</td> <!-- this will refer to the starID of the student on the script section. -->
    <td>
      <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyPresentOrLeaving(student)"> <!-- this will use the student present and checking and unchecking the student if there are present using v-model. -->
      <span v-if="student.present" class="mx-4">Present!</span> <!-- using the v-on change method, it will either change student's presents in the form itself. -->
      <span v-else class="mx-4">Not Present!</span>
    </td> <!-- this will be the checkbox if the student is present or not -->
    <td>
      <button class="btn btn-danger" v-on:click="confirmThenDeleteStudent">
        <i class="bi bi-trash-fill"></i> Delete
      </button>
    </td> <!-- this is the delete button of the webpage. To remove the student.   -->
  </tr>
</template>

<style scoped>

.present {
  color: yellow;
  font-weight: bold;
  font-family: Century Gothic, serif;
}

.absent {
  color: indianred;
  font-style: italic;
  font-family: Century Gothic, serif;
}

</style>