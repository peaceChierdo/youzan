<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item " 
        v-for="list in lists"
        :key="list.id"
        :class="{'address-item-default': list.isDefault}"
      >
        <div class="address-title">{{list.name}}&nbsp;&nbsp;{{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit" @click="toEdit(list)">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
          :to="{name: 'editAddress', query:{type: 'add'}}">
            新增地址
        </router-link>
    </div>
  </div>	
</template>

<script>
  import Address from 'js/addressService.js'
  import axios from 'axios'
  import url from 'js/api.js'

	export default {
    // data() {
    //   return{
    //     lists: null
    //   }
    // },
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    created() {
      // Address.list().then(res => {
      //   this.lists = res.data.lists
      // })
      // axios.get(url.addressLists).then(res => {
      //   this.lists = res.data.lists
      // })
      if(!this.lists){
        this.$store.dispatch('getLists')
      }
    },
		methods: {
			toEdit(list) {
				// this.$router.push({path: '/address/editAddress'})
        this.$router.push({name: 'editAddress',query:{
          type: 'edit',
          instance: list
        }})
			}
		}
	}
</script>