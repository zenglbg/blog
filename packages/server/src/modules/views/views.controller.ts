import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller()
export class ViewsController {

  
  @Render('Index')
  @Get()
  public index(@Query('name') name?: string) {
    return { name };
  }
}
