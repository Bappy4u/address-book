<template>
    <div id="address-form">
        <form  @submit.prevent="handleSubmit">
            <label>Person name</label>
            <input
                    ref="first"
                    :class="{ 'has-error': submitting && invalidName }"
                    v-model="address.name" type="text"
                    @focus="clearStatus"
                    @keypress="clearStatus"
            />
            <label>Person Phone</label>
            <input
                    :class="{ 'has-error': submitting && invalidPhone }"
                    v-model="address.phone" type="text"
                    @focus="clearStatus"

            />
            <label>Person Address</label>
            <input
                    :class="{ 'has-error': submitting && invalidPlace }"
                    v-model="address.place" type="text"
                    @focus="clearStatus"

            />
            <p v-if="error && submitting" class="error-message">❗Please fill out all required fields</p>
            <p v-if="success" class="success-message">✅ Employee successfully added</p>
            <button>Add</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'AddressFrom.vue',
        data() {
            return {
                submitting: false,
                error: false,
                success: false,
                address: {
                    name: '',
                    phone: '',
                    place: '',
                },
            }
        },
        methods: {
            handleSubmit(){
                this.submitting = true;
                this.clearStatus();

                if (this.invalidName || this.invalidPhone || this.invalidPlace) {
                    this.error = true;
                    return
                }
                this.$emit('add:address', this.address);
                this.$refs.first.focus();
                this.address = {
                    name: '',
                    phone: '',
                    place: ''

            };
                this.error = false;
                this.success = true;
                this.submitting = false;

            },
                    clearStatus() {
                    this.success = false
                    this.error = false
                }
        },
        computed: {
            invalidName(){
                return this.address.name === '';
            },
            invalidPhone(){
                return this.address.phone === '';
            },
            invalidPlace(){
                return this.address.place === '';
            },
        }
    }
</script>

<style scoped>
    form {
        margin-bottom: 2rem;
    }

    [class*='-message'] {
        font-weight: 500;
    }

    .error-message {
        color: #d33c40;
    }

    .success-message {
        color: #32a95d;
    }
</style>