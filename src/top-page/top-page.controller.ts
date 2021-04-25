import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { TopPageModule } from "./top-page.module";
import { FindTopPageDto } from "./dto/find-top-page.dto";

@Controller("top-page")
export class TopPageController {

  @Post("create")
  async create(@Body() dto: Omit<TopPageModule, "_id">) {

  }

  @Get(":id")
  async get(@Param('id') id: string) {

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
