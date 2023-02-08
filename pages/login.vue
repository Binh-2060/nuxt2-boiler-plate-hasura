<template>
  <v-container
    fluid
    class="d-flex flex-wrap justify-center align-center"
    style="height: 100vh"
  >
    <v-card width="560px" class="px-8">
      <div class="text-center font-weight-black my-2" style="font-size: 20px">
        Login
      </div>

      <v-form
        class="my-5 py-5"
        @submit.prevent="loginForm"
        ref="form"
        v-model="valid"
      >
        <v-col cols="12" class="pa-0 ma-0">
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            required
            :rules="emailRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="pa-0 ma-0">
          <v-text-field
            v-model="password"
            label="Password"
            outlined
            :rules="passRules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="ma-0 pa-0 d-flex flex-wrap justify-center">
          <v-btn
            color="primary font-weight-black"
            type="submit"
            :loading="loading"
            >Login</v-btn
          >
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import mainMixin from '@/mixins/main'
export default {
  layout: 'no-nav',
  mixins: [mainMixin],
  data() {
    return {
      email: '',
      password: '',
      valid: true,
      loading: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 6) || 'Name must be more than 6 characters',
      ],
    }
  },

  methods: {
    async loginForm() {
      const valid = await this.$refs.form.validate()

      try {
        if (valid) {
          this.loading = true
          await this.$fire.auth.signInWithEmailAndPassword(
            this.email,
            this.password
          )
          //FUNCTION FROM MIXIN
          this.changePathWithHref('/')
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
