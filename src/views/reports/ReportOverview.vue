<template>
  <h1>Choose a fight</h1>
  <div v-if="fights !== null">
    <span v-for="(fight, name) in reportFights">
      <h2>{{ name }}</h2>
      <CTable class="table table-striped" hover responsive @row-clicked="fightChosen">
        <CTableHead>
          <CTableHeaderCell>
            Time
          </CTableHeaderCell>
          <CTableHeaderCell>
            Kill
          </CTableHeaderCell>
          <CTableHeaderCell>
            Percent Remaining
          </CTableHeaderCell>
          <CTableHeaderCell>
            Wipe Called?
          </CTableHeaderCell>
          <CTableHeaderCell>
            View Report
          </CTableHeaderCell>
        </CTableHead>
        <CTableBody>
            <CTableRow v-for="event in fight">
            <CTableDataCell v-if="name !== 'trash'">
              {{ msToFightLength(event.startTime, event.endTime) }}
            </CTableDataCell>
            <CTableDataCell v-else>
              N/A
            </CTableDataCell>
            <CTableDataCell>
              {{ event.kill }}
            </CTableDataCell>
            <CTableDataCell v-if="event.kill">
              N/A
            </CTableDataCell>
            <CTableDataCell v-else>
              {{ event.fightPercentage }}
            </CTableDataCell>
            <CTableDataCell v-if="event.kill">
              N/A
            </CTableDataCell>
            <CTableDataCell v-else-if="event.wipeCalledTime">
              {{ event.wipeCalledTime }}
            </CTableDataCell>
            <CTableDataCell v-else>
              No
            </CTableDataCell>
            <CTableDataCell>
              <button class="btn btn-outline-primary" type="button"
                      v-bind:id="event.pullNum"
                      v-on:click="viewReport(name, event.pullNum)"
              >Go</button>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </span>
  </div>
  <div v-else>
    <div class="progress">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
    </div>
  </div>
</template>

<script>
import PullChoice from "@/views/reports/PullChoice";
import axios from "axios";
import router from "@/router";

export default {
  name: "ReportOverview",
  components: {
    PullChoice
  },
  props: [
    'wcl_id'
  ],
  data() {
    return {
      show_reports: false,
      fights: null,
      reportid: this.$route.params.reportid
    }
  },
  created() {
    axios
      .get(`http://localhost:8000/windowviewer/wcl/fights/${this.reportid}`)
      .then(response => (this.fights = response.data))
  },
  methods: {
    msToFightLength(startTime, endTime) {
      // This function only covers m:ss for now
      let diff = endTime - startTime
      let m = Math.floor((diff/1000/60/60)*60);
      let s = Math.floor(((diff/1000/60/60)*60 - m)*60);
      return `${m}:${s < 10 ? `0${s}` : s}`
    },
    fightChosen(item, index, name, event) {
      alert("chosen!")
    },
    viewReport(name, id) {
      router.push({
        name: 'reportdetails',
        params: {
          reportid: this.reportid,
          fightname: name,
          pullid: id,
        }
      })
    },
    updateFights(data) {
      this.fights = data
      this.show_reports = true
    }
  },
  computed: {
    reportFights() {
      let available = Object.keys(this.fights).includes('reportData')
      if (available) {
        let pivot = {}
        for (let fight of this.fights.reportData.report.fights) {
          console.log("fight: " + JSON.stringify(fight))
          if (fight.kill === null) {
            // this is a trash fight
            // todo: don't just skip these
            continue

            if (!("trash" in pivot)) {
              pivot["trash"] = []
            }
            pivot["trash"].push(fight)
            console.log("after trash: " + pivot)

            continue
          }
          if (!(fight.name in pivot))
            pivot[fight.name] = []
          fight.pullNum = pivot[fight.name].length + 1
          pivot[fight.name].push(fight)
        }
        this.$store.commit('setReport', pivot)
        return pivot
      } else {
        return null
      }
    },
  },
}
</script>

<style scoped>

</style>
