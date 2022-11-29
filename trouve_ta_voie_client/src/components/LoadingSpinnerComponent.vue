<template>
  <div id="spinnerBack"></div>
  <div class="lds-default" id="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinnerComponent"
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

#spinnerBack {
  z-index: 90;
  background-color: rgba(0, 0, 0, 0.09);
  width: calc(100vw);
  min-height: calc(100vh + 56px);
  position: fixed;
  top: 0;

}
#spinner {
  position: fixed;
  top:50%;
  left: calc(50vw - 40px);
  z-index: 100;
}

.lds-default {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-default div {
  position: absolute;
  width: 7px;
  height: 7px;
  background: $green;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}

.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 37px;
  left: 66px;
}

.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 22px;
  left: 62px;
}

.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 11px;
  left: 52px;
}

.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 7px;
  left: 37px;
}

.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 11px;
  left: 22px;
}

.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 22px;
  left: 11px;
}

.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 37px;
  left: 7px;
}

.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 52px;
  left: 11px;
}

.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 62px;
  left: 22px;
}

.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 66px;
  left: 37px;
}

.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 62px;
  left: 52px;
}

.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 52px;
  left: 62px;
}

@keyframes lds-default {
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
