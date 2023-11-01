class EnergizouClient {
    private data: CompanyType

    constructor(energizouData: CompanyType) {
        this.data = energizouData
    }

    get data_energizou() {
        return this.data
    }

    get client_name() {
        return this.data.client_name
    }

    get password() {
        return this.data.password
    }

    get name_company() {
        return this.data.name_company
    }

    get cnpj() {
        return this.data.cnpj
    }

    get zip_code() {
        return this.data.zip_code
    }

    get address() {
        return this.data.address
    }

    get number() {
        return this.data.number
    }

    get phone() {
        return this.data.phone
    }

    get email() {
        return this.data.email
    }

    get is_admin() {
        return this.data.is_admin
    }
}