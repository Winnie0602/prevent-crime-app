<template>
    <h3 class="mt-5">雙北電信詐欺數據</h3>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="taipei-tab" data-bs-toggle="tab" data-bs-target="#taipei" type="button" role="tab" aria-controls="home" aria-selected="true">台北市</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="new-taipei-tab" data-bs-toggle="tab" data-bs-target="#new-taipei" type="button" role="tab" aria-controls="profile" aria-selected="false">新北市</button>
    </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active py-5 mb-5 border" id="taipei" role="tabpanel" aria-labelledby="taipei-tab">
            <highcharts :options="getChartData('臺北市')"></highcharts>
        </div>
        <div class="tab-pane fade py-5 mb-5 border" id="new-taipei" role="tabpanel" aria-labelledby="new-taipei-tab">
            <highcharts :options="getChartData('新北市')"></highcharts>
        </div>
    </div>
</template>

<script>
import { Chart } from "highcharts-vue"
import webCrimeData from "@/data/webCrimeData.json"

export default {
    mounted() {
    },
    data() {
        return {
            components: {
                highcharts: Chart
            },
        };
    },
    methods: {
        getChartData(city) {
            const categories = webCrimeData.result.records
                .filter(e => e["oc_p1"]
                .includes(city))
                .map(e => e["oc_p1"])

            const tableMap = new Map();
            categories.forEach((item) => {
                if (tableMap.has(item)) {
                    tableMap.set(item, tableMap.get(item) + 1);
                } else {
                    tableMap.set(item, 1);
                }
            });
            return {
                chart: { type: "column" },
                title: { text: `${city}電信詐欺-依區統計 (110/04 - 110/06)` },
                xAxis: {
                    categories: [...tableMap.keys()]
                },
                yAxis: {
                    title: { text: "件數" }
                },
                series: [{
                name: "電信詐欺件數",
                data: [...tableMap.values()]
                }]
            }
        }
    }
}
</script>

<style>

</style>