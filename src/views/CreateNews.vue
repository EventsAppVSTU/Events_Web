<template>
  <div class="createEvent">
    <div class="current-event">
        <form   action="/api/create-news" method="POST" id="createNewsForm" >
          <h2 class="current-event_header">
              <input type="text" value="" name="name" placeholder="Название новости" id="name">
          </h2>
          <div class="event-card_img-container">
              <!-- <input type="file" name="image" id="image"> -->
              <!-- <label for="photo">Выбирите фото</label> -->
              <img :src="newsImage" alt="">
          </div>
             <input type="text" name="image" id="image" v-model="newsImage">
          <h3 class="current-event_decription-header">Описание</h3>
          <textarea name="description" id="description" cols="30" rows="10" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias suscipit totam quis ab saepe dolore aliquid provident quas aliquam cupiditate nobis doloremque porro ut eum dolorem architecto unde, repudiandae corporis."></textarea>
          <input type="text" class="d-none" v-model="currentEvent.id" name="event_id">
          <button type="submit" class="btn btn-outline-danger btn-rounded" v-on:click="createEvent()">Save button</button>
        </form>
    </div>
  </div>
</template>

<script>


export default {
  name: 'CreateEvent',
  components: {
   
  },
  data: function(){
    return{
      currentEvent: {
        id: 1, 
        name: "Робоcr",
        description: "Lorem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet.",
        startDate: '',
        endDate: '',
        image: "@/assets/nasa-Q1p7bh3SHj8-unsplash.jpg",
        place: '',
        category_id: Number
      },
      newsImage: ''
    }
  },
  methods:{
    createEvent(){
      // взять данные с формы
      console.log('werwer')

      // установить созданное событие как текущее
    },
    getCurrentEvent(){
      console.log('getting...')
      fetch('/api/get-current-event-by-id?user=admin').then(res=>{
            if(res.ok){
                var data = res.json();
                console.log('OK')
                return data;
            }
            else{
                console.log('er get rooms :(');
                throw new Error ('er');
            }
        }).then(data=>{
            console.log('current event data',data.data.objects[0])
            this.currentEvent = data.data.objects[0];
        })
    }
  },
  mounted(){
    //get current event id
    this.getCurrentEvent()
  }
}
</script>

<style>
.current-event_header>input{
    border: none;
    width: 100%;
    background-color: white;
}
.current-event_header>input:disabled{
  color: #333333;
}
.current-event textarea{
  width: 100%;
  border: none;
  background-color: white;
}
.current-event>textarea{
    border: none;
}
.current-event>textarea:disabled{
  color: #ff0000;
  border: none;
  background: none;
}
.current-event p{
    width: 70%;
}
.current-event_header{
    display: flex;
}
.current-event_header input{
    flex-grow: 1;
}
.current-event_settings{
    /* display: inline-block; */
}
.current-event>form{
  padding-bottom: 2rem;
}
</style>
