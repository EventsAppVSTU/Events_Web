<template>
  <div class="createEvent">
    <div class="current-event">
        <form   action="/api/create-new-event" method="POST" id="createEventForm" >
          <h2 class="current-event_header">
              <input type="text" value="" name="name" placeholder="Название" id="name">
          </h2>
          <div class="event-card_img-container">
              <!-- <input type="file" name="image" id="image"> -->
              <!-- <label for="photo">Выбирите фото</label> -->
              <img src="../assets/photo-icon.png" alt="">
          </div>
          <input type="text" name="image" id="image" class="input-photo-link" placeholder="Link to the Photo">
          <h3 class="current-event_decription-header">Описание</h3>
          <textarea name="description" id="description" cols="30" rows="6" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias suscipit totam quis ab saepe dolore aliquid provident quas aliquam cupiditate nobis doloremque porro ut eum dolorem architecto unde, repudiandae corporis."></textarea>
          <h3 class="current-event_decription-header">Начало события</h3>
          <textarea name="startDate" id="startDate" cols="30" rows="3" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias suscipit totam quis ab saepe dolore aliquid provident quas aliquam cupiditate nobis doloremque porro ut eum dolorem architecto unde, repudiandae corporis."></textarea>
          <h3 class="current-event_decription-header">Конец события</h3>
          <textarea name="endDate" id="endDate" cols="30" rows="3" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias suscipit totam quis ab saepe dolore aliquid provident quas aliquam cupiditate nobis doloremque porro ut eum dolorem architecto unde, repudiandae corporis."></textarea>
          <h3 class="current-event_decription-header">Место проведения</h3>
          <textarea name="place" id="place" cols="30" rows="3" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias suscipit totam quis ab saepe dolore aliquid provident quas aliquam cupiditate nobis doloremque porro ut eum dolorem architecto unde, repudiandae corporis."></textarea>
          <h3 class="current-event_decription-header">Категория</h3>
          <textarea name="category_id" id="" cols="30" rows="3" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias suscipit totam quis ab saepe dolore aliquid provident quas aliquam cupiditate nobis doloremque porro ut eum dolorem architecto unde, repudiandae corporis."></textarea>

          <!-- <div class="event-card_img-container">
              <img src="img/map.png" alt="">
          </div> -->
          <!-- <input type="submit" value="Save"> -->
          <button type="submit" class="btn btn-outline-danger btn-rounded" v-on:click="createEvent()">Create Event</button>
        </form>
    </div>
  </div>
</template>

<script>


export default {
  name: 'CreateEvent',
  components: {
   
  },
  methods:{
    createEvent(){
      // взять данные с формы
      console.log('werwer')

      // установить созданное событие как текущее
    }
  }
}
</script>

<style>
.current-event_header>input{
    border: none;
    width: 100%;
    background-color: white;
}
.input-photo-link{
  padding: .5rem;
  width: 40%;
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
</style>
