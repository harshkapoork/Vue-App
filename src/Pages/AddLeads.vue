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

            <Form @submit="submitForm" :validation-schema="schema" class="p-3">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <Field name="name" type="text" class="form-control" placeholder="Harsh Kapoor" />
                <ErrorMessage name="name" class="text-danger" />
              </div>

              <div class="mb-3">
                <label class="form-label">Company</label>
                <Field
                  name="company"
                  type="text"
                  class="form-control"
                  placeholder="Ladybird Solutions Pvt Lmt."
                />
                <ErrorMessage name="company" class="text-danger" />
              </div>

              <div class="mb-3">
                <label class="form-label">Contact</label>
                <Field
                  name="contact"
                  type="text"
                  class="form-control"
                  placeholder="+91-0000000000"
                />
                <ErrorMessage name="contact" class="text-danger" />
              </div>

              <div class="mb-3">
                <label class="form-label">$ Budget</label>
                <Field name="budget" type="number" class="form-control" placeholder="$3000" />
                <ErrorMessage name="budget" class="text-danger" />
              </div>

              <div class="mb-3">
                <label class="form-label btn">Status</label>
                <Field name="status" as="select" class="form-select">
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Field>
                <ErrorMessage name="status" class="text-danger" />
              </div>

              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Submit
              </button>
            </Form>
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

// VeeValidate
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import { createLead } from '../Api'
import * as yup from 'yup'

const router = useRouter()
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Validation Schema using Yup
const schema = yup.object({
  name: yup.string().required('Name is required'),
  company: yup.string(),
  contact: yup
    .string()
    .required('Contact is required')
    .matches(/^\d{10}$/, 'Contact must be 10 digits'),
  budget: yup.number().required('Budget is required').min(100, 'Budget should be at least $100'),
  status: yup.string().required('Status is required'),
})

// Form submit handler
const submitForm = async (values, { resetForm }) => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    /*Post Api for add lead*/ createLead(values)
    successMessage.value = 'Task Added Successfully'
    setTimeout(() => {
      successMessage.value = ''
    }, 1500)

    resetForm()
  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = 'Something went wrong while Adding the Task.'
    setTimeout(() => {
      errorMessage.value = ''
    }, 1500)
  } finally {
    loading.value = false
  }
}
</script>
