import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ProductModule } from "./product.module";
import { FindProductDto } from "./dto/find-product.dto";

@Controller("product")
export class ProductController {

  @Post("create")
  async create(@Body() dto: Omit<ProductModule, "_id">) {

  }

  @Get(":id")
  async get(@Param("id") id: string) {

  }

  @Delete(":id")
  async delete(@Param("id") id: string) {

  }

  @Patch(":id") //PUT
  async patch(@Param("id") id: string, @Body() dto: ProductModule) {

  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {

  }
}
