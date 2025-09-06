<template>
  <section class="content">
    <div class="container-fluid">
      <!-- Main row -->
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                <router-link to="/leads/add"
                  ><button class="btn btn-primary">Add Lead</button></router-link
                >
              </h3>
            </div>
            <div class="card-footer clearfix">
              <ul class="pagination pagination-sm m-0 float-right"></ul>
            </div>
            <!-- /.card-header -->
            <div v-if="successMessage" class="alert alert-success mt-3">
              {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="alert alert-danger mt-3">
              {{ errorMessage }}
            </div>
            <!-- table for the task -->
            <div class="card-body">
              <div class="table-responsive" style="max-height: 100vh; overflow-y: auto">
                <table
                  id="tableData"
                  v-if="tasks.values.length == 0"
                  class="table table-striped table-hover table-bordered overflow-auto"
                  style="max-height: 100vh"
                >
                  <thead class="bg-primary">
                    <tr>
                      <th>UserId</th>
                      <th>Name</th>
                      <th>Company</th>
                      <th style="width: 10px">Contact</th>
                      <th style="">Budget</th>
                      <th style="width: 10px">Status</th>
                      <th colspan="2" style="width: 10px">Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="isloading">
                    <td
                      colspan="8"
                      style="
                        height: 200px;
                        align-items: center;
                        text-align: center;
                        justify-content: center;
                        background-color: aliceblue;
                      "
                    >
                      <h5>Loading...</h5>
                    </td>
                  </tbody>
                  <tbody v-for="task in tasks.slice(index, page)">
                    <tr>
                      <td style="width: 1%">{{ task.id }}</td>
                      <td style="width: 10%">{{ task.name }}</td>
                      <td style="width: 10%">{{ task.company }}</td>
                      <td style="width: 6%">{{ task.contact }}</td>
                      <td style="width: 3%">{{ task.budget }}</td>
                      <td style="width: 6%">{{ task.status }}</td>
                      <!-- <td style="width: 30%;">
                        <div class="progress progress-xs progress-striped active">
                          <div class="progress-bar bg-danger" style="width: 10%"></div>
                        </div>
                        <span class="badge bg-success">10%</span>
                      </td>
                     -->

                      <td :id="task.id" style="width: 1%" class="editTask">
                        <button :id="task.id" @click="editTask" class="btn btn-light">
                          <i :id="task.id" class="fas fa-edit"></i>
                        </button>
                      </td>

                      <td style="width: 1%" class="deleteTask">
                        <router-link class="" to="/leads">
                          <button @click="handgleDelete(task.id)" class="btn btn-light">
                            <i class="fas fa-trash"></i>
                          </button>
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- table for the task -->
              <!-- /.card-body -->
              <div class="card-footer clearfix">
                <ul class="pagination pagination-sm m-0 float-right">
                  <li class="page-item">
                    <button class="page-link" @click="pageback">&laquo;Prev</button>
                  </li>

                  <li class="page-item">
                    <button class="page-link" @click="pagenext">Next&raquo;</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- /.card -->
        </div>
      </div>
      <!-- Small boxes (Stat box) -->

      <!-- /.row -->
      <!-- /.row (main row) -->
    </div>
    <!-- /.container-fluid -->
  </section>
</template>

<script setup>
//import modules
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'

//

//setup router
import { useRouter } from 'vue-router'
const router = useRouter()
//
//variables for dashboard

const tasks = ref([''])
const isloading = ref(true)
const id = ref('')
const successMessage = ref('')
const errorMessage = ref('')

//table paging
// Number of Table Coloum//

//
const PageList = 5 //number of col in the table'
import { fetchLeads, deleteTask } from '../Api'
//
const page = ref(PageList)
const index = ref(0)
//

//function on render
onMounted(async () => {
  fetchLeads().then((res) => {
    try {
      tasks.value = res
      isloading.value = false
    } catch (error) {
      alert('error while fetching')
    }
  })
})
//

//fetch leads
const fetchLeads2 = async () => {
  try {
    await axios.get('https://6851a6c58612b47a2c0adbd3.mockapi.io/leads').then((res) => {
      isloading.value = false

      return (tasks.value = res.data)
    })
  } catch (error) {
    alert('error while fetching')
  }
}

//paging button
const pagenext = () => {
  if (page.value >= tasks.value.length) {
  } else {
    index.value = index.value + PageList
    page.value = page.value + PageList
  }
}
const pageback = () => {
  if (index.value <= 0) {
  } else {
    index.value = index.value - PageList
    page.value = page.value - PageList
  }
}
//

//edit task
const editTask = (e) => {
  id.value = e.target.id

  router.push(`/leads/edit:${e.target.id}`)
}

//

//delete task

const handgleDelete = (id) => {
  successMessage.value = ''
  errorMessage.value = ''
  try {
    deleteTask(id)
    successMessage.value = 'Deleted successfully!'
    //reload panding
    window.location.reload()
    isloading = true

    setTimeout(() => {
      successMessage.value = ''
    }, 1200)
  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = 'Something went wrong while submitting the form.'
    setTimeout(() => {
      errorMessage.value = ''
    }, 1200)
  }
}
// const deleteTask = async (id) => {
//   successMessage.value = ''
//   errorMessage.value = ''
//   try {
//     const response = await axios.delete(`https://6851a6c58612b47a2c0adbd3.mockapi.io/leads/${id}`)
//     successMessage.value = 'Deleted successfully!'

//     console.log('Response:', response.data)

//     fetchLeads()
//     setTimeout(() => {
//       successMessage.value = ''
//     }, 1200)
//   } catch (error) {
//     console.error('Error:', error)
//     errorMessage.value = 'Something went wrong while submitting the form.'
//     setTimeout(() => {
//       errorMessage.value = ''
//     }, 1200)
//   }
// }
//
</script>
