export const errorMiddleware = (err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    if(err.name === "CastError") err.message = "Invalid Id"

    return res.status(statusCode).json({
        success: false,
        message: message
    })
}