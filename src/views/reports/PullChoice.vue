<template>
  <li class="nav-item">
    <a class="nav-link"
       aria-current="page"
       v-bind:class="{ active: isActivePull }"
       v-on:click="updatePage">
      Pull {{ fight.pullNum }}
      <CProgress
        :value="fightPercentage"
        :color="fightPercentageToColor"
        showPercentage
        :style="{ height: '0.5rem' }" />
    </a>
  </li>
</template>

<script>

export default {
  name: "PullChoice",
  props: [
    "chosen",
    "fight"
  ],
  methods: {
    updatePage() {
      this.$router.push({
        name: 'reportdetails',
        params: {
          // fightname: this.$route.params.fightname,
          pullid: this.fight.pullNum,
          // report: this.$store.state.currentReport,
        }
      })
    }
  },
  created() {
    console.log("chosen pullid: " + this.chosen)
    console.log("fight: " + JSON.stringify(this.fight))
  },
  computed: {
    isActivePull() {
      console.log("chosen: " + this.chosen + " pullNum: " + this.fight.pullNum)
      return Number(this.chosen) === Number(this.fight.pullNum)
    },
    fightPercentage() {
      let health = Number(100) - Number(this.fight.fightPercentage)
      console.log("damage done: " + health)
      return health
    },
    fightPercentageToColor() {
      if (this.fight.kill) {
        return "success"
      } else if (this.fightPercentage < 30) {
        return "dark"
      } else if ( this.fightPercentage >= 30 && this.fightPercentage < 60) {
        return "danger"
      } else {
        return "warning"
      }
    }
  }

}
</script>

<style scoped>

</style>
