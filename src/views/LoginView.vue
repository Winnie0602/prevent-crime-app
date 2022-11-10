<template>
  <div class="home">
    <img src="@/assets/backGround.jpg" class="bg">
    <section class="h-100">
      <div class="container h-100">
        <div class="row justify-content-sm-center h-100">
          <div class="col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div class="text-center my-5">
              <h1 class="fs-3 bg-white border-radius py-3 bg-opacity-75">網路詐騙防範網</h1>
            </div>
            <div class="card shadow-lg my-5">
              <div class="card-body p-5">
                <h1 class="fs-4 card-title fw-bold mb-4">{{ displayView }}</h1>
                  <div class="mb-3">
                    <input id="account" type="account" class="form-control" name="account" v-model="account" placeholder="請輸入帳號" required autofocus>
                  </div>
                  <div class="mb-3">
                    <input id="password" type="password" class="form-control" name="password"  v-model="password" placeholder="請輸入密碼" required>
                  </div>
                  <div class="d-flex align-items-center justify-content-center">
                    <button class="btn btn-primary" @click="submitForm()">{{ displayView }}</button>
                  </div>
              </div>
              <div class="card-footer py-3 border-0">
                <div class="text-center">
                  <span v-if="displayView ==='登入'">
                    還沒有帳號嗎？<button @click="displayView = '註冊'" class="text-dark btn">點我註冊</button>
                  </span>
                  <span v-if="displayView ==='註冊'">
                    已經有帳號了嗎？<button @click="displayView = '登入'" class="text-dark btn">點我登入</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
	  </section>
  </div>
</template>

<script>
import { projectFirestore } from "@/firebase/config";
import store from "@/store";

export default {
  name: "LoginVue",
  components: {
  },
  data() {
    return {
      displayView: "登入",
      account: "",
      password: "",
    }
  },
  methods: {
    async submitForm() {
      if (this.account === "" || this.password === "") {
          alert("請輸入完整資訊")
          return
        }
      const body = {
        account: this.account,
        password: this.password
      }
      const resUserList = await projectFirestore.collection("UserList").get();
      if (this.displayView === "註冊") {
        resUserList.docs.forEach(e => {
          const eachUser = e["_delegate"]["_document"].data.value.mapValue.fields;
          if (eachUser.account.stringValue === this.account) {
            alert("帳號名稱重複，請重新輸入帳號");
            return;
          } 
          this.addAccount(body);
        })
      } else {
        let isLogin = false;
        resUserList.docs.forEach(e => {
          const eachUser = e["_delegate"]["_document"].data.value.mapValue.fields;
          if (this.account === eachUser.account.stringValue
          && this.password === eachUser.password.stringValue) {
            store.commit("setAccount", this.account);
            isLogin = true;
            this.$router.push("/home");
          }
        })
        if (!isLogin) alert("帳號或密碼錯誤");
      }
    },
    async addAccount(body) {
      const res = await projectFirestore.collection("UserList").add(body);
      if (res["_delegate"].path) {
        store.commit("setAccount", this.account);
        this.$router.push("/home");
      }
    }
  }
}
</script>

<style scoped>
img.bg {
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
}

</style>