<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api";
import { useRouter } from 'vue-router'


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
const topic = useRouter().currentRoute.value.params.topic
// Added 'url' parameter to handle pagination clicks
const fetchQuestions = async (url = `/exam/questions/topic/${topic}`) => {
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
const saveAndnextQuestion = async () => {
  if (!selectedAnswer.value || selectedAnswer.value.length === 0) {
    alert("Please select an answer");
    return;
  }
  // Convert to array if radio selected
  const answerIds = Array.isArray(selectedAnswer.value)
    ? selectedAnswer.value
    : [selectedAnswer.value];

  console.log("Sending answer_ids:", answerIds);

  await api.post("/take-exam", {

    topic_id: questions.value[0].topic_id,
    question_id: questions.value[0].id,
    answer_ids: answerIds,
  });

  // Reset
  selectedAnswer.value = [];

  if (pagination.value.next_page_url) {
    fetchQuestions(pagination.value.next_page_url);
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
            <span class="fw-semibold">Question {{ meta.current_page }} of {{ meta.total }}</span>
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


              <div v-for="answer in answers" :key="answer.id" class="form-check mb-2">
                <input class="form-check-input"
                  :checked="questions[0]?.prepareExamDetails[0]?.question_answers_id?.includes(answer.id)"
                  :type="questions[0].correct_count > 1 ? 'checkbox' : 'radio'" name="answer" :id="answer.id"
                  :value="answer.id" v-model="selectedAnswer" />

                <label class="form-check-label" :for="answer.letter">
                  {{ answer.letter }}. {{ answer.answer }}
                </label>
              </div>
            </form>
          </div>

          <!-- Footer Navigation -->
          <div class="card-footer d-flex justify-content-between align-items-center">
            <button class="btn btn-outline-warning" :disabled="!pagination.first_page || loading" @click="
              firstQuestion();
            isAnswerVisible = false;
            ">
              First
            </button>
            <button class="btn btn-outline-secondary" :disabled="!pagination.prev_page_url || loading" @click="
              prevQuestion();
            isAnswerVisible = false;
            ">
              Previous
            </button>

            <button class="btn btn-primary" :disabled="!pagination.next_page_url || loading" @click="
              nextQuestion();
            isAnswerVisible = false;
            ">
              Next
            </button>
            <button class="btn btn-secondary" :disabled="!pagination.last_page || loading" @click="
              lastQuestion();
            isAnswerVisible = false;
            ">
              Last
            </button>

            <button class="btn btn-success" @click="
              saveAndnextQuestion();
            isAnswerVisible = false;
            ">
              {{ pagination.next_page_url ? 'Save & Next' : 'Save & Submit' }}
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
