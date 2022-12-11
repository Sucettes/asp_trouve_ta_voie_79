<template>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="ratingModalLabel">{{ titre }}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Ferme grimpe évaluation"></button>
      </div>

      <div class="modal-body">
        <p>Indiquer le nombre d'étoiles que vous voulez attribuer.</p>

        <div id="starsContainer">
          <div @click="changeStars(1)">
            <svg v-if="stars === 0" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                 class="bi bi-star"
                 viewBox="0 0 16 16">
              <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>

            <svg v-if="stars >= 1" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                 class="bi bi-star-fill"
                 viewBox="0 0 16 16">
              <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </div>
          <div @click="changeStars(2)">
            <svg v-if="stars < 2" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                 class="bi bi-star"
                 viewBox="0 0 16 16">
              <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>

            <svg v-if="stars >= 2" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                 class="bi bi-star-fill"
                 viewBox="0 0 16 16">
              <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </div>
          <div @click="changeStars(3)">
            <svg v-if="stars < 3" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                 class="bi bi-star"
                 viewBox="0 0 16 16">
              <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>

            <svg v-if="stars >= 3" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                 class="bi bi-star-fill"
                 viewBox="0 0 16 16">
              <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </div>
          <div @click="changeStars(4)">
            <svg v-if="stars < 4" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                 class="bi bi-star"
                 viewBox="0 0 16 16">
              <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>

            <svg v-if="stars >= 4" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                 class="bi bi-star-fill"
                 viewBox="0 0 16 16">
              <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </div>
          <div @click="changeStars(5)">
            <svg v-if="stars < 5" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                 class="bi bi-star"
                 viewBox="0 0 16 16">
              <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>

            <svg v-if="stars === 5" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                 class="bi bi-star-fill"
                 viewBox="0 0 16 16">
              <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </div>
        </div>

        <p v-if="!starsEstValide" class="error txt-center">Il faut avoir 1 à 5 étoile(s) !</p>

        <div class="btnWrapper">
          <button aria-label="Sauvegarder évaluation" type="button" class="btn btn-primary mt-3" @click="saveStars"
                  :disabled="isLoading">Sauvegarder évaluation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "grimpeRatingModalComponent",
  props: ["titre"],
  emits: ["saveRating"],
  data() {
    return {
      stars: 0,
      starsEstValide: true,
    };
  },
  methods: {
    changeStars(star) {
      this.stars = star;
      this.checkSiStarsEstValide();
    },
    checkSiStarsEstValide() {
      this.starsEstValide = +this.stars >= 1 && +this.stars <= 5;
    },
    saveStars() {
      this.checkSiStarsEstValide();

      if (this.starsEstValide) {
        this.$emit("saveRating", this.stars);
        this.stars = 0;
      }
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';


#starsContainer {
  display: flex;
  justify-content: center;

  svg {
    fill: $orange;

    :hover {
      fill: $DarkOrange;
    }
  }
}

.btnWrapper {
  display: flex;
  justify-content: end;
}

.error {
  color: $red;
  font-size: 0.9rem;
}

.txt-center {
  text-align: center;
}
</style>
