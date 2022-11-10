<template>
<div class="mt-5">
    <h3 class="mt-5 mb-3">今日新聞</h3>
    <div class="row justify-content-center">
        <div class="col-auto my-3" v-for="news in newsArr" :key="news.title">
            <div class="card" style="width: 18rem; height: 400px;">
                <img :src="news.urlToImage" class="card-img-top" style="height: 200px; object-fit: cover" alt="newsImg">
                <div class="card-body">
                    <h5 class="card-title">{{ news.title.substring(0, 20) }} ...</h5>
                    <p class="card-text mt-2">{{ news.description.substring(0, 30) }}...</p>
                    <a :href="news.url" target=_blank class="btn btn-primary">了解更多</a>
                </div>
            </div>
        </div>
    </div>


</div>
</template>

<script>

export default {
    data() {
        return {
            newsArr: [] // 詐騙相關新聞
        }
    },
    mounted() {
        this.getNewsData();
    },
    methods: {
        getNewsData() {
            fetch("https://newsapi.org/v2/top-headlines?country=tw&apiKey=38bcb918fa294e89a5ba283a75d672df", {
                method: "GET"
                })
                .then(res => res.json())
                .then(res => this.newsArr = res.articles);
        }
    }
}
</script>

<style>

</style>