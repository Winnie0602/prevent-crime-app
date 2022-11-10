<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand text-700" href="#">網路詐騙防範網｜    </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link text-white" to="/home">首頁</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-white" to="/line-crime">LineID詐騙帳號查詢</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-white" to="/login"></router-link>
                </li>
                </ul>
                <div class="row align-items-center justify-content-center">
                    <!-- <img class="col-auto" src="@/assets/userLogo.png" alt=""> -->
                    <a class="col-auto text-white text-decoration-none fs-5 text-bold">您好 : {{ account }}</a>
                    <button class="col-auto btn btn-light mx-2" @click="logout">登出</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import store from '@/store'

export default {
    data() {
        return {
            account: store.state.account
        }
    },
    mounted() {
    },
    methods: {
        logout() {
            store.commit("setAccount", "")
            store.commit("setAccountId", "")
            this.$router.push("/login")
        }
    }

}
</script>

<style>

</style>