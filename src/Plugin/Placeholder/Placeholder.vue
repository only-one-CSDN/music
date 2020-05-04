<template>
  <div class="placeholder">
    <img src="../../assets/images/zanweifu.png">
  </div>
</template>

<script>
export default {
  name: 'Placeholder'
}
</script>

<style scoped lang="scss">
.placeholder{
  width: 200px;
  height: 200px;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  border-radius: 20px;
  img{
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50px;
    left: 50px;
    transform: translate(-50%, -50%);
    animation: occupied 3s linear infinite;
  }
  @keyframes occupied {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
}
</style>
