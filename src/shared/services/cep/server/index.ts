import Api from "../../api";

class CepApi {
    private cep_api = new Api("cep")

    async getCep(cep: string) {
        return this.cep_api.get(`/ws/${cep}/json/`, {})
    }
}

const cepApi = new CepApi()

export default cepApi