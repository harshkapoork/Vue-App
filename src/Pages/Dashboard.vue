<template>
  <section class="content">
    <div class="container-fluid">
      <!-- Main row -->
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header"></div>
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

            <!-- table for the task -->
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6 col-12">
                  <!-- small box -->
                  <div class="small-box bg-primary">
                    <div class="inner">
                      <h3 class="">{{ total }}<sup style="font-size: 20px"></sup></h3>

                      <p>Tasks</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-stats-bars"></i>
                    </div>
                    <RouterLink to="/task" class="small-box-footer"
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
                    <RouterLink to="/task" class="small-box-footer"
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
                    <RouterLink to="/task" class="small-box-footer"
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
                    <RouterLink to="/task" class="small-box-footer"
                      >More info <i class="fas fa-arrow-circle-right"></i
                    ></RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <!-- table for the task -->
            <!-- /.card-body -->
            <div class="card-footer clearfix"></div>
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
