import request from '@/utils/request'

const api_name1 = '/orderservice/order'
const api_name2 = '/orderservice/paylog'

export default {
    // 生成订单
    createOrderApi(courseId) {
        return request({
            url: `${api_name1}/createOrder/${courseId}`,
            method: 'post'
        })
    },

    // 根据订单号查询订单信息
    findOrderInfoByIdApi(orderNo) {
        return request({
            url: `${api_name1}/findOrderInfoBy/${orderNo}`,
            method: 'post',
        })
    },

    // 根据用户id 课程 id 获取订单信息
    getOrderInfoApi(memberId, courseId) {
        return request({
            url: `${api_name1}/findOrderStatusBy/${memberId}/${courseId}`,
            method: 'get',
        })
    },

    // 生成微信支付二维码接口
    createQrCodeApi(orderNo) {
        return request({
            url: `${api_name2}/createQrCode/${orderNo}`,
            method: 'get',
        })
    },

    // 获取支付状态
    getPayStatusApi(orderNo) {
        return request({
            url: `${api_name2}/getPayStatus/${orderNo}`,
            method: 'get',
        })
    },


}