class ErrorHandler extends Error {   //es error class k pas har chez hoti ha srf error status code nhi hota 
    //thats why errorHandle ak class bnarhy hn hum , r esmy sare error k pas class bnarhy hn
    //measn extends k andr hum ya btarhe h n k es errorhandler k andr error class k sare funtions hongy , jiki waja sa hum esy use krsky hn 

    constructor(message ,statuscode) {
        super(message);  //super k andr hum es error k message ko pass kr skty hn  , joky parent Error class sa arha ha 
        this.statuscode = statuscode;
    }

}
export const errorMiddleware = (error,req,res,next)=>{   //eeror middleware ma first parameter error hota ha , phir baki normal function k trhan hum req,res,next likhty hn 

    error.statuscode = error.statuscode || 500;  //means status btado agr status code nhi derha to , 500 btado means internal server error
    error.message=error.message || "internal server error";  //means message btado agr message nhi derha to , internal server error btado
    

    if(error.name=="CastError"){
        const message=`Invalid : ${error.path}`;
        error=new ErrorHandler(message,400);
        
    }
    // json web token error 
    if(error.name=="JsonWebTokenError"){
        const message=`json web token is invalid try again `;
        error=new ErrorHandler(message,400);
        
    }

    if(error.name=="TokenExpiredError"){
        const message=`Json web token is expire login again `;
        error=new ErrorHandler(message,400);
        
    }
    if(error.code==11000){
        const message=`Duplicate ${Object.keys(error.keyValue)} entered`;   
        error=new ErrorHandler(message,400);
    }

    return res.status(error.statuscode).json({
        sucess:false ,
        message:error.message,
        error:error

    })
}

export default ErrorHandler ;