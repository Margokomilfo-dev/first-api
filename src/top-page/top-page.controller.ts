import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { TopPageModule } from "./top-page.module";
import { FindTopPageDto } from "./dto/find-top-page.dto";
import { ConfigService } from "@nestjs/config";

@Controller("top-page")
export class TopPageController {
  constructor(private readonly configService: ConfigService){}

  @Post("create")
  async create(@Body() dto: Omit<TopPageModule, "_id">) {

  }

  @Get("get/:alias")
  async get(@Param('alias') alias: string) {
    // this.configService.get('TEST')
  }

  @Delete(":id")
  async delete(@Param('id') id: string) {

  }

  @Patch(":id") //PUT
  async patch(@Param('id') id: string, @Body() dto: TopPageModule) {

  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {

  }
}
