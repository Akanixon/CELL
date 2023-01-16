import { Command, container } from '@sapphire/framework';
import models from '../helper/models.js';
import {Model, Sequelize} from 'sequelize';
import Captcha from '@haileybot/captcha-generator';
export class SlashCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Verifies the user as human'
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption(options => 
            options.setName('code').setDescription('Enter your captcha code')
            );
    );
  }

  async chatInputRun(interaction) {
    const sequelize = container.sequelize;
	const code = interaction.options.getString('code');
	class verifyQueue extends Model{};
	verifyQueue.init(models.tables.verification,{sequelize, modelName: "verification"});

	if(interaction.member._roles.includes("936636920224694343")) {
		
		return interaction.reply({
			content:"**You are already verified!**"
		});
	}
	if (!code) {
		const captcha = new Captcha();
		const attachment = new AttachmentBuilder(Buffer.from(captcha.dataURL.split(",")[1], 'base64'), { name: 'captcha.jpeg' });
		interaction.reply({
			content: "**Enter the text shown in the image below:**",
			files: [attachment],
			ephemeral: true,
			components: [
				{
				  type: 1,
				  components: [
					{
					  style: 3,
					  label: `Verify`,
					  custom_id: `verify*${interaction.user.id}`,
					  disabled: false,
					  type: 2
					}
				  ]
				}
			  ]
		});
		await verifyQueue.upsert({
			guildID:`${interaction.guildId}`,
			userID:`${interaction.user.id}`,
			captcha:`${captcha.value}`
		},{
			where:{
				guildID:`${interaction.guildId}`,
				userID:`${interaction.user.id}`
			}
		});

	} else {
		const result = await verifyQueue.findOne({where:{guildID:`${interaction.guildId}`,userID:`${interaction.user.id}`}});
		if (result) {
			if (result.dataValues.captcha == code) {
				
				const member = interaction.guild.members.cache.get(interaction.user.id);
				const role = interaction.guild.roles.cache.find(r => r.id == "936636920224694343");
				await member.roles.add(role);

				interaction.reply({
					content: "Verification Successful",
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "Verification failed: Please run the command again",
					ephemeral: true
				});
			}
			await result.destroy();
		} else {
			interaction.reply({
				content: "There is no pending verification, please run the verification command again",
				ephemeral: true
			});
		}
	}
  }
}