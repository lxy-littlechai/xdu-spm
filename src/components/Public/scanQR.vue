<template>
  <div class="main-mine">
  <div class="stream">
    <qr-stream @decode="onDecode" class="mb" >
      <div style="color: red;" class="frame"></div>
    </qr-stream>
  </div>
  <div class="result">
    Result: {{data}}
  </div>
  </div>
</template>

<script lang="js">
import { QrStream, QrCapture, QrDropzone } from 'vue3-qr-reader'
import { defineComponent, ref, Ref, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Qrcode3',
  components: {
    QrStream,
    //QrCapture,
    //QrDropzone
  },
  setup() {
    const state = reactive({
      data: null
    })
    const onDecode = (data) => {
      state.data = data
    }
    return {
      ...toRefs(state),
      onDecode,
    }
  }
})
</script>
<style lang="scss" scoped>
.main-mine {
  background: #ccc;
}
</style>