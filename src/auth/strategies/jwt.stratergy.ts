// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt } from "passport-jwt";
// import { jwtConstants } from "../constants/constant";
// import { constructor, Request } from "express";

// @Injectable()
// export class jwtStratergy extends PassportStrategy(stratergy){
//     constructor(){
//         constructor(){
//             super({
//                 jwtFromRequest: ExtractJwt.fromExtractors([
//                     jwtStratergy.extractJWTFromCookie,
//                 ]),
//                 ignoreExpiration:false,
//                 secretOrKey : jwtConstants.secret
//             })
//         }
//     }

//     private static extractJWTFromCookie(req:Request):string | null {
//         if(req.cookies && req.cookies.access_token){
//             return req.cookies.access_token
//         }
//         return null
//     }

//     async validate(payload:any){
//         return {userID = payload.sub , email:payload.email}
//     }

// }



// // import { Request } from 'express';

// // @Injectable()
// // export class JwtStrategy extends PassportStrategy(Strategy) {
// //   constructor() {
// //   constructor() {
// //     super({
// //       jwtFromRequest: ExtractJwt.fromExtractors([
// //         JwtStrategy.extractJWTFromCookie,
// //       ]),
// //       ignoreExpiration: false,
// //       secretOrKey: jwtConstants.secret,
// //     });
// //   }
// //   }

// //   private static extractJWTFromCookie(req: Request): string | null {
// //     if (req.cookies && req.cookies.access_token) {
// //       return req.cookies.access_token;
// //     }
// //     return null;
// //   }

// //   async validate(payload: any) {
// //     return { userId: payload.sub, username: payload.username };
// //   }
// // }

