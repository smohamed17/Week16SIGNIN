import { defineStore } from 'pinia' // importing the store from pinia and defining it in this JavaScript code.
import { ref, computed } from 'vue' // we are importing both ref and computed from vue.
import { mande } from 'mande'

const studentAPI = mande('api/students') // sending a request from the mande library to request the StudentStore.js/vite server and sending it over to the database.


export const useStudentStore = defineStore('students', () => {
    const sortedStudents = ref([]) // this will provide the user with array about the sorted students that we're exporting.


    const mostRecentStudent = ref({}) // this will include the most recent student that you have typed in.

    const addNewStudentErrors = ref( [] )

    function getAllStudents() { // this is making API request to the all students and saving it to the store.
        studentAPI.get().then( students => { // using this as a JSON to create student list response from the API
            sortedStudents.value = students // this is more like a fetch.
        }).catch( err => {
            console.log(err) // we are catching the error through the logs rather than value some of these function sections.
        })
    }

    function addNewStudent(student) {
        studentAPI.post(student).then( () => {
            getAllStudents()
        }).catch(err => {
            addNewStudentErrors.value = err.body
        }) // once the call is made from getAllStudents function, it will request the user to create a new student.
        // the getAllStudent should be the last thing
    } // we are only working through the store rather than Vue.

    function deleteStudent(studentToDelete) {
      const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`) // this will create an API for deleting students on the list.
      deleteStudentAPI.delete().then( () => {
          getAllStudents() // this will go through the process of deleting the student and console logging it to the code.
      }).catch( err => {
          console.log(err) //using the console log to capture the error for delete.
      })
    }

    function arriveOrLeft(student) {
      //  mostRecentStudent.value = student // this is for the Present and not Present button.
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => { // we are configuring the patch and including the data to use for the arriveOrLeft function.
            mostRecentStudent.value = student // this will include the latest data.
            getAllStudents()
        }).catch( err => {
            console.log(err) // using the catch to capture the error for arriveOrLeft
        })
    }

    const studentCount = computed(() => {
        return sortedStudents.value.length // this is a computed properties that reps how many student there are in the list.
    })



    return {
        // reactive data that we'll be returning.
        sortedStudents, // You'll need to return the value from any const being used. it will be sorting out the students.
        mostRecentStudent, // focuses on the most recent students.
        addNewStudentErrors, // adding any new student errors. 

        // functions to return.
        addNewStudent, // this will allow the user to add students one at a time.
        deleteStudent, // this will be imported to the table's section.
        arriveOrLeft, // this will track on the most recent student in the table.
        getAllStudents, // this will get all students listed in the vite app. 
        // computed properties returning to the webpage.
        studentCount, // it will provide how many student there are in this form.


    }

})