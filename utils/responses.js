exports.status = (status, values, result,res) => {

    const data = {
        "res_id": status,
        "mess": values,
        "result": result
    }

    res.status(200)
    res.json(data)
    res.end()

}
