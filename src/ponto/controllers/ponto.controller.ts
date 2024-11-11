import { Request, Response, NextFunction } from "express"
import { PontoInterface } from "../interfaces/ponto.interface" 
import { PontoService } from "../services/ponto.service"


// Create
export const pontoAddControlle = async (req: Request, res: Response) => {
    const { usuario_id, ...pontoData } = req.body; // Extrai `usuario_id` e os demais dados de `ponto`
    const ponto: PontoInterface & { usuario_id: number } = {
        ...pontoData,
        usuario_id: Number(usuario_id)  // Assegura que `usuario_id` é um número
    };

    const service = new PontoService();
    const response = await service.addPonto(ponto);

    if (!response.success) {
        res.status(400).json(response);
    } else {
        res.status(200).json(response);
    }
};


//Read
export const pontoSearchController = async (req: Request, res: Response) => {
    //ajustar para realizar o search
    const ponto: any = req.query
    const service = new PontoService()
    const response = await service.searchPonto(ponto)
    if (response.success == false) {
        res.status(400).json(response)
    } else {
        res.status(200).json(response)
    }
}

//edit
export const pontoEditController = async (req: Request, res: Response) => {
    const pontoId: number = parseInt(req.params.id)
    const ponto: PontoInterface = req.body

    const service = new PontoService()
    const response = await service.editPonto(pontoId, ponto)
    if (response.success == false) {
        res.status(400).json(response)
    } else {
        res.status(200).json(response)
    }
}

//delte
export const pontoDeleteController = async (req: Request, res: Response) => {
    const pontoId: number = parseInt(req.params.id)

    const service = new PontoService()
    const response = await service.deletePonto(pontoId)
    if (response) {
        res.status(response.status).json({
            sucess: response.success,
            menssagem: response.message
        })
    } else {
        res.status(400).json({
            sucess: false,
            menssagem: response
        })
    }
}