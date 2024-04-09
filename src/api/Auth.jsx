import axios from "axios"

export const APIClient = () => axios.create({
    baseURL: 'https://test.sku-sku.com',
    headers: {
        'Content-Type': 'application/json',
    }
})
// 테스트 통신 코드