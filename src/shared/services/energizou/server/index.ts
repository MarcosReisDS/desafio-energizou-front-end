import Api from "../../api";

class EnergizouApi {
    private energizou_api = new Api("energizou")

    async listCompanies() {
        return this.energizou_api.get("/companies", {})
    }

    async getCompanyByCnpj(company_cnpj: string) {
        const regex = /[^a-zA-Z0-9\s]/g;
        company_cnpj = company_cnpj.replace(regex, '')

        return this.energizou_api.get("/companies", { company_cnpj })
    }

    async getCompanyByClientName(client_name: string) {
        return this.energizou_api.get("/companies", { client_name })
    }

    async createCompany(company: CompanyType) {
        const regex = /[^a-zA-Z0-9\s]/g;
        company['cnpj'] = company.cnpj.replace(regex, '')
        company['phone'] = company.phone.replace(regex, '').replace(" ", "")

        return this.energizou_api.post("/companies", { ...company, is_admin: 0 })
    }

    async updateCompany(company: CompanyType) {
        console.log(company)
        const regex = /[^a-zA-Z0-9\s]/g;
        company['cnpj'] = company.cnpj.replace(regex, '')
        company['phone'] = company.phone.replace(regex, '').replace(" ", "")
        // @ts-ignore
        return this.energizou_api.put(`/companies/${company?.id}`, { ...company, is_admin: 0 })
    }

    async deleteCompany(company_id: number) {
        return this.energizou_api.delete(`/companies/${company_id}`)
    }
}

const energizouApi = new EnergizouApi()

export default energizouApi