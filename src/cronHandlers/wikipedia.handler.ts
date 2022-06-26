import { DiscordBotClient } from '../clients/discordBot.client';
import { OpenAI } from '../clients/openai.client';
import { getTextChannel, formatDiscordString } from '../util/discord.helper';

export const wikipediaHandler = async (client: DiscordBotClient) => {
    const channel = getTextChannel(process.env.DISCORD_BOT_CHANNEL_ID || '', client);
    console.log('Time for an automated wiki article!');

    const openAiClient = new OpenAI();

    const res = await openAiClient.completePrompt('Say a random wiki article link.\n');

    const answer = formatDiscordString(res.choices[0].text);

    console.log(`Send ${answer.split('\n').join('')}`);

    channel.send(answer);
};
