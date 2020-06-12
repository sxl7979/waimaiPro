<template>
  
    <router-view></router-view>
  
</template>

<script>

export default {
  
};
</script>

<style lang="less">
body,html{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  
  user-select: none;
}
.login-input {
    .el-input__inner{
      background: rgba(0, 0, 0, .3);
      color: #fff;
    
    }
    ::-webkit-input-placeholder{
      color: #fff;
      font-size: 20px ;
    }
    line-height: 40px;
    margin-bottom: 20px;
    
  }
</style>