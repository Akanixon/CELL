import { SapphireClient, LogLevel, container} from '@sapphire/framework';
import '@sapphire/plugin-api/register';
import { GatewayIntentBits, Partials, OAuth2Scopes } from 'discord.js';
import config from '../config.json' assert { type: 'json' };
import { Sequelize, Model, DataTypes } from 'sequelize';
container.sequelize = new Sequelize(config.planetscale);
container.sequelize.authenticate();
const client = new SapphireClient({
    defaultPrefix: config.prefix,
    caseInsensitiveCommands: true,
    logger: {
        level: LogLevel.Debug
    },
    shards: 'auto',
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ],
    partials: [Partials.Channel],
    loadMessageCommandListeners: false,
    listenOptions: {
        port: 4000,
        host: "localhost"
    }
});
client.login(config.token);