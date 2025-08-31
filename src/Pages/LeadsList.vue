<template>
  <section class="content">
    <div class="container-fluid">
      <!-- Main row -->
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                <router-link to="/task/add"
                  ><button class="btn btn-primary">Add Task</button></router-link
                >
              </h3>
            </div>
            <div class="card-footer clearfix d-none">
              <ul class="pagination pagination-sm m-0 float-right">
                <li class="page-item">
                  <button class="page-link" @click="pageback">&laquo;</button>
                </li>

                <li class="page-item">
                  <button class="page-link" @click="pagenext">&raquo;</button>
                </li>
              </ul>
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
              <table v-if="tasks.values.length == 0" class="table table-bordered">
                <thead>
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
                <tbody v-for="task in tasks.slice(page, page + 5)">
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
                      <router-link class="" to="/task">
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
import axios from 'axios'

import { ref, onMounted } from 'vue'

let page = ref(0)

const pagenext = () => {
  console.log(tasks.value.length)
  if (page.value <= tasks.value.length - 5) {
    page.value = page.value + 5
  } else {
    alert('no more data')
  }
}
const pageback = () => {
  if (page.value >= 5) {
    page.value = page.value - 5
  } else {
  }
}

let tasks = ref([''])
let isloading = ref(true)
const id = ref('')

const editTask = (e) => {
  id.value = e.target.id

  router.push(`/task/edit:${e.target.id}`)
}

onMounted(() => {
  axios.get('https://6851a6c58612b47a2c0adbd3.mockapi.io/leads').then((res) => {
    isloading.value = false

    return (tasks.value = res.data)
  })
})

import { useRouter } from 'vue-router'

const router = useRouter()

const successMessage = ref('')
const errorMessage = ref('')
const handgleDelete = (id) => {
  deleteTask(id)
}
const deleteTask = async (id) => {
  successMessage.value = ''
  errorMessage.value = ''
  try {
    const response = await axios.delete(`https://6851a6c58612b47a2c0adbd3.mockapi.io/leads/${id}`)
    successMessage.value = 'Deleted successfully!'

    console.log('Response:', response.data)

    const data = ApiData.getLeads().then((res) => {
      isloading.value = false

      return (tasks.value = res.data)
    })
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

//         let tasks= ref([
// {"id":1,"todo":"Do something nice for someone you care about","completed":false,"userId":152},{"id":2,"todo":"Memorize a poem","completed":true,"userId":13},{"id":3,"todo":"Watch a classic movie","completed":true,"userId":68},{"id":4,"todo":"Watch a documentary","completed":false,"userId":84},{"id":5,"todo":"Invest in cryptocurrency","completed":false,"userId":163},{"id":6,"todo":"Contribute code or a monetary donation to an open-source software project","completed":true,"userId":69},{"id":7,"todo":"Solve a Rubik's cube","completed":true,"userId":76},{"id":8,"todo":"Bake pastries for yourself and neighbor","completed":true,"userId":198},{"id":9,"todo":"Go see a Broadway production","completed":false,"userId":7},{"id":10,"todo":"Write a thank you letter to an influential person in your life","completed":true,"userId":9},{"id":11,"todo":"Invite some friends over for a game night","completed":true,"userId":104},{"id":12,"todo":"Have a football scrimmage with some friends","completed":false,"userId":32},{"id":13,"todo":"Text a friend you haven't talked to in a long time","completed":true,"userId":2},{"id":14,"todo":"Organize pantry","completed":false,"userId":46},{"id":15,"todo":"Buy a new house decoration","completed":true,"userId":105},{"id":16,"todo":"Plan a vacation you've always wanted to take","completed":true,"userId":162},{"id":17,"todo":"Clean out car","completed":false,"userId":71},{"id":18,"todo":"Draw and color a Mandala","completed":true,"userId":6},{"id":19,"todo":"Create a cookbook with favorite recipes","completed":true,"userId":53},{"id":20,"todo":"Bake a pie with some friends","completed":false,"userId":162},{"id":21,"todo":"Create a compost pile","completed":false,"userId":13},{"id":22,"todo":"Take a hike at a local park","completed":true,"userId":37},{"id":23,"todo":"Take a class at local community center that interests you","completed":true,"userId":65},{"id":24,"todo":"Research a topic interested in","completed":true,"userId":130},{"id":25,"todo":"Plan a trip to another country","completed":false,"userId":140},{"id":26,"todo":"Improve touch typing","completed":false,"userId":178},{"id":27,"todo":"Learn Express.js","completed":false,"userId":194},{"id":28,"todo":"Learn calligraphy","completed":false,"userId":80},{"id":29,"todo":"Have a photo session with some friends","completed":true,"userId":91},{"id":30,"todo":"Go to the gym","completed":true,"userId":142}])
</script>
