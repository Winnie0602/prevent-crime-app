<template>
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">我的黑名單</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body px-5">
                <div class="row" v-if="blackIdList.length !== 0">
                    <button v-for="item in blackIdList" :key="item" type="button" class="btn btn-light my-1 w-100  position-relative">
                    {{ item }}
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger px-2"
                            @click="deleteItem(item)">
                        X
                            <span class="visually-hidden">unread messages</span>
                        </span>
                    </button>
                </div>
                <p v-else>您目前沒有新增黑名單喔！</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: "Modal",
    data() {
        return {
        }
    },
    props: ["blackIdList"],
    mounted() {
    },
    methods: {
        deleteItem(item) {
            this.$emit("deleteItem", item);
        }
    }
}
</script>

<style>

</style>