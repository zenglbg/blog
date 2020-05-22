import { Controller, Get, HttpCode, Header, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Controller()
export class ExampleController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(201)
  @Header('Cache-Control', 'none33')
  @Redirect('/api/index')
  getHello(): {} {
    return this.appService.getHello();
    return {
      url: 'https://qq.com',
    };
  }
  @Get('index')
  @HttpCode(201)
  @Header('Cache-Control', 'none33')
  getrxjs(): any {
    return this.appService.getHello();
    return interval().pipe(
      map(
        item =>
          item +
          `
        <h1>你好，世界</h1>
      `,
      ),
      take(5),
    );
    // .subscribe(console.log);
    return of([1, 2, 3, 4, 5]).pipe(map(item => item.map(i => i + 2000)));
  }
}
