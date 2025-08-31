<template>
  <section class="content">
    <div class="container-fluid">
      <!-- Main row -->
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                <router-link to="/leads"
                  ><button class="btn btn-primary">Leads List</button></router-link
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

            <form @submit.prevent="updateForm" class="p-3 mx-2 my-3 border">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input v-model="form.name" type="text" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Company</label>
                <input v-model="form.company" type="text" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Contact</label>
                <input v-model="form.contact" type="text" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Budget ($)</label>
                <input v-model="form.budget" type="number" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Status</label>
                <select v-model="form.status" class="form-select" required>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <button type="submit" class="btn btn-success" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Update
              </button>
            </form>
          </div>
          <!-- table for the task -->
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
    <!-- Small boxes (Stat box) -->

    <!-- /.row -->
    <!-- /.row (main row) -->
    <!-- /.container-fluid -->
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// Get the current URL from window.location
const url = window.location.href

// Use a regular expression to extract the number after 'edit:'
const taskId = url.match(/edit:(\d+)/)[1]

const form = ref({
  id: taskId,
  name: '',
  company: '',
  contact: '',
  budget: '',
  status: 'Pending',
})
onMounted(async () => {
  try {
    await axios
      .get(`https://6851a6c58612b47a2c0adbd3.mockapi.io/leads/${form.value.id}`)
      .then((res) => {
        form.value = res.data
      })
  } catch (error) {
    alert('no data')
  }
})

// Example: preload the form with existing client data (could come from props, route params, API, etc.)

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const updateForm = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await axios.put(
      `https://6851a6c58612b47a2c0adbd3.mockapi.io/leads/${form.value.id}`,
      form.value,
    )
    successMessage.value = 'Client info updated successfully!'
    console.log('Updated:', response.data)
    setTimeout(() => {
      successMessage.value = ''
    }, 1200)
  } catch (error) {
    console.error('Update error:', error)
    errorMessage.value = 'Error updating the client info.'
    setTimeout(() => {
      errorMessage.value = ''
    }, 1200)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.spinner-border {
  vertical-align: middle;
}
</style>
