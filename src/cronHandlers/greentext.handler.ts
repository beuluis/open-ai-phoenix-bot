import { MessageEmbed } from 'discord.js';
import { DiscordBotClient } from '../clients/discordBot.client';
import { OpenAI } from '../clients/openai.client';
import { getTextChannel, formatDiscordString } from '../util/discord.helper';

export const greentextHandler = async (client: DiscordBotClient) => {
    const channel = getTextChannel(process.env.DISCORD_BOT_CHANNEL_ID || '', client);
    console.log('Time for an automated greentext!');

    const entryText = '> be me\n';

    const openAiClient = new OpenAI();

    const res = await openAiClient.completePrompt(`write a 4chan greentext\n${entryText}`);

    const answer = formatDiscordString(entryText + res.choices[0].text);

    console.log(`Send ${answer.split('\n').join('')}`);

    const greentextEmbed = new MessageEmbed()
        .setColor('#7f9739')
        .setTitle('randomgreentext.png')
        .setDescription(answer);

    channel.send({ embeds: [greentextEmbed] });
};
