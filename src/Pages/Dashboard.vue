<template>
  <section class="content">
    <div class="container-fluid">
      <!-- Main row -->
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header"></div>

            <!-- /.card-header -->

            <!--Dashboard of Leads -->
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6 col-12">
                  <!-- small box -->
                  <div class="small-box bg-primary">
                    <div class="inner">
                      <h3 class="">{{ total }}<sup style="font-size: 20px"></sup></h3>

                      <p>Total Leads</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-stats-bars"></i>
                    </div>
                    <RouterLink to="/leads" class="small-box-footer"
                      >More info <i class="fas fa-arrow-circle-right"></i
                    ></RouterLink>
                  </div>
                </div>

                <!-- ./col -->
                <div class="col-lg-6 col-12">
                  <!-- small box -->
                  <div class="small-box bg-warning">
                    <div class="inner">
                      <h3>{{ panding }}</h3>

                      <p>Task Pending</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-person-add"></i>
                    </div>
                    <RouterLink to="/leads" class="small-box-footer"
                      >More info <i class="fas fa-arrow-circle-right"></i
                    ></RouterLink>
                  </div>
                </div>
                <!-- ./col -->
                <div class="col-lg-6 col-12">
                  <!-- small box -->
                  <div class="small-box bg-success">
                    <div class="inner">
                      <h3>{{ completed }}<sup style="font-size: 20px"></sup></h3>

                      <p>Task Approved</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-stats-bars"></i>
                    </div>
                    <RouterLink to="/leads" class="small-box-footer"
                      >More info <i class="fas fa-arrow-circle-right"></i
                    ></RouterLink>
                  </div>
                </div>
                <!-- ./col -->
                <div class="col-lg-6 col-12">
                  <!-- small box -->
                  <div class="small-box bg-danger">
                    <div class="inner">
                      <h3>{{ rejected }}</h3>

                      <p>Task Rejected</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-person-add"></i>
                    </div>
                    <RouterLink to="/leads" class="small-box-footer"
                      >More info <i class="fas fa-arrow-circle-right"></i
                    ></RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <!-- Dashboard of Leads -->

            <!-- /.card-body -->
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
import { ref, onMounted } from 'vue'
//

//variables for dashboard
const completed = ref(0)
const total = ref(0)
const panding = ref(0)
const rejected = ref(0)
//

//function on render
onMounted(() => {
  fetchLeads()
})
//

//fetch leads
const fetchLeads = async () => {
  try {
    await axios.get('https://6851a6c58612b47a2c0adbd3.mockapi.io/leads').then((res) => {
      total.value = res.data.length
      completed.value = res.data.filter((item) => item.status === 'Approved').length
      panding.value = res.data.filter((item) => item.status === 'Pending').length
      rejected.value = res.data.filter((item) => item.status === 'Rejected').length
    })
  } catch (error) {
    alert('error while fetching')
  }
}

//
</script>
