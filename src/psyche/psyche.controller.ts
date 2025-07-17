import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserId } from '#src/common/decorators/userId.decorator';
import {
  AddExperienceDto,
  ParseStoryDto,
  UpdateExperienceDto,
} from './psyche.dto';
import { ApiOperation } from '@nestjs/swagger';
import { PsycheService } from './psyche.service';

@Controller('psyche')
export class PsycheController {
  constructor(private psycheService: PsycheService) {}

  @Get('/events')
  @ApiOperation({
    summary: 'Retrieve All Psyche Events',
    description:
      'Fetch all past events that triggered emotions or affected mental state',
  })
  getPsycheEvents(@UserId() userId: string) {
    return this.psycheService.getAllPsycheEventsByUserId(userId);
  }

  @Post('/experiences')
  @ApiOperation({
    summary: 'Create New experience',
    description:
      'Creates a new experience entry associated with the current user.',
  })
  addExperience(@UserId() userId: string, @Body() dto: AddExperienceDto) {
    return this.psycheService.createExperience(userId, dto);
  }

  @Post('/experiences/:id')
  @ApiOperation({
    summary: 'Update Existing Experience',
    description:
      'Updates the experience record identified by the given ID with new data.',
  })
  updateExperience(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.psycheService.updateExperience(id, dto);
  }

  @Post('/nlp/experience/parse/activating')
  @ApiOperation({
    summary: 'Parse Activating Event - user experience narrative',
    description:
      'Analyze a user’s natural language description of an activating event and convert it into structured data.',
  })
  parseExperienceActivatingStory(@Body() dto: ParseStoryDto) {
    return this.psycheService.parseExperienceActivatingStory(dto);
  }

  @Post('/nlp/experience/parse/coping')
  @ApiOperation({
    summary: 'Parse Coping Behavior -  user experience narrative',
    description:
      'Analyze a user’s natural language description of an coping behavior and convert it into structured data.',
  })
  parseExperienceCopingStory(@Body() dto: ParseStoryDto) {
    return this.psycheService.parseExperienceCopingStory(dto);
  }

  @Post('/nlp/experience/parse/post')
  @ApiOperation({
    summary: 'Parse Post Feeling - user experience narrative',
    description:
      'Analyze a user’s natural language description of an post feeling and convert it into structured data.',
  })
  parseExperiencePostStory(@Body() dto: ParseStoryDto) {
    return this.psycheService.parseExperiencePostStory(dto);
  }
}
