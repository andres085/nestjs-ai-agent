import { Injectable } from '@nestjs/common';
import { streamText } from 'ai';
import { google } from '@ai-sdk/google'

@Injectable()
export class AiAgentService {
  async analyze() {
    const result = streamText({
      model: google('gemini-2.5-flash'),
      prompt: 'Invent a new holiday and describe its traditions.',
    });

    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
    }

    console.log();
    console.log('Token usage:', await result.usage);
    console.log('Finish reason:', await result.finishReason);
  }
}
