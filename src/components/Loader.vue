<template>
  
    <div class="loader-conteiner">
      <div class="spinner-border text-primary loader" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  
</template>

<script>
export default {
  name: 'Loader',
  props: {
    msg: String
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
