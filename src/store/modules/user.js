import requestNoToken from '@/utils/requestNoToken.js'
import request from '@/utils/request.js'
import { setCookie, getCookie, delCookie } from '@/utils/util.js';
const state = {
    tokenData:{},
    ifLogOutSuccess:{},
    ifSuccessEditPhoto:{},
    loginRoleInfoData:{},
    ifSuccessChangeSkin:{},
}

const mutations = {
    POSTLOGIN(state,tokenData){
        state.tokenData = tokenData
    },
    POSTLOGOUT(state,ifLogOutSuccess){
        state.ifLogOutSuccess = ifLogOutSuccess
    },
    PUTLOGINEDITPHOTO(state,ifSuccessEditPhoto){
        state.ifSuccessEditPhoto = ifSuccessEditPhoto
    },
    GETLOGINROLEINFO(state,loginRoleInfoData){
        state.loginRoleInfoData = loginRoleInfoData
    },
    POSTCHANGEMYSKIN(state,ifSuccessChangeSkin){
        state.ifSuccessChangeSkin = ifSuccessChangeSkin
    }
}

const actions = {
    // 提交登录信息获取token
    async postLogin({commit},val){
        const tokenData = await requestNoToken.post(`/login`,val)
        setCookie("name", tokenData.data.name)
        setCookie("id", tokenData.data.id)
        setCookie("token", tokenData.data.access_token)
        commit('POSTLOGIN',tokenData)
    },
    // 退出登录，清除token
    async postLogout({commit}){
        const ifLogOutSuccess = await request.post(`/sys/logout`)
        commit('POSTLOGOUT',ifLogOutSuccess)
    },
    // 上传头像
    async putLoginEditPhoto({ commit }, val) {
        const ifSuccessEditPhoto = await request.put(`/sys/user/photo`, val);
        commit("PUTLOGINEDITPHOTO", ifSuccessEditPhoto);
    },
    // 获取用户的详情
    async getLoginRoleInfo({ commit }) {
        const loginRoleInfoData = await request.get(`/sys/user/info`);
        commit("GETLOGINROLEINFO", loginRoleInfoData);
    },

    // 修改皮肤
    async postChangeMySkin({ commit }, val) {
        const ifSuccessChangeSkin = await request.post(`/sys/user/skin?skin=${val}`);
        commit("POSTCHANGEMYSKIN", ifSuccessChangeSkin);
    },
}

export default {
  state,
  mutations,
  actions
}

