<template>
  <div>
    <h1>Import a WCL report</h1>
    <div class="input-group flex-nowrap">
      <div class="input-group-prepend">
        <span class="input-group-text" id="addon-wrapping">Report URL</span>
      </div>
      <input type="text" class="form-control" placeholder="https://www.warcraftlogs.com/reports/..." v-model="wcl_link" aria-describedby="addon-wrapping">
      <div class="input-group-append">
        <button class="btn btn-outline-primary" type="button" id="fetch-wcl" v-on:click="query_log">Go</button>
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios";
import ReportOverview from "@/views/reports/ReportOverview";
import router from "@/router";
export default {
  name: "NewReport",
  components: {ReportOverview},
  data() {
    return {
      show_reports: false,
      fights: {},
      wcl_link: "https://www.warcraftlogs.com/reports/jhXWQq72gGBy9H41/#fight=46&type=summary",
    }
  },
  methods: {
    query_log: function (event) {
      let re = new RegExp('(?<=reports\\/)(.*)(?=\\/)')
      let reportid = re.exec(this.wcl_link)[0]

      router.push(`/reports/${reportid}`)
    }
  }
}
</script>

<style scoped>

</style>
