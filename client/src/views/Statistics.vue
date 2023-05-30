<template>
  <app-page title="Статистика">
    <div class="container">
      <div class="py-4">
        <h4 class="text-center mb-4">Статистика</h4>
      </div>
      <app-loader v-if="loading"></app-loader>
      <div v-else class="statistics">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="chart mb-5">
              <div class="chart__title text-center fs-5 mb-3">
                Распределение сварщиков по способам сварки
              </div>
              <div class="chart__content">
                <Bar
                  :chart-options="horizontalChartOptions"
                  :chart-data="weldingMethodChartData"
                  :chart-id="'bar-chart'"
                  :dataset-id-key="'label'"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="chart mb-5">
              <div class="chart__title text-center fs-5 mb-3">
                Распределение сварщиков по объектам контроля
              </div>
              <div class="chart__content">
                <Pie
                  :chart-options="pieChartOptions"
                  :chart-data="accessesChartData"
                  :chart-id="'bar-chart'"
                  :dataset-id-key="'label'"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="chart mb-5">
              <div class="chart__title text-center fs-5 mb-3">
                Распределение сварщиков по возрасту
              </div>
              <div class="chart__content">
                <Bar
                  :chart-options="verticalChartOptions"
                  :chart-data="agesChartData"
                  :chart-id="'bar-chart'"
                  :dataset-id-key="'label'"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="chart mb-5">
              <div class="chart__title text-center fs-5 mb-3">
                Распределение сварщиков по разрядам
              </div>
              <div class="chart__content">
                <Bar
                  :chart-options="verticalChartOptions"
                  :chart-data="qualifyingRankChartData"
                  :chart-id="'bar-chart'"
                  :dataset-id-key="'label'"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="chart mb-5">
              <div class="chart__title text-center fs-5 mb-3">
                Распределение сварщиков по предприятиям
              </div>
              <div class="chart__content">
                <Bar
                  :chart-options="horizontalChartOptions"
                  :chart-data="workChartData"
                  :chart-id="'bar-chart'"
                  :dataset-id-key="'label'"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="chart mb-5">
              <div class="chart__title text-center fs-5 mb-3">
                Распределение сварщиков по форме собственности предприятий
              </div>
              <div class="chart__content">
                <Bar
                  :chart-options="horizontalChartOptions"
                  :chart-data="typeWorkChartData"
                  :chart-id="'bar-chart'"
                  :dataset-id-key="'label'"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="chart mb-5">
              <div class="chart__title text-center fs-5 mb-3">
                Распределение сварщиков по годам за весь период
              </div>
              <div class="chart__content">
                <Bar
                  :chart-options="verticalChartOptions"
                  :chart-data="yearsAttestationChartData"
                  :chart-id="'bar-chart'"
                  :dataset-id-key="'label'"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="chart mb-5">
              <div class="chart__title text-center fs-5 mb-3">
                Распределение сварщиков по месяцам за текущий год
              </div>
              <div class="chart__content">
                <Bar
                  :chart-options="verticalChartOptions"
                  :chart-data="monthAttestationChartData"
                  :chart-id="'bar-chart2'"
                  :dataset-id-key="'label'"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="chart mb-5">
              <div class="chart__title text-center fs-5 mb-3">
                Распределение сварщиков по месяцам года за весь период
              </div>
              <div class="chart__content">
                <Bar
                  :chart-options="verticalChartOptions"
                  :chart-data="alltimeAttestationChartData"
                  :chart-id="'bar-chart2'"
                  :dataset-id-key="'label'"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="chart mb-5">
              <div class="chart__title text-center fs-5 mb-3">
                Распределение сварщиков по стажу
              </div>
              <div class="chart__content">
                <Bar
                  :chart-options="verticalChartOptions"
                  :chart-data="workYearsChartData"
                  :chart-id="'bar-chart'"
                  :dataset-id-key="'label'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import { Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import type { ICertificate } from "@/types/ICertificate";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

interface ChartData {
  labels: string[];
  datasets: ChartDataDatasets[];
}
interface ChartDataDatasets {
  label: string | number;
  backgroundColor: string | string[];
  data: number[];
}
interface UniqueValResult {
  [key: string]: number;
}
interface Access {
  item: string;
  values: string[];
}
interface sortedWorkYearsItem {
  val: string;
  item: [string, number];
}
interface MonthsValues {
  [key: string]: string[];
}

//store
const store = useStore();
//loader
const loading = ref<boolean>(false);

//Подсчитанное количество отобранных значений
let weldingMethodResult: UniqueValResult = {};
let accessesResult: UniqueValResult = {};
let agesResult: UniqueValResult = {};
let workYearsResult: UniqueValResult = {};
let qualifyingRankResult: UniqueValResult = {};
let workResult: UniqueValResult = {};
let typeWorkResult: UniqueValResult = {};
let yearsAttestationResult: UniqueValResult = {};

//Подписи значений графика
const weldingMethodLabels: string[] = [];
const accessesLabels: string[] = [];
const agesLabels: string[] = [];
const workYearsLabels: string[] = [];
const qualifyingRankLabels: string[] = [];
const workLabels: string[] = [];
const typeWorkLabels: string[] = [];
const yearsAttestationLabels: string[] = [];

//Значения графика
const weldingMethodData: number[] = [];
const accessesData: number[] = [];
const agesData: number[] = [];
const workYearsData: number[] = [];
const qualifyingRankData: number[] = [];
const workData: number[] = [];
const typeWorkData: number[] = [];
const yearsAttestationData: number[] = [];
const monthAttestationData: number[] = [];
const alltimeAttestationData: ChartDataDatasets[] = [];

const weldingMethodChartData = {
  labels: weldingMethodLabels,
  datasets: [
    {
      label: "Способы сварки",
      backgroundColor: "#0d6efd",
      data: weldingMethodData,
    },
  ],
};

const accessesChartData = {
  labels: accessesLabels,
  datasets: [
    {
      label: "Объекты контроля",
      backgroundColor: [
        "#0d6efd",
        "#6610f2",
        "#ffc107",
        "#d63384",
        "#198754",
        "#fd7e14",
        "#20c997",
      ],
      data: accessesData,
    },
  ],
};

const agesChartData = {
  labels: agesLabels,
  datasets: [
    {
      label: "Количество человек",
      backgroundColor: "#20c997",
      data: agesData,
    },
  ],
};

const workYearsChartData = {
  labels: workYearsLabels,
  datasets: [
    {
      label: "Количество человек",
      backgroundColor: "#ffc107",
      data: workYearsData,
    },
  ],
};

const qualifyingRankChartData = {
  labels: qualifyingRankLabels,
  datasets: [
    {
      label: "Количество человек",
      backgroundColor: "#6610f2",
      data: qualifyingRankData,
    },
  ],
};

const workChartData = {
  labels: workLabels,
  datasets: [
    {
      label: "Аттестованные сварщики",
      backgroundColor: "#fd7e14",
      data: workData,
    },
  ],
};

const typeWorkChartData = {
  labels: typeWorkLabels,
  datasets: [
    {
      label: "Аттестованные сварщики",
      backgroundColor: "#198754",
      data: typeWorkData,
    },
  ],
};

const yearsAttestationChartData = {
  labels: yearsAttestationLabels,
  datasets: [
    {
      label: "Аттестованные сварщики",
      backgroundColor: "#dc3545",
      data: yearsAttestationData,
    },
  ],
};

const monthAttestationChartData = {
  labels: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ],
  datasets: [
    {
      label: "Количество аттестованных",
      backgroundColor: "#20c997",
      data: monthAttestationData,
    },
  ],
};
const alltimeAttestationChartData = {
  labels: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ],
  datasets: alltimeAttestationData,
};

//конфигурация графиков
const verticalChartOptions = {
  responsive: true,
};
const horizontalChartOptions = {
  responsive: true,
  indexAxis: "y",
};
const pieChartOptions = {
  responsive: true,
};

//загрузка списка удостоверений
onMounted(async () => {
  loading.value = true;
  await store.dispatch("certificate/load");

  //Все отобранные значения для графиков
  const weldingMethod: string[] = [];
  const accesses: Array<Access[]> = [];
  const certArr: ICertificate[] = [];
  const qualifyingRank: string[] = [];
  const work: string[] = [];
  const yearsAttestation: number[] = [];
  const dateAttestation: Date[] = [];

  //Получение данных с сервера
  store.getters["certificate/certificates"].forEach((item: ICertificate) => {
    weldingMethod.push(item.weldingMethodScope);
    accesses.push(item.accesses);
    qualifyingRank.push(item.qualifyingRank);
    work.push(item.work);
    yearsAttestation.push(new Date(item.date).getFullYear());
    dateAttestation.push(new Date(item.date));
    certArr.push(item);
  });

  /*
   * Логика графика по способам сварки
   */
  weldingMethod.forEach(function (a) {
    weldingMethodResult[a] = weldingMethodResult[a] + 1 || 1;
  });

  //Распределение отобранных значений и их количества
  Object.keys(weldingMethodResult).forEach((item) => {
    weldingMethodLabels.push(item);
  });
  Object.values(weldingMethodResult).forEach((item) => {
    weldingMethodData.push(item);
  });

  /*
   * Логика графика по объектам контроля
   */
  // console.log(accesses);

  accesses.forEach((item) => {
    item.forEach(function (a) {
      accessesResult[a.item] = accessesResult[a.item] + 1 || 1;
    });
  });

  Object.keys(accessesResult).forEach((item) => {
    let start = item.indexOf("(");
    let end = item.indexOf(")");
    let val = item.slice(start + 1, end);

    accessesLabels.push(val);
  });
  Object.values(accessesResult).forEach((item) => {
    accessesData.push(item);
  });

  /*
   * Логика графика по возрасту
   */
  //Отбор возраста по уникальным данным
  const uniquePerson: UniqueValResult = {};
  certArr.forEach((cert) => {
    uniquePerson[
      cert.firstname + cert.secondname + cert.lastname + cert.birthday
    ] =
      uniquePerson[
        cert.firstname + cert.secondname + cert.lastname + cert.birthday
      ] + 1 ||
      Math.trunc(
        (new Date().getTime() - new Date(cert.birthday).getTime()) /
          (24 * 3600 * 365.25 * 1000)
      );
  });
  //Подсчет возрастов по категориям
  Object.values(uniquePerson).forEach((item) => {
    if (item < 20) {
      agesResult["до 20"] = agesResult["до 20"] + 1 || 1;
    } else if (item >= 20 && item <= 25) {
      agesResult["20-25"] = agesResult["20-25"] + 1 || 1;
    } else if (item >= 26 && item <= 30) {
      agesResult["26-30"] = agesResult["26-30"] + 1 || 1;
    } else if (item >= 31 && item <= 35) {
      agesResult["31-35"] = agesResult["31-35"] + 1 || 1;
    } else if (item >= 36 && item <= 40) {
      agesResult["36-40"] = agesResult["36-40"] + 1 || 1;
    } else if (item >= 41 && item <= 45) {
      agesResult["41-45"] = agesResult["41-45"] + 1 || 1;
    } else if (item >= 46 && item <= 50) {
      agesResult["46-50"] = agesResult["46-50"] + 1 || 1;
    } else if (item >= 51 && item <= 55) {
      agesResult["51-55"] = agesResult["51-55"] + 1 || 1;
    } else if (item >= 56 && item <= 60) {
      agesResult["56-60"] = agesResult["56-60"] + 1 || 1;
    } else {
      agesResult["за 60"] = agesResult["за 60"] + 1 || 1;
    }
  });
  //Сортировка возрастных категорий
  const sortedAges = Object.entries(agesResult)
    .map((n) => ({
      val: n[0].replace(/\D+/, ""),
      item: n,
    }))
    .sort((a, b) => a.val.localeCompare(b.val))
    .map((n) => n.item);
  //Распределение значений
  sortedAges.forEach((item) => {
    agesLabels.push(item[0]);
    agesData.push(item[1]);
  });

  /*
   * Логика графика по стажу
   */
  //Отбор стажа по уникальным данным
  const uniqueWorkYears: UniqueValResult = {};
  certArr.forEach((cert) => {
    uniqueWorkYears[
      cert.firstname + cert.secondname + cert.lastname + cert.birthday
    ] =
      uniqueWorkYears[
        cert.firstname + cert.secondname + cert.lastname + cert.birthday
      ] + 1 || cert.workYears;
  });
  //Подсчет стажа по категориям
  Object.values(uniqueWorkYears).forEach((item: number) => {
    if (item < 5) {
      workYearsResult["до 05 лет"] = workYearsResult["до 05 лет"] + 1 || 1;
    } else if (item >= 6 && item <= 10) {
      workYearsResult["06-10 лет"] = workYearsResult["06-10 лет"] + 1 || 1;
    } else if (item >= 11 && item <= 15) {
      workYearsResult["11-15 лет"] = workYearsResult["11-15 лет"] + 1 || 1;
    } else if (item >= 16 && item <= 20) {
      workYearsResult["16-20 лет"] = workYearsResult["16-20 лет"] + 1 || 1;
    } else if (item >= 21 && item <= 25) {
      workYearsResult["21-25 лет"] = workYearsResult["21-25 лет"] + 1 || 1;
    } else if (item >= 26 && item <= 30) {
      workYearsResult["26-30 лет"] = workYearsResult["26-30 лет"] + 1 || 1;
    } else {
      workYearsResult["более 30 лет"] =
        workYearsResult["более 30 лет"] + 1 || 1;
    }
  });

  //Сортировка возрастных категорий
  const sortedWorkYears = Object.entries(workYearsResult)
    .map((n) => ({
      val: n[0].replace(/\D+/, ""),
      item: n,
    }))
    .sort((a, b) => {
      return a.val.localeCompare(b.val);
    })
    .map((n: sortedWorkYearsItem) => {
      let item = n.item;
      if (n.item[0][0] == "0") {
        item[0] = n.item[0].slice(1);
      } else if (n.item[0][0] == "д") {
        item[0] = "до " + n.item[0].slice(4);
      }

      return item;
    });

  //Распределение значений
  sortedWorkYears.forEach((item) => {
    workYearsLabels.push(item[0]);
    workYearsData.push(item[1]);
  });

  /*
   * Логика графика по разрядам
   */
  qualifyingRank.forEach(function (a) {
    qualifyingRankResult[a] = qualifyingRankResult[a] + 1 || 1;
  });

  //Сортировка и распределение отобранных значений и их количества
  Object.entries(qualifyingRankResult)
    .sort((a, b) => {
      return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
    })
    .forEach((item) => {
      qualifyingRankLabels.push(item[0]);
      qualifyingRankData.push(item[1]);
    });

  /*
   * Логика графика по предприятиям
   */
  work.forEach(function (a) {
    workResult[a] = workResult[a] + 1 || 1;
  });

  //Сортировка значений и распределение:
  let entries = Object.entries(workResult)
    .sort((a, b) => b[1] - a[1])
    .forEach((arr) => {
      //Распределение отобранных значений и их количества
      workLabels.push(arr[0].split(",")[0]); //обрезка названия по запятую
      workData.push(arr[1]);
    });

  /*
   * Логика графика по форме собственности предприятий
   */
  work.forEach(function (companyName) {
    if (companyName.split(",").length) {
      typeWorkResult[companyName.split(",")[1].trim()] =
        typeWorkResult[companyName.split(",")[1].trim()] + 1 || 1;
    }
  });

  Object.entries(typeWorkResult)
    .sort((a, b) => b[1] - a[1])
    .forEach((arr) => {
      typeWorkLabels.push(arr[0]);
      typeWorkData.push(arr[1]);
    });

  /*
   * Логика графика по годам за весь период
   */
  yearsAttestation.forEach(function (a) {
    yearsAttestationResult[a] = yearsAttestationResult[a] + 1 || 1;
  });
  //Сортировка и распределение отобранных значений и их количества
  Object.entries(yearsAttestationResult)
    .sort((a, b) => {
      return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
    })
    .forEach((item) => {
      yearsAttestationLabels.push(item[0]);
      yearsAttestationData.push(item[1]);
    });

  /*
   * Логика графика по месяцам года за весь период (за текущий год)
   */
  // 1. Отобрать все даты за нынешний(последний) год: ['...','...','...',]
  // 2. Выполнить подсчет количества дат по месяцам: {'01': 2, '02': 12, ... }
  // https://qna.habr.com/q/355905

  //отбор дат за текущий год
  const filteredDates = dateAttestation
    .filter((item) => item.getFullYear() == new Date().getFullYear())
    .map((date) => {
      let month =
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      return date.getDate() + "-" + month + "-" + date.getFullYear();
    });

  //распределение дат по месяцам
  const generateMonthsValues = (arr: string[]) => {
    const months: MonthsValues = {
      "01": [],
      "02": [],
      "03": [],
      "04": [],
      "05": [],
      "06": [],
      "07": [],
      "08": [],
      "09": [],
      "10": [],
      "11": [],
      "12": [],
    };
    let m = "00";
    arr.map((date, i) => {
      m = date.split("-")[1];
      if (!months[m]) months[m] = [];
      months[m].push(date);
    });

    return months;
  };

  //присваивание значений для дальнейшего вывода
  Object.entries(generateMonthsValues(filteredDates))
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .forEach((item) => monthAttestationData.push(item[1].length));

  /*
   * Логика графика по месяцам года за весь период (за текущий год)
   */
  //Все года записей протоколов
  const allYears = Array.from(
    new Set(dateAttestation.map((date) => date.getFullYear()))
  ).sort();

  //Формирование данных для вывода графика
  allYears.forEach((year, idx) => {
    //отбор дат за определенный год
    const filteredDates = dateAttestation
      .filter((item) => item.getFullYear() == year)
      .map((date) => {
        let month =
          date.getMonth() < 9
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        return date.getDate() + "-" + month + "-" + date.getFullYear();
      });

    const colors = [
      "#0d6efd",
      "#d63384",
      "#ffc107",
      "#6610f2",
      "#198754",
      "#fd7e14",
      "#20c997",
    ];

    const bgColor = (num: number) => {
      let color = "";
      colors[num]
        ? (color = colors[num])
        : (color = colors[Math.floor(Math.random() * colors.length)]);

      return color;
    };

    //Добавляем данные в заданном формате для дальнейшего вывода
    alltimeAttestationData.push({
      label: year,
      backgroundColor: bgColor(idx),
      data: Object.entries(generateMonthsValues(filteredDates))
        .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
        .map((item) => item[1].length),
    });
  });

  loading.value = false;
});
</script>

<style></style>
