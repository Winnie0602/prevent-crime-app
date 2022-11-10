<template>
    <div class="line-crime">
        <NavBar />
        <div class="container mt-5">
            <h3 class="mt-5">詐騙LINE ID查詢器</h3>
            <p class="text-danger">本服務提供165反詐騙諮詢專線受理民眾檢舉、報案的詐騙LINE ID</p>
            <p>( 資料取自於政府資料開放平台 )</p>
            <form class="row justify-content-center mt-5">
                <div class="col-auto">
                    <label for="lineIdCheck" class="visually-hidden">Password</label>
                    <input type="text" v-model="searchAcct" class="form-control" id="lineIdCheck" placeholder="請輸入欲查詢之Line ID">
                </div>
                <div class="col-auto">
                    <button type="button"
                    @click="searchHandler"
                    class="btn btn-primary mb-3"
                    >查詢</button>
                </div>
            </form>
            <div class="col-auto">
                    <button type="button"
                    class="btn btn-secondary mt-3 position-relative"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                    @click="newItemCount = 0"
                    >查看黑名單
                    <span v-if="newItemCount !== 0"
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger px-2">
                        {{ newItemCount }}
                        <span class="visually-hidden">unread messages</span>
                    </span>
                    </button>
            </div>
            <div v-if="showResult" class="row justify-content-center mt-5">
                <div class="card text-center py-3 w-50">
                    <div class="card-body">
                        <h5 class="card-title">查詢結果：</h5>
                        <p class="card-text lh-lg my-3" v-html="msgString"></p>
                        <a v-if="isMatch" @click="addToBlackList()" href="#" class="btn btn-danger mx-2">加入黑名單</a>
                        <a href="#" @click="[showResult = false, showErrMsg = '', searchAcct ='']" class="btn btn-success mx-2">關閉</a>
                        <p v-if="showErrMsg" class="mt-3 text-danger">此帳號已存在於您的黑名單中</p>
                    </div>
                </div>
            </div>


        </div>
        <Modal :black-id-list="blackIdList"
                @deleteItem="deleteItemHandler" />
    </div>
</template>

<script>
import { projectFirestore } from '@/firebase/config'
import NavBar from "@/components/NavBar.vue";
import Modal from "@/components/Modal.vue";
import lineData from "@/data/lineData.json";
import store from "@/store";

export default {
    name: 'LineCrime',
    components: {
        NavBar,
        Modal
    },
    mounted() {
        this.getLineAcctList();
        this.getUserBlackList(store.state.account);
    },
    data() {
        return {
            lineAccountList: [], // 詐騙帳號名單
            searchAcct: "", // 使用者輸入的帳號
            msgString: "", // 要傳入開啟modal的訊息
            isMatch: false, // 是否有match到帳號
            showResult: false, // 是否顯示結果
            blackIdList: [], // 詐騙帳號黑名單
            showErrMsg: false,
            newItemCount: 0, // 新加入黑名單的數量，點擊查看黑名單則歸零
        }
    },
    methods: {
        async getLineAcctList() {
            this.lineAccountList = lineData.result.records
        },
        searchHandler() {
            if (!this.searchAcct) {
                alert("請輸入欲查詢 Line ID")
                return
            }
            const searchResult = this.lineAccountList.filter((e) => {
                return e["帳號"] === this.searchAcct;
            })
            if (searchResult.length !== 0) {
                this.msgString = `天啊！ ${searchResult[0]["帳號"]} 是於 ${searchResult[0]["通報日期"]} 通報的詐騙帳號！<br>
                你可以將此帳號加入本站台黑名單以防將來受騙`;
                this.isMatch = true;
            } else {
                this.msgString = `太好了！ ${this.searchAcct} 目前看起來是個安全的帳號喔！`;
                this.isMatch = false;
            }
            this.showResult = true;
        },
        addToBlackList() {
            let findAcct = [];
            if (this.blackIdList.length !== 0) {
                findAcct = this.blackIdList.filter(e => e === this.searchAcct)
            }
            if (findAcct.length === 0 || this.blackIdList.length === 0) {
                this.blackIdList.push(this.searchAcct);
                const postData = {
                    account: store.state.account,
                    blackList: this.blackIdList
                }
                this.postDataHandler(postData);
                this.showErrMsg = false;
                this.showResult = false;
                this.searchAcct = "";
                this.newItemCount += 1;
            } else {
                this.showErrMsg = true;
            }
        },
        async deleteItemHandler(item) {
            this.blackIdList = this.blackIdList.filter(e => e !== item);
                const postData = {
                    account: store.state.account,
                    blackList: this.blackIdList
                }
            try {
                const res = await projectFirestore.collection('BlackList').doc(store.state.accountId).update(postData)
            }
            catch(err) {
                console.log(err)
            }
        },
        async getUserBlackList(userAccount) {
            try {
                const res = await projectFirestore.collection('BlackList').get()
                res.docs.forEach(e => {
                    const userData = e["_delegate"]["_document"].data.value.mapValue.fields;
                    if ( userData.account.stringValue === userAccount) {
                        store.commit("setAccountId", e.id)
                        if (userData.blackList.arrayValue.values) {
                            this.blackIdList = userData.blackList.arrayValue.values
                            .map(e => e.stringValue)
                            .filter(e => e !== undefined)
                        }
                    }
                })
            }
            catch(err) {
                console.log(err)
            }
        },
        async postDataHandler(postData) {
            try {
                if (!store.state.accountId) {
                    const res = await projectFirestore.collection('BlackList').add(postData)
                    store.commit("setAccountId", res.id)
                    console.log(res.id)
                } else {
                    const res = await projectFirestore.collection('BlackList').doc(store.state.accountId).update(postData)
                }
            }
            catch(err) {
                console.log(err)
            }
        }
    }
}

</script>

<style>

</style>