<template>
  <ul class="nav nav-tabs" v-if="report !== null" role="tablist">
    <PullChoice
      v-for="event in report[fightname]"
      :fight="event"
      :chosen="pullid"
    />
  </ul>
</template>

<script>
import PullChoice from "@/views/reports/PullChoice";

export default {
  name: "ReportDetails",
  props: [
    // "report",
  ],
  data() {
    return {
      report: this.$store.state.currentReport,
    }
  },
  components: {
    PullChoice
  },
  computed: {
    pullid() {
      return this.$route.params.pullid
    },
    fightname() {
      return this.$route.params.fightname
    }
  },
  created() {
    console.log('report: ' + this.report)
    console.log('pullid: ' + this.pullid)
    console.log('fightname: ' + this.fightname)
    console.log('pulls: ' + this.report["The Eye of the Jailer"])
    if (this.report === null) {
      // this URL was navigated directly, and an API lookup needs to happen
      console.log("Directly navigating here is unsupported!")
    }
  },
}
</script>

<style scoped>

</style>
