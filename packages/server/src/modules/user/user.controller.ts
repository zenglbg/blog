import { Controller, Post, Body } from '@nestjs/common'
import { of, Observable } from 'rxjs'


@Controller('user')
export class UserController {

  @Post('register')
  register(@Body() user: {u: any, p: any}): Observable<any[]>
  {
    console.log(user)
    return of([1,2,3,4])
  }
}