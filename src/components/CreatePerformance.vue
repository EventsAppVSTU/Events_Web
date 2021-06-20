<template>
<div>
<button type="button" class="btn text-button" data-toggle="modal" data-target="#exampleModalCenter">
  Создать запись
</button>

<!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document"  >

    <div class="modal-content" v-if="!performanceSaved">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Создать выступление</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="performance-form">
          <div class="performance-form_header">
            <input type="text" class="performance-add" placeholder="Название" name="name"  v-model="perf.performance_name">
          </div>
          <div class="performance-form_info">
            <!-- <input type="text" class="performance-add" placeholder="Описание" name="description" v-model="perf.description"> -->
            <input type="text" class="performance-add" placeholder="Дата ГГГГ-ММ-ДД" name="date"  v-model="perf.datePerf">
            <input type="text" class="performance-add" placeholder="Время начала ЧЧ:ММ" name="startTime"  v-model="perf.startTime">
            <input type="text" class="performance-add" placeholder="Время конца ЧЧ:ММ" name="time" v-model="perf.endTime">
            <input type="text" class="performance-add" placeholder="Ведущий" name="speaker" v-model="perf.speaker">
            <textarea  rows="5" cols="" class="" name="" id="" placeholder="Описание" v-model="perf.description"></textarea>
          </div>
          <button class="btn btn-outline-danger btn-rounded" v-on:click="createPerformance()">+ Create</button>
        </form>
      </div>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="createPerformance()">Save changes</button>
      </div> -->
    </div>

  <div class="container" v-else>
    <div class="done-box">
      <!-- <svg class="feather fs-1">
        <use xlink:href="@/assets/feather-sprite.svg#check-circle"/>
      </svg> -->
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
        
      </svg>
      <svg class="bi flex-shrink-0 me-2" width="32" height="32"><use xlink:href="#check-circle-fill"/></svg>
      <h2 class="text-">Готово</h2>

    </div>
  </div>
  </div>
  
    
</div>
</div>
  
</template>

<script>

import {postPerformance} from '../requests/performances'

export default {
  name: 'CreatePerformance',
  props: {
    event_id: null
  },
  data (){
    return {
      perf: {
        performance_name: '',
        datePerf: '',
        description: '',
        startTime: '',
        endTime: '',
        speaker: '',
        event_id: ''
      },
      performanceSaved: false
    }
  },
  methods:{
    createPerformance(){
      this.perf.event_id = this.event_id;
      if(this.perf.performance_name){
        postPerformance(this.perf).then(data=>{
          console.log(data)
          this.perf.performance_name = ''
          this.perf.datePerf = ''
          this.perf.description = ''
          this.perf.startTime = ''
          this.perf.endTime = ''
          this.perf.speaker = ''
          this.perf.event_id = ''

          this.performanceSaved = true
          this.$emit('updatePerfTable')
        })

      }
      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.done-box{
  background-color: white;
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
}

.performance-form{
  width: 100%;
  padding: 1rem 0;
}
input[type="submit"].performance-add{
  padding-right: 1rem;
    
}
.performance-add{
  border: 1px solid lightgray;
  padding: .5rem;
  margin: .5rem 0;
  width: 50%;
}
.performance-form_header{
  width: 100%;
}
.performance-form_header .performance-add{
  width: 100% ;
  margin-bottom: .5rem;
}
textarea{
  width: 100%;
  
}
</style>
