<template>
    <v-card class="mx-auto my-12" max-width="374">
        <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>

        <v-card-title>Login Admin</v-card-title>

        <v-card-text>
            <form>
                <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required
                    @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
                <v-text-field type="password" v-model="password" :error-messages="passwordErrors" :counter="10" label="password" required
                    @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>

                <v-btn class="mr-4" @click="submit">
                    submit
                </v-btn>
                <v-btn @click="clear">
                    clear
                </v-btn>
            </form>
        </v-card-text>

    </v-card>
</template>

<script>
import { authenticationService } from '@/services/auth.service'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    validations: {
        password: { required, maxLength: maxLength(10) },
        email: { required, email },
    },

    data: () => ({
        password: '',
        email: ''
    }),

    computed: {
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.maxLength && errors.push('password must be at most 10 characters long')
            !this.$v.password.required && errors.push('password is required.')
            return errors
        },
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
    },
    methods: {
        submit() {
            this.$v.$touch()
            authenticationService.login(this.password, this.email, 1)
        },
        clear() {
            this.$v.$reset()
            this.password = ''
            this.email = ''
        },
    },

    name: 'LoginForm',


}
</script>
