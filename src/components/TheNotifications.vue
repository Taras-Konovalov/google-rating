<template>
  <notifications
    classes="custom-notification rounded-lg"
    :duration="2000"
    :width="350"
    position="top right"
  />
</template>

<style lang="scss">
.custom-notification {
  // styling
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 12px;
  color: #000000;

  // default (blue)
  background: #F5F7FB;
  border: 1px solid #5C82CC;
  color: #00339A;

  // types (green, amber, red)
  &.success {
    background: #EDFCF5;
    border: 1px solid #88D1AC;
    color: #47B27D;
  }

  &.warn {
    background: #FFF9F4;
    border: 1px solid #FFBA75;
    color: #FF8C1A;
  }

  &.error {
    background: #FFF5F5;
    border: 1px solid #FA9696;
    color: #E75C5C;
  }
}
</style>