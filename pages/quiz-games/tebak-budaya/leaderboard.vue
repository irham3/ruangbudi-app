<script lang="ts" setup>

</script>

<template>
  <NuxtLayout
    name="quiz"
    title="Skor Tertinggi"
  >
    <!-- List of users and their scores -->
    <div class="flex flex-col gap-4">
      <!-- <h1 class="text-3xl font-bold text-center">
        Skor Tertinggi
      </h1>
      <ul v-if="$fetchState.pending">
        <li>Loading...</li>
      </ul>
      <ul v-else-if="$fetchState.error">
        <li>Error loading data: {{ $fetchState.error }}</li>
      </ul>
      <ul
        v-else class="overflow-y-auto max-h-96 w
    divide-y divide-gray-200/50"
      >
        <UserScoreItem
          v-for="(user, index) in usersWithScores" :key="index
            + user.username"
            :rank="index + 1"
          </ul
        />
      </ul> -->
    </div>
  </NuxtLayout>
</template>
