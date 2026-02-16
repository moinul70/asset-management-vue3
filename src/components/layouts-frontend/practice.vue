<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api";

const questions = ref([]); // Changed null to [] to prevent template errors
const answers = ref([]);
const error = ref(null);
const loading = ref(false); // Added loading state
const selectedAnswer = ref([]); // Needed for v-model
const meta = ref([]); // Needed for v-model
const isAnswerVisible = ref(false);
const pagination = ref({
  first: 1,
  last: 1,
  next: null,
  prev: null,
});

// Added 'url' parameter to handle pagination clicks
const fetchQuestions = async (url = "/questions") => {
  loading.value = true;
  error.value = null;

  try {
    const { data } = await api.get(url);

    // If your JSON root is the array, use 'data'.
    // If your backend wraps it in 'data.data', keep your current logic.
    const result = data.data || data;

    questions.value = result;

    // Extract answers from the first question safely
    if (result.length > 0) {
      answers.value = result[0].answers;
      meta.value = data.meta;
    }

    // Update pagination from the API response
    pagination.value = {
      current_page: data.meta.current_page || 1,
      first_page: data.links.first || 1,
      last_page: data.links.last || 1,
      next_page_url: data.links.next,
      prev_page_url: data.links.prev,
    };
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load";
  } finally {
    loading.value = false;
  }
};

const nextQuestion = () => {
  if (pagination.value.next_page_url) {
    fetchQuestions(pagination.value.next_page_url);
    selectedAnswer.value = []; // Reset selection for next question
  }
};
const lastQuestion = () => {
  if (pagination.value.last_page) {
    fetchQuestions(pagination.value.last_page);
    selectedAnswer.value = []; // Reset selection for next question
  }
};
const firstQuestion = () => {
  if (pagination.value.first_page) {
    fetchQuestions(pagination.value.first_page);
    selectedAnswer.value = []; // Reset selection for next question
  }
};

const prevQuestion = () => {
  if (pagination.value.prev_page_url) {
    fetchQuestions(pagination.value.prev_page_url);
    selectedAnswer.value = [];
  }
};

onMounted(() => fetchQuestions());
</script>
<template>
  <div class="container my-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span class="fw-semibold"
              >Question {{ meta.current_page }} of {{ meta.total }}</span
            >
            <span class="badge bg-warning text-dark">Time Left: 01:45</span>
          </div>

          <div class="card-body">
            <!-- Question -->
            <h5 class="mb-3" v-if="questions.length > 0">
              {{ questions[0].question }}
            </h5>

            <pre class="bg-light p-3 rounded small"></pre>

            <!-- Options -->
            <form>
              <div class="mt-4 p-3 border-top">
                <!-- Show this button if the answer is hidden -->
                <button
                  v-if="!isAnswerVisible"
                  @click="isAnswerVisible = true"
                  class="btn btn-sm btn-outline-info"
                >
                  <i class="eye">Show Correct Answer</i>
                </button>

                <!-- Show the answer box only if isAnswerVisible is true -->
                <div v-else class="alert alert-success">
                  <strong>Correct Answer:</strong>
                  <span v-for="ans in answers" :key="ans.id">
                    <span v-if="ans.is_correct === 1"> &nbsp;{{ ans.letter }} </span>
                  </span>

                  <button
                    @click="isAnswerVisible = false"
                    class="btn btn-link btn-sm text-success p-0 ms-2"
                  >
                    (Hide)
                  </button>
                </div>
              </div>

              <div v-for="answer in answers" :key="answer.id" class="form-check mb-2">
                <input
                  class="form-check-input"
                  :type="questions[0].correct_count > 1 ? 'checkbox' : 'radio'"
                  name="answer"
                  :id="answer.id"
                  :value="answer.letter"
                  v-model="selectedAnswer"
                />

                <label class="form-check-label" :for="answer.letter">
                  {{ answer.letter }}. {{ answer.answer }}
                </label>
              </div>
            </form>
          </div>

          <!-- Footer Navigation -->
          <div class="card-footer d-flex justify-content-between align-items-center">
            <button
              class="btn btn-outline-warning"
              :disabled="!pagination.first_page || loading"
              @click="
                firstQuestion();
                isAnswerVisible = false;
              "
            >
              First
            </button>
            <button
              class="btn btn-outline-secondary"
              :disabled="!pagination.prev_page_url || loading"
              @click="
                prevQuestion();
                isAnswerVisible = false;
              "
            >
              Previous
            </button>

            <button
              class="btn btn-primary"
              :disabled="!pagination.next_page_url || loading"
              @click="
                nextQuestion();
                isAnswerVisible = false;
              "
            >
              Next
            </button>
            <button
              class="btn btn-secondary"
              :disabled="!pagination.last_page || loading"
              @click="
                lastQuestion();
                isAnswerVisible = false;
              "
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
