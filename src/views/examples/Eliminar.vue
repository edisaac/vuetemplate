<template>
  <div class="home">
    <HelloWorld msg="ELIMINAR" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/examples/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
}
</script>
