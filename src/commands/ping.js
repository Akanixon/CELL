import { Command, container } from '@sapphire/framework';
import models from '../helper/models.js';
import {Model} from 'sequelize';
export class SlashCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Sends a Pong!'
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
    );
  }

  async chatInputRun(interaction) {
    class verifyQueue extends Model{};
    const sequelize = container.sequelize;
	verifyQueue.init(models.tables.verification,{sequelize, modelName: "verification"});

    const _result = await verifyQueue.findAll();
    console.log(_result);
    interaction.reply("Pong!");
  }
}