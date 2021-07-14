import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { CreateCatDto } from '../dtos';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  async findAll(@Res({ passthrough: true }) res: Response): Promise<any> {
    res.status(HttpStatus.OK);
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto ) {
    return 'This action adds a new cat';
  }
}