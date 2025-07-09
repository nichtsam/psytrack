import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserId } from 'src/common/decorators/userId.decorator';
import { AddExperienceDto } from './psyche.dto';
import { ApiOperation } from '@nestjs/swagger';
import { PsycheService } from './psyche.service';

@Controller('psyche')
export class PsycheController {
  constructor(private psycheService: PsycheService) {}

  @ApiOperation({
    summary: 'Retrieve all experience records',
    description: 'Fetch all past experiences that triggered emotions',
  })
  @Get('/experiences')
  getExperiences(@UserId() userId: string) {
    return this.psycheService.getAllExperiencesByUserId(userId);
  }

  @ApiOperation({
    summary: 'Create a new experience record',
    description:
      'Add a new record with details of the activating event and associated emotions',
  })
  @Post('/experiences')
  addExperience(@UserId() userId: string, @Body() dto: AddExperienceDto) {
    return this.psycheService.createExperience(userId, dto);
  }
}
