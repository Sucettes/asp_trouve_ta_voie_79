<template>
    <ErreurComponent :code="code" :statusText="errorText"></ErreurComponent>
</template>

<script>
import ErreurComponent from "@/components/erreur/ErreurComponent";
export default {
  name: "ErreurView",
  components: {ErreurComponent},
  data() {
    return {
      code: undefined,
      errorText: ""
    }
  },
  created() {
    this.code = this.$route.meta.code;
    this.errorText = this.$route.meta.errorText;
  }
};
</script>
