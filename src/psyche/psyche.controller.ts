import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserId } from '#src/common/decorators/userId.decorator';
import { AddExperienceDto, ParseExperienceStoryDto } from './psyche.dto';
import { ApiOperation } from '@nestjs/swagger';
import { PsycheService } from './psyche.service';

@Controller('psyche')
export class PsycheController {
  constructor(private psycheService: PsycheService) {}

  @ApiOperation({
    summary: 'Retrieve all psyche events records',
    description:
      'Fetch all past events that triggered emotions or affected mental state',
  })
  @Get('/experiences')
  getPsycheEvents(@UserId() userId: string) {
    return this.psycheService.getAllPsycheEventsByUserId(userId);
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

  @ApiOperation({
    summary: 'Parse user experience narrative',
    description:
      'Analyze a user’s natural language description of an experience and convert it into structured data following the ExperienceSchema.',
  })
  @Post('/nlp/experience/parse')
  parseExperienceStory(@Body() dto: ParseExperienceStoryDto) {
    return this.psycheService.parseExperienceStory(dto);
  }
}
