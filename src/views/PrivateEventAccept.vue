<template>
  <div class="createEvent">
    <!-- <div class="private-event"> -->
        <h2>Заявки на событие</h2>
        <select class="form-select circleButton" aria-label="Default select example" @change="changeSelectedOrganization($event)">
            <option :selected="displayMode">принято</option>
            <option>подтверждено</option>
            <option>отклонено</option>
            <option>активировано</option>
        </select>

        <div v-if="filteredBids == ''" class="message-empty-content">
          <h5>Нет заявок</h5>
          <p>Тут появятся заявки на участие в событии от пользователей</p>
        </div>

        <div class="card-container">
          <div class="data-card" v-for="(user, index) in filteredBids" :key="index">
              <div class="data-row_content">
                <div class="data-card_content_user-block">
                  <div class="data-card_content_user-block-avatar">
                    <!-- <img :src="user.image" alt=""> -->
                    <img :src="user.event_image" alt="">
                  </div>
                  <div class="data-card_content_user-block-user">
                    <!-- <h5>{{user.name + ' '+ user.surname}}</h5> -->
                    <h5>{{user.user_name}}</h5>
                    <!-- <p>{{user.login}}</p> -->
                    <p>id: {{user.id}}</p>
                    <p>login: {{user.login}}</p>
                    <p>статус заявки: {{user.state_name}}</p>
                  </div>
                </div>
                <span>хочет записаться на событие</span>
                <!-- <p class="data-card-p">{{user.requestedEvent}}</p> -->
                <p class="data-card-p">{{user.event_name}}</p>
                <button  class="btn btn-outline-success mx-1" @click="acceptUserOnEvent(user, index)">Accept</button>
                <button  class="btn btn-outline-danger" @click="declineUser(user, index)">Decline</button>
              </div>            
          </div>

        </div>
    <!-- </div> -->
  </div>
</template>

<script>
import {getUserRequests} from '../requests/privateEvents'
import {getCurrentEvent} from '../requests/currentEvent'
// import { getUserById } from '../requests/users'

export default {
  name: 'PrivateEventAccept',
  data: function(){
    return {
      usersRequests: [
        {
            code: "",
            event_id: "1",
            event_image: "https://source.unsplash.com/mAwE-fqgDXc",
            event_name: "Умный дом GreenZone",
            id: "1",
            state_id: "1",
            state_name: "принято",
            user_id: "1",
            user_name: "2021 3!!! МАРТ!!!",
            login: ''
          },

        {
              id: 1,
              name: 'Иван',
              surname: 'Иванов',
              image: 'https://source.unsplash.com/6GgCyNnF6Zs',
              // organization_id: Number,
              login: 'ivan@test.ru',
              // password: '',
              registrationDate: '',
              // role: '',
              // current_event: Number,
              requestedEvent: 'Секретные разработки',
          },
          {
              id: 2,
              name: 'Петр',
              surname: 'Рыбаков',
              image: 'https://source.unsplash.com/pUhxoSapPFA',
              organization_id: Number,
              login: 'petryba@test.ru',
              password: '',
              registrationDate: '',
              role: '',
              current_event: Number,
              requestedEvent: 'Секретные разработки',
          },
            {
              id: 3,
              name: 'Василиса',
              surname: 'Захарова',
              image: 'https://source.unsplash.com/-djRG1vB1pw',
              organization_id: Number,
              login: 'vasilisa@test.ru',
              password: '',
              registrationDate: '',
              role: '',
              current_event: Number,
              requestedEvent: 'Секретные разработки',
          },
          {
              id: 4,
              name: 'Антон',
              surname: 'Соколов',
              image: 'https://source.unsplash.com/WZB_ZOqR4dA',
              organization_id: Number,
              login: 'sokolanton@test.ru',
              password: '',
              registrationDate: '',
              role: '',
              current_event: Number,
              requestedEvent: 'Секретные разработки',
          },          
          {
              id: 5,
              name: 'Анна',
              surname: 'Смирнова',
              image: 'https://source.unsplash.com/Brl7bqld05E',
              organization_id: Number,
              login: 'annasmirnova@test.ru',
              password: '',
              registrationDate: '',
              role: '',
              current_event: Number,
              requestedEvent: 'Секретные разработки',
          },    
          {
              id: 6,
              name: 'Денис',
              surname: 'Волков',
              image: 'https://source.unsplash.com/Y7C7F26fzZM',
              organization_id: Number,
              login: 'denisvolkov@test.ru',
              password: '',
              registrationDate: '',
              role: '',
              current_event: Number,
              requestedEvent: 'Секретные разработки',
          },
          {
              id: 7,
              name: 'Илья',
              surname: 'Крышин',
              image: 'https://source.unsplash.com/eyFbjKWlR2g',
              organization_id: Number,
              login: 'ilya@test.ru',
              password: '',
              registrationDate: '',
              role: '',
              current_event: Number,
              requestedEvent: 'Секретные разработки',
          },
          {
              id: 8,
              name: 'Валерий',
              surname: 'Сурин',
              image: 'https://source.unsplash.com/fG_ud73U_ZM',
              organization_id: Number,
              login: 'valera@test.ru',
              password: '',
              registrationDate: '',
              role: '',
              current_event: Number,
              requestedEvent: 'Секретные разработки',
          }  

        ],
      editBtn: 'Edit',
      isDisabled: true,
      currentEvent: {},
      displayMode: 'принято'
    }
  },
  methods:{
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
            this.$root.currentEvent = data.data.objects[0].id;
        })
    },
    changeSelectedOrganization(event){
      console.log('Статус mode', event.target.options[event.target.options.selectedIndex].value)
      this.displayMode = event.target.options[event.target.options.selectedIndex].value
      this.loadPage()
    },
    loadPage(){
      //запрашиваем заявки, кладем в userRequests
      getUserRequests().then(data=>{
        console.log(data)
        this.usersRequests = []
        console.log('Заявки ', data.data.objects)
        data.data.objects.forEach(element => {
          if(element.event_id == this.currentEvent.id){

            this.usersRequests.push(element)

            // getUserById(element.user_id).then(user=>{
            //   console.log('пользователь, ', this.usersRequests[index])
            //   console.log('пользователь, element ', element)
            //   this.usersRequests[index].login = user.data.objects[0].login
            //   console.log('логин ', this.usersRequests[index].login)
            // }).catch(err=>{
            //   console.log(err)
            // })
          }
        });
        // this.usersRequests.forEach(element => {
        //     element.login = 'surin190899@gmail.com'
        // });
        console.log('Заявки на данное событие ',this.usersRequests)

      }).catch(err=>{
        console.log(err)
      })
    },
    acceptUserOnEvent(user, index){
      fetch(`/api/private-event-accept`, {
        credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
        method: 'POST',              // метод POST 
        body: JSON.stringify(user),  // типа запрашиаемого документа
        headers: new Headers({
          'Content-Type': 'application/json',
          'Token': localStorage.hash
        }),
      })
      .then(response => {
        return response // возвращаем промис
      }).then(json=>{
        console.log('succsess ', json)
        console.log('Принято')
      })

      this.usersRequests.splice(index, 1)
      
    },
    declineUser(user, index){
      fetch(`/api/private-event-decline`, {
        credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
        method: 'POST',              // метод POST 
        body: JSON.stringify(user),  // типа запрашиаемого документа
        headers: new Headers({
          'Content-Type': 'application/json',
          'Token': localStorage.hash
        }),
      })
      .then(response => {
        return response // возвращаем промис

      }).then(json=>{
        console.log('succsess deleted ', json)
        console.log('Принято')
      })
      this.usersRequests.splice(index, 1)
    },
    

  },
  computed: {
    filteredBids: function(){
      var usersRequests = this.usersRequests;
      var mode = this.displayMode
      //фильтрация для отображения только тех событий, которые организации админа
      usersRequests = usersRequests.filter(function(item){
        console.log('mode: ', mode)
        if (item.state_name == mode) {
          return item;
        }
      })

      return usersRequests;
    },

  },
  mounted(){
    getCurrentEvent().then(data=>{
      this.currentEvent = data.data.objects[0]
      this.loadPage()
    })
  }
}
</script>

<style>


textarea {
  height: 100%;
  resize:none;
  white-space: normal;
}
.current-event_settings{
  display: flex;
}
.current-event_settings button{
  margin: 0 .2rem;
}
.request-card{
  background-color: #cccccc;
  padding: 1rem;
}

/* ------Cards-------- */
.card-container{
  width: 100%;
  display: flex;
  justify-content: space-between left;
  flex-wrap: wrap;
}
.data-card{
  background-color: #f4f4f4;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  margin: 1rem .5rem;
  width: calc(25% - 1rem);
}
.data-card-p{
  width: 100% !important;
}
.data-card_content_user-block{
  display: flex;
}
.data-card_content_user-block-avatar{
  width: 50px;
  height: 50px;
  background-color: rgb(211, 211, 211);
  border-radius: 25px;
  overflow: hidden;
}
.data-card_content_user-block-avatar>img{
  object-fit: cover;
    width: 100%;
    height: 100%;
}
.data-card_content_user-block-user{
  padding-left: 1rem;
}
/* ------ End Cards-------- */
</style>
