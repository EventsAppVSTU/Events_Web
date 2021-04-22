<template>
  
    <select class="form-select circleButton" aria-label="Default select example" @change="changeSelectedCommunity($event)">
      <!--   -->
        <option :selected="performance.id == 1"
                :value="performance.id" v-for="(performance) in performances" 
                :key="performance.id"> 
                    {{performance.name}}
        </option>

    </select>
  
</template>

<script>
import {getPerformances} from '../requests/performances'
// import {getCurrentEvent} from '../requests/currentEvent'
//Нужны:
//Выбор категории

export default {
  name: 'PerformancesComboBox',
  props: {
    msg: String,
    eventId: Number
  },
  data(){
    return {
      performances: {},
      selectedPerformance: '',
    }
  },
  methods:{
    loadOptions(){
      console.log('options')
      
      getPerformances(this.eventId).then(data=>{
            this.performances = data.data.objects;
            console.log('performances ', this.performances)
            this.selectedPerformance = data.data.objects[0].id
            this.$emit('performanceSelected', {performance: this.selectedPerformance})
        }).catch(err=>{
          console.log(err)
        })
      
      // getCurrentEvent().then(event=>{
      //   var eventId = event.data.objects[0].id;
      //     console.log('for event ', eventId)
      //   getPerformances(eventId).then(data=>{
      //         this.performances = data.data.objects;
      //         console.log('performances ', this.performances)
      //         this.selectedPerformance = data.data.objects[0].id
      //         this.$emit('performanceSelected', {performance: this.selectedPerformance})
      //     }).catch(err=>{
      //       console.log(err)
      //     })
      // })
    },
    changeSelectedCommunity(event){
      console.log('performance id', event.target.options[event.target.options.selectedIndex].value)
      this.selectedPerformance = event.target.options[event.target.options.selectedIndex].value
      this.$emit('performanceSelected', {performance: this.selectedPerformance})
    }
  },
  mounted(){
    this.loadOptions()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
