import {JwtService} from '@nestjs/jwt';


export class AuthService {
    constructor(  private jwtService: JwtService) {
    }
  async  getJwtUser(jwt: string)  {

      return await this.jwtService.verify(jwt)
}

}