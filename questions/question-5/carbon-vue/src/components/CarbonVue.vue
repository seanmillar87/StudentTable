<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <section>
        <div class="NameBox">
            {{ firstName }} {{ lastName }}
            <form @submit.prevent="logOutput">
                <input type="text" class="searchInput" placeholder="First name" v-model="firstName"/>
                <input type="text" class="searchInput" placeholder="Last name" v-model="lastName"/>
                <button>Submit</button>
            </form>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'CarbonVue',
        data: function () {
            return {
                firstName: '',
                lastName: ''
            }
        },
        methods: {
            logOutput() {
                console.log(this.firstName, this.lastName);
            }
        }
    }
</script>

<style scoped>
    form {
        margin-top: 1rem;
    }
</style>
