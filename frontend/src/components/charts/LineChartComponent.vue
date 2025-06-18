<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script setup>
import { toRefs } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
);

// Props
const props = defineProps([
  "chartOptions",
  "chartData",
  "chartId",
  "datasetIdKey",
  "plugins",
  "cssClasses",
  "styles",
  "width",
  "height",
]);

// Variables
const {
  chartData,
  chartOptions,
  chartId,
  datasetIdKey,
  plugins,
  cssClasses,
  styles,
  width,
  height,
} = toRefs(props);
</script>
