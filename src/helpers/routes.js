// const api = "https://bodegalojadevinhos.com.br/menu-rest-api/public/index.php"
const api = "http://localhost:8000/api"
const apiAuthBase = api + "/auth"

export const authRoutes = {
    LoginData: apiAuthBase + "/me",
    Login: apiAuthBase + "/login",
    Logout: apiAuthBase + "/logout"
}