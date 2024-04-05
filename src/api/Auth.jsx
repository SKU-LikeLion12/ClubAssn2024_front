import axios from "axios"

export const APIClient = () => axios.create({
    baseURL: 'https://test.sku-sku.com',
    headers: {
        'Content-Type': 'application/json',
    }
})

// 이 함수로 통신하는 중 