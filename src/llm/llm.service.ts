import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ollama } from 'ollama';

@Injectable()
export class LLMService {
  public ollama;

  constructor(configService: ConfigService) {
    const url = configService.get<string>('OLLAMA_URL');
    if (!url) {
      throw new Error('env OLLAMA_URL missing');
    }
    this.ollama = new Ollama({
      host: url,
    });
  }
}
