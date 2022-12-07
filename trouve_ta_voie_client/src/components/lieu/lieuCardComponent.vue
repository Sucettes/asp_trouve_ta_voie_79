<template>
  <div id="card">
    <div id="cardBody" class="shadow-sm p-3 bg-body rounded">
      <div>
        <h3 @click="seeDetails">{{ titre }}</h3>
        <hr>
        <h6>Description</h6>

        <p v-if="description.length > 170">{{ description.substring(0, 170) + "..." }}</p>
        <p v-else>{{ description }}</p>

        <span></span>

        <h6>Directives</h6>
        <p v-if="directives.length > 170">{{ directives.substring(0, 170) + "..." }}</p>
        <p v-else>{{ directives }}</p>

        <p class="cooP"><strong>Latitude  : </strong> <span class="accColorTxt">{{ +latitude }}</span></p>
        <p class="cooP"><strong>Longitude : </strong> <span class="accColorTxt">{{ +longitude }}</span></p>

        <span></span>
        <span></span>
        <span></span>
      </div>

      <div>
        <div id="btnWrapper">
          <button @click="editLieu" type="button" class="btn btn-outline-primary">Modifier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lieuCardComponent",
  props: ["id", "titre", "description", "directives", "latitude", "longitude"],
  methods: {
    seeDetails() {
      this.$router.push({name: "lieuDetails", params: {id: this.id}});
    },
    editLieu() {
      this.$router.push({
        name: "modifierLieu",
        params: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/custom.scss';

#card {
  padding: 15px;

  p {
    overflow: auto;
  }
}

#cardBody {
  width: 100%;
  min-height: 520px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 25px;

  h3 {
    text-align: center;
    color: $primary;
    cursor: pointer;
  }

  h3:hover {
    color: $Darkaccent;
  }

  span {
    height: 10px;
  }
}

#btnWrapper {
  display: flex;
  justify-content: space-between;

  #detailsBtn {
    cursor: pointer;
    color: $primary;
    margin-top: 10px;
    margin-bottom: 0;
  }

  #detailsBtn:hover {
    color: $Darkaccent;
  }
}

.cooP {
  margin: 0;
}
</style>
