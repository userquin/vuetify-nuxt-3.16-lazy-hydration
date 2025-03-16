<script lang="ts" setup>
function onHydrated() {
  console.log('hydrated')
}
function onClick() {
  console.log('clicked')
}
function onClickOuside() {
  console.log('clicked outside')
}
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          Go To No-SSR Page
        </v-col>
        <v-col>
          <v-btn>Button</v-btn>
        </v-col>
        <v-col>
          <v-date-input>WTF</v-date-input>
        </v-col>
      </v-row>
    </v-container>
    <VBtn density="compact" @click="onClick">Click me</VBtn>
    <div v-ripple v-click-outside="onClickOuside" style="margin-bottom: 100rem">TEST</div>
    <LazyVBtn density="compact" :hydrate-after="2000" @click="onClick" @hydrated="onHydrated">
      Click me
    </LazyVBtn>
  </div>
</template>

