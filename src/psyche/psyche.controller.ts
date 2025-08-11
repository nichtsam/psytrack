import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserId } from '#src/common/decorators/userId.decorator';
import { PsycheService } from './psyche.service';
import { CreateVibeDto } from './dto/create-vibe';
import { CreateExperienceDto } from './dto/create-experience';
import { UpdateVibeDto } from './dto/update-vibe';
import { UpdateExperienceDto } from './dto/update-experience';

@Controller('psyche')
export class PsycheController {
  constructor(private psycheService: PsycheService) {}

  @Get('/vibes')
  getVibes(@UserId() userId: string) {
    return this.psycheService.getVibes(userId);
  }

  @Get('/experiences')
  getExperiences(@UserId() userId: string) {
    return this.psycheService.getExperiences(userId);
  }

  @Get('/vibes/:id')
  getVibeById(@UserId() userId: string, @Param('id') vibeId: string) {
    return this.psycheService.getVibeById(userId, vibeId);
  }

  @Get('/experiences/:id')
  getExperienceById(
    @UserId() userId: string,
    @Param('id') experienceId: string,
  ) {
    return this.psycheService.getExperienceById(userId, experienceId);
  }

  @Post('/vibes')
  createVibe(@UserId() userId: string, @Body() dto: CreateVibeDto) {
    return this.psycheService.createVibe(userId, dto);
  }

  @Post('/experiences')
  createExperience(@UserId() userId: string, @Body() dto: CreateExperienceDto) {
    return this.psycheService.createExperience(userId, dto);
  }

  @Patch('/vibes/:id')
  updateVibe(
    @UserId() userId: string,
    @Param('id') vibeId: string,
    @Body() dto: UpdateVibeDto,
  ) {
    return this.psycheService.updateVibeValues(userId, vibeId, dto);
  }

  @Patch('/experiences/:id')
  updateExperience(
    @UserId() userId: string,
    @Param('id') experienceId: string,
    @Body() dto: UpdateExperienceDto,
  ) {
    return this.psycheService.updateExperienceDetails(
      userId,
      experienceId,
      dto,
    );
  }
}
