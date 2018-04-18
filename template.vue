<template>
  <div id="">
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: '',
  components: {
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
  ]),
  methods: mapActions([
      'getLessonPlans',
      'getComponents',
      'getGoals',
      'postGoal',
      'saveFinalReflection',
  ]),
  mounted(){
  }
};
</script>

<style scoped>

</style>