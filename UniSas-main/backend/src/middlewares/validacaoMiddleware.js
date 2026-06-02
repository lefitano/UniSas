export function validarCampos(campos) {
    return (req, res, next) => {
        const faltando = campos.filter(campo => !req.body[campo])
        if (faltando.length > 0){
            return res.status(400).json({
                erro: `Campos obrigatórios faltando :  ${faltando.join(',')} `
            })
        }
        next()
    }
}