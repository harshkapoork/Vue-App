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

            <form @submit.prevent="submitForm" class="p-3 mx-2 my-3 border">
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

              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Submit
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
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  name: '',
  company: '',
  contact: '',
  budget: '',
  status: 'Pending',
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const submitForm = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await axios.post(
      'https://6851a6c58612b47a2c0adbd3.mockapi.io/leads',
      form.value,
    )
    successMessage.value = 'Task Added Successfully'
    setTimeout(() => {
      successMessage.value = ''
    }, 1500)

    form.value = {
      name: '',
      company: '',
      contact: '',
      budget: '',
      status: 'Pending',
    }
  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = 'Something went wrong while Adding the Task.'
    setTimeout(() => {
      successMessage.value = ''
    }, 1500)
  } finally {
    loading.value = false
  }
}
</script>
