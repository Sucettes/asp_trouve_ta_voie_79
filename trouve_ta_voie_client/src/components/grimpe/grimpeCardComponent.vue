<template>
  <div id="card">
    <div id="cardBody" class="shadow-sm p-3 mb-5 bg-body rounded" :class="{cardBodyShort: hideDescription === 'true'}">

      <div>
        <div v-if="images[0]">
          <img class="lstPic" :src="'http://localhost:8090' + images[0].path" alt=""/>
        </div>
        <h3 @click="seeDetails">{{ titre }}</h3>
        <hr>

        <p>Style : <strong class="accColorTxt">{{ style }}</strong></p>
        <p>Difficulté : <strong class="accColorTxt">5.{{ difficulte }}</strong></p>
        <p @click="seeLieuDetails">Lieu : <strong class="accColorTxt cursorPointer">{{ lieu.titre }}</strong></p>

        <br>

        <p>Vote(s) : <strong class="accColorTxt">{{ nbVotes }}</strong></p>
        <star-rating-component :nbStars="nbEtoiles"></star-rating-component>

        <section v-if="hideDescription !== 'true'">
          <hr>
          <h6>Description</h6>
          <p v-if="description.length > 170">{{ description.substring(0, 170) + "..." }}</p>
          <p v-else>{{ description }}</p>
        </section>

        <span></span>
        <span></span>
        <span></span>
      </div>

      <div>
        <div id="btnWrapper">
          <button v-if="showDeleteBtn && this.$store.getters.isAdmin" @click="deleteClimb" type="button"
                  class="btn btn-outline-secondary">Supprimer
          </button>

          <button @click="editGrimpe" type="button" class="btn btn-outline-secondary"
                  v-if="+this.userId === +this.$store.getters.userId || this.$store.getters.isAdmin">Modifier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import starRatingComponent from "@/components/starRatingComponent";


export default {
  name: "grimpeCardComponent",
  props: ["id", "titre", "style", "description", "difficulte", "nbEtoiles", "nbVotes", "images", "lieu", "hideDescription", "userId", "showDeleteBtn"],
  components: {starRatingComponent},
  methods: {
    seeLieuDetails() {
      this.$router.push({name: "lieuDetails", params: {id: this.lieu.id}});
    },
    seeDetails() {
      this.$router.push({name: "grimpeDetails", params: {id: this.id}});
    },
    deleteClimb() {
      alert("lol est supp") // edit : faire supp climb
    },
    editGrimpe() {
      this.$router.push({
        name: "modifierGrimpe",
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

.lstPic {
  width: 100%;
  //height: 167px;
  //object-fit: contain;
  height: 12vw;
  min-height: 167px;
  object-fit: cover;
}

#card {
  padding: 15px;

  p {
    overflow: auto;
    margin: 0;
  }
}

.cardBodyShort {
  min-height: 553px !important;
  width: 100%;
}

#cardBody {
  width: 100%;
  min-height: 553px;

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

  .accColorTxt {
    color: $Darkaccent;
  }

  .cursorPointer {
    cursor: pointer;
  }

  .cursorPointer:hover {
    color: $accent;
  }
}

#ratingDiv {
  display: flex;
  justify-content: space-between;
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
</style>
