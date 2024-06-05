<script setup>
import { onMounted, ref } from 'vue';
import service from '@/axios';
import * as echarts from 'echarts';

var option;

option = {
    title: {
        text: '24小时销售情况'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: []
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '0%',
        right: '0%',
        bottom: '2%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ["24H", "23H", "22H", "21H", "20H", "19H", "18H", "17H", "16H", "15H", "14H", "13H", "12H", "11H", "10H", "9H", "8H", "7H", "6H", "5H", "4H", "3H", "2H", "1H"]
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: []
};

async function fetchData() {
    let resp = await service.get('/24h');

    let data = resp.data;
    for (let i = 0; i < data.length; i++) {
        option.legend.data.push(data[i].productName);
        option.series.push({
            name: data[i].productName,
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: data[i].data
        })
    }
}

onMounted(async () => {
    const chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    await fetchData();
    option && myChart.setOption(option);
})

</script>

<template>
    <div id="wrapper">
        <div id="main"></div>
    </div>

</template>

<style scoped>
#wrapper {
    /* width: 100%; */
    width: calc(100% - 50px);
    height: 600px;
    background-color: #fff;
    border-radius: 10px;
    margin: var(--wrapper-margin);
}

#main {
    top: 2%;
    left: 2%;
    width: 96%;
    height: 96%;
}
</style>