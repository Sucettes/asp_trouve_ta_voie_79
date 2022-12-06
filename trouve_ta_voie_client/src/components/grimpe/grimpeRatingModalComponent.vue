<template>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="ratingModalLabel">{{ title }}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <p>Indiquer le nombre d'étoiles que vous voulez attribué.</p>

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

        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Sauvegarder évaluation</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "grimpeRatingModalComponent",
  props: ["title"],
  data() {
    return {
      stars: 0
    }
  },
  methods: {
    changeStars(star) {
      this.stars = star;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';


#starsContainer {
  display: flex;
  justify-content: center;
  //align-items: center;
  //margin: 0 !important;
  //width: auto !important;

  svg {
    fill: $orange;

    :hover {
      fill: $DarkOrange;
    }
  }
  //
  //p {
  //  font-size: 0.8rem;
  //  text-align: center;
  //  vertical-align: center;
  //  margin-bottom: -4px;
  //  margin-left: 4px;
  //}
}
</style>
