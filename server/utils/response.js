

const sendSuccessResponse = (res, result) => {
    return res.json({
        data: {
            ...result
        }
    })
}

const sendFailureResponse = (res, err, fallbackMessage) => {
    return res.status(err.status ?? 500).json({
        error: err.message ?? fallbackMessage
    })
}

module.exports = {
    sendFailureResponse,
    sendSuccessResponse
}