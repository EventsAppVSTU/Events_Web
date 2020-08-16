<template>
<div>
<button type="button" class="btn text-button" data-toggle="modal" data-target="#exampleModalCenter">
  Создать запись
</button>

<!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Создать выступление</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="performance-form">
          <div class="performance-form_header">
            <input type="text" class="performance-add" placeholder="Название" name="name"  v-model="perf.name">
          </div>
          <div class="performance-form_info">
            <!-- <input type="text" class="performance-add" placeholder="Описание" name="description" v-model="perf.description"> -->
            <input type="text" class="performance-add" placeholder="Дата ГГГГ-ММ-ДД" name="date"  v-model="perf.datePerf">
            <input type="text" class="performance-add" placeholder="Время начала ЧЧ:ММ" name="startTime"  v-model="perf.startTime">
            <input type="text" class="performance-add" placeholder="Время конца ЧЧ:ММ" name="time" v-model="perf.endTime">
            <input type="text" class="performance-add" placeholder="Ведущий" name="speaker" v-model="perf.speaker">
            <textarea @input="fixTextareaSize()" rows="5" cols="" class="" name="" id="" placeholder="Описание" v-model="perf.description"></textarea>
          </div>
          <button class="btn btn-outline-danger btn-rounded" v-on:click="createPerformance()">+ Create</button>
        </form>
      </div>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="createPerformance()">Save changes</button>
      </div> -->
    </div>
  </div>
</div>
</div>
  
</template>

<script>
export default {
  name: 'CreatePerformance',
  props: {
    event_id: Number
  },
  data (){
    return {
      perf: {
        name: '',
        datePerf: '',
        description: '',
        startTime: '',
        endTime: '',
        speaker: '',
        event_id: ''
      },
    }
  },
  methods:{
    createPerformance(){
      this.perf.event_id = this.event_id;
      if(this.perf.name){
        
        fetch(`/api/create-performance-by-id`, {
        credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
        method: 'POST',              // метод POST 
        body: JSON.stringify(this.perf),  // типа запрашиаемого документа
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(response => {
        return response // возвращаем промис

      }).then(json=>{
        console.log('succsess ', json)
        // this.updatePerformancesTable()
        this.$emit('updatePerfTable')
      })
      }
      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
