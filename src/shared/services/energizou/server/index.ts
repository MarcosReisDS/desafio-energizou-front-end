import { getCookie } from "../../../utils/cookies";
import Api from "../../api";

class EnergizouApi {
    private energizou_api = new Api("energizou")

    async listCompanies() {
        const profile = getCookie('profile')

        let data = await this.energizou_api.get("/companies", {})

        data = data.filter((company: CompanyType) => company?.id !== profile?.id)

        return data
    }

    async getCompanyByCnpj(company_cnpj: string) {

        return this.energizou_api.get("/companies", { company_cnpj })
    }

    async getCompanyByClientName(client_name: string) {
        return this.energizou_api.get("/companies", { client_name })
    }

    async getCompanyById(id: string) {
        console.log(id)
        return this.energizou_api.get("/companies", { id })
    }

    async login(username: string, password: string) {
        return this.energizou_api.get("/companies/login", { username, password })
    }

    async createCompany(company: CompanyType) {

        return this.energizou_api.post("/companies", { ...company, is_admin: 0, username: "marcos" })
    }

    async updateCompany(company: CompanyType) {
        const regex = /[^a-zA-Z0-9\s]/g;
        company['cnpj'] = company.cnpj.replace(regex, '')
        company['phone'] = company.phone.replace(regex, '').replace(" ", "")
        // @ts-ignore
        return this.energizou_api.put(`/companies/${company?.id}`, { ...company, is_admin: 0, username: "marcos" })
    }

    async deleteCompany(company_id: number) {
        return this.energizou_api.delete(`/companies/${company_id}`)
    }
}

const energizouApi = new EnergizouApi()

export default energizouApi