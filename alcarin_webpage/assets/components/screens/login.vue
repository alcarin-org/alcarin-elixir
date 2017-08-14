<template>
  <form class="pure-form pure-form-stacked">
      <fieldset>
          <legend>Login form</legend>

          <label for="email">Email</label>
          <input id="email" type="email" v-model="email" placeholder="Email">
          <!-- <span class="pure-form-message">This is a required field.</span> -->

          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" placeholder="Password">

          <button type="submit" @click="doSay()" class="pure-button pure-button-primary">
            Log in
          </button>
      </fieldset>
  </form>
</template>

<style scoped>
</style>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      doSay() {
        alert(this.email + ', ' + this.password);
      }
    }
  }
</script>
