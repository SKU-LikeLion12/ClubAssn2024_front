import axios from "axios"

export const APIClient = () => axios.create({
    baseURL: 'https://puzzle.sku-sku.com:8080/swagger-ui/index.html#',
    headers: {
        'Content-Type': 'application/json',
    }
})
// 테스트 통신 코드