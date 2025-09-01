<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                <router-link to="/leads">
                  <button class="btn btn-primary">Leads List</button>
                </router-link>
              </h3>
            </div>

            <div v-if="successMessage" class="alert alert-success mt-3">
              {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="alert alert-danger mt-3">
              {{ errorMessage }}
            </div>

            <Form
              v-if="formLoaded"
              :initial-values="form"
              :validation-schema="schema"
              @submit="submitForm"
              class="p-3 mx-2 my-3 border"
            >
              <div class="mb-3">
                <label class="form-label">Name</label>
                <Field name="name" type="text" class="form-control" />
                <ErrorMessage name="name" class="text-danger" />
              </div>

              <div class="mb-3">
                <label class="form-label">Company</label>
                <Field name="company" type="text" class="form-control" />
                <ErrorMessage name="company" class="text-danger" />
              </div>

              <div class="mb-3">
                <label class="form-label">Contact</label>
                <Field name="contact" type="text" class="form-control" />
                <ErrorMessage name="contact" class="text-danger" />
              </div>

              <div class="mb-3">
                <label class="form-label">$ Budget</label>
                <Field name="budget" type="number" class="form-control" />
                <ErrorMessage name="budget" class="text-danger" />
              </div>

              <div class="mb-3">
                <label class="form-label">Status</label>
                <Field name="status" as="select" class="form-select">
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Field>
                <ErrorMessage name="status" class="text-danger" />
              </div>

              <button type="submit" class="btn btn-success" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Update
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// VeeValidate + Yup
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

// Get ID from URL
const url = window.location.href
const taskId = url.match(/edit:(\d+)/)?.[1]

const router = useRouter()
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const formLoaded = ref(false)

// Default form object
const form = ref({
  id: taskId,
  name: '',
  company: '',
  contact: '',
  budget: '',
  status: 'Pending',
})

// Validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  company: yup.string().required('Company is required'),
  contact: yup
    .string()
    .required('Contact is required')
    .matches(/^\d{10}$/, 'Contact must be 10 digits'),
  budget: yup.number().required('Budget is required').min(100, 'Minimum budget is $100'),
  status: yup.string().required('Status is required'),
})

// Fetch lead data for editing
onMounted(async () => {
  try {
    const response = await axios.get(`https://6851a6c58612b47a2c0adbd3.mockapi.io/leads/${taskId}`)
    form.value = response.data
    formLoaded.value = true
  } catch (error) {
    console.error('Fetch error:', error)
    errorMessage.value = 'Error loading client data.'
  }
})

// Submit updated form
const submitForm = async (values) => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await axios.put(`https://6851a6c58612b47a2c0adbd3.mockapi.io/leads/${taskId}`, values)
    successMessage.value = 'Client info updated successfully!'
    setTimeout(() => {
      successMessage.value = ''
    }, 1500)
  } catch (error) {
    console.error('Update error:', error)
    errorMessage.value = 'Error updating the client info.'
    setTimeout(() => {
      errorMessage.value = ''
    }, 1500)
  } finally {
    loading.value = false
  }
}
</script>
