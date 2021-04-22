<template>
  <div class="createEvent">
    <!-- <div class="private-event"> -->
        <h2>Private Event</h2>
        <div class="card-container">

          <div class="data-card" v-for="(user, index) in usersRequest" :key="index">
              <div class="data-row_content">
                <div class="data-card_content_user-block">
                  <div class="data-card_content_user-block-avatar">
                    <img :src="user.image" alt="">
                  </div>
                  <div class="data-card_content_user-block-user">
                    <h5>{{user.name + ' '+ user.surname}}</h5>
                    <p>{{user.login}}</p>
                  </div>
                </div>
                <span>хочет записаться на событие</span>
                <p class="data-card-p">{{user.requestedEvent}}</p>
                <button  class="btn btn-outline-success mx-1" @click="acceptUserOnEvent(user, index)">Accept</button>
                <button  class="btn btn-outline-danger" @click="declineUser(user, index)">Decline</button>
              </div>            
          </div>

        </div>
    <!-- </div> -->
  </div>
</template>

<script>

export default {
  name: 'PrivateEventAccept',
  data: function(){
    return {
      usersRequest: [{
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
      isDisabled: true
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

      this.users.splice(index, 1)
      
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
      this.users.splice(index, 1)
    },
    

  },
  mounted(){

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
