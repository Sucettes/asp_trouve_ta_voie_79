<template>
  <div id="card">
    <div id="cardBody" class=" shadow-sm p-3 mb-5 bg-body rounded">

      <div>
        <div v-if="images[0]">
          <img class="lstPic" :src="'http://localhost:8090' + images[0].path"/>
        </div>
        <h3>{{ titre }}</h3>
        <hr>
        <ul>
          <li>Style : {{ style }}</li>
          <li>Difficulté : {{ difficulte }}</li>
          <li>Lieu : {{ lieu.titre }}</li> <!-- todo : mettre un lien pour consulté le lieu... -->
        </ul>
        <!--todo : Afficher les ratings-->
        <!--        <div id="ratingDiv">-->
        <!--          <p><strong>Étoiles : </strong>{{ nbEtoiles }}</p>-->
        <!--          <p><strong>Votes : </strong>{{ nbVotes }}</p>-->
        <!--        </div>-->

        <hr>
        <h6>Description</h6>
        <p v-if="description.length > 170">{{ description.substring(0, 170) + "..." }}</p>
        <p v-else>{{ description }}</p>

        <span></span>
        <span></span>
        <span></span>
      </div>

      <div>
        <div id="btnWrapper">
<!--          <p @click="seeDetails" id="detailsBtn">Détails</p>-->
          <button @click="editGrimpe" type="button" class="btn btn-outline-secondary">Modifier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "grimpeCardComponent",
  props: ["id", "titre", "style", "description", "difficulte", "nbEtoiles", "nbVotes", "images", "lieu"],
  methods: {
    seeDetails() {

    },
    editGrimpe() {
      this.$router.push({
        name: "modifierGrimpe",
        params: {
          id: this.id
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/custom.scss';

.containerImg {
  display: inline-block;
  position: relative;

  .text {
    backdrop-filter: blur(15px) saturate(72%);
    -webkit-backdrop-filter: blur(15px) saturate(72%);
    background-color: rgba(221, 160, 122, 0);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
  }
}

.lstPic {
  width: 100%;
}

#card {
  padding: 15px;
  p {
    overflow: auto;
  }
}

#cardBody {
  min-height: 520px; // todo : hauteur de carte

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 25px;

  h3 {
    text-align: center;
    color: $primary
  }

  span {
    height: 10px;
  }
}

#ratingDiv {
  display: flex;
  justify-content: space-between;
}

#btnWrapper {
  display: flex;
  justify-content: space-around;

  #detailsBtn {
    cursor: pointer;
    color: $primary
  }
}
</style>
