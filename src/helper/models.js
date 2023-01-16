import { DataTypes } from 'sequelize';

export default {
    tables:{
        server: {
            guildID: DataTypes.STRING,
            modules: DataTypes.JSON
        },
        streamers: {
            platform: DataTypes.STRING,
            platformID: DataTypes.STRING,
            name: DataTypes.STRING,
            servers: DataTypes.JSON,
            live: DataTypes.BOOLEAN
        },
        verification: {
            guildID: DataTypes.STRING,
            userID: DataTypes.STRING,
            captcha: DataTypes.STRING
        }
    },
    templates:{
        modules: {
            notifier: {
                enabled: false,
                streamers:{},
                channel: ""
            },
            verification: {
                enabled: false,
                roleID: ""
            }
        }
    }
}