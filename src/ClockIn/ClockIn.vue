/**
* @fileOverview 打卡
* @platform WEB
* @author 齐皓
* @date 2020/10/23
*/
<template>
  <div class="lbd-clock-in" @click="clockIn">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LbdClockIn',
  props: {
    lbsKey: {
      type: String,
      required: true
    },
    wx: {
      type: Object,
      required: true
    },
    targetLocation: {
      type: Object,
      validator(targetLocation) {
        return targetLocation.hasOwnProperty('longitude') &&
          targetLocation.hasOwnProperty('latitude')
      }
    },
    //单位m
    distance: {
      type: Number,
      default: 1000
    }
  },
  methods: {
    clockIn() {
      this.$emit('start')
      this.checkPosition(this.targetLocation, this.distance)
        .then(([inside, distance]) => {
          this.$emit('end', inside, distance)
        })
        .catch(e => {
          this.$emit('error', e)
        })
    },
    checkPosition(position, distanceLimit) {
      return new Promise((resolve, reject) => {
        this.wx.getLocation({
          type: 'gcj02',
          success: (res) => {
            const { latitude, longitude } = res
            this.computeDistance(
              `${ latitude },${ longitude }`, `${ position.latitude },${ position.longitude }`
            ).then(distanceResponse => {
              const distance = distanceResponse.result.rows[0].elements.[0].distance || Infinity
              const inside = distance <= distanceLimit
              inside ? resolve([true, distance]) : resolve([false, distance])
            })
          },
          fail: (error) => {
            reject(error)
          }
        })
      })
    },
    jsonp(url) {
      return new Promise((resolve) => {
        window.jsonCallBack = result => resolve(result)
        const jsonp = document.createElement('script')
        jsonp.type = 'text/javascript'
        jsonp.src = `${ url }&callback=jsonCallBack`
        const head = document.getElementsByTagName('head')[0]
        head.appendChild(jsonp)
        setTimeout(() => {
          head.removeChild(jsonp)
        }, 1000)
      })
    },
    computeDistance(locations, targetLocations) {
      return this.jsonp(
        `https://apis.map.qq.com/ws/distance/v1/matrix` +
        `?mode=walking&from=${ locations }&to=${ targetLocations }&key=${ this.lbsKey }&output=jsonp`
      )
    }
  }
}
</script>

<style lang="scss">
.lbd-clock-in {
}
</style>