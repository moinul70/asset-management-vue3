<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="container my-5">
    <div class="row text-center mb-4">
      <div class="col">
        <h2 class="fw-bold">Choose Your Exam Topic</h2>
        <p class="text-muted">
          Select a technology to start practice or take a mock exam
        </p>
      </div>
    </div>

    <div class="row g-4 justify-content-center">
      <!-- PHP -->
      <div class="col-12 col-md-4">
        <div class="card h-100 shadow-sm text-center">
          <div class="card-body">
            <h4 class="card-title fw-bold">PHP</h4>
            <p class="text-muted">
              Core PHP, OOP, Laravel basics, and real-world backend concepts.
            </p>

            <span class="badge bg-info mb-3">Beginner → Advanced</span>

            <div class="d-grid gap-2">
              <a href="#" class="btn btn-primary">Practice PHP</a>
              <a href="#" class="btn btn-outline-primary">Take PHP Exam</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Golang -->
      <div class="col-12 col-md-4">
        <div class="card h-100 shadow-sm text-center">
          <div class="card-body">
            <h4 class="card-title fw-bold">Golang</h4>
            <p class="text-muted">
              Concurrency, goroutines, REST APIs, and performance-focused
              design.
            </p>

            <span class="badge bg-success mb-3">Intermediate</span>

            <div class="d-grid gap-2">
              <a href="#" class="btn btn-success">Practice Golang</a>
              <a href="#" class="btn btn-outline-success">Take Golang Exam</a>
            </div>
          </div>
        </div>
      </div>

      <!-- AWS -->
      <div class="col-12 col-md-4">
        <div class="card h-100 shadow-sm text-center">
          <div class="card-body">
            <h4 class="card-title fw-bold">AWS</h4>
            <p class="text-muted">
              EC2, S3, IAM, VPC, cloud architecture, and certification-style
              questions.
            </p>

            <span class="badge bg-warning text-dark mb-3"
              >Certification Ready</span
            >

            <div class="d-grid gap-2">
             <router-link class="btn btn-warning text-dark" :to="{ name: 'practice', params: { topic:'aws'  }}">Practice AWS</router-link> 
              <a href="#" class="btn btn-outline-warning">Take AWS Exam</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
