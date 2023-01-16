import { methods, Route } from '@sapphire/plugin-api';

export default class MyRoute extends Route {
  constructor(context, options) {
		super(context, {
			...options,
			route: '/api/guild/:guildID/user/:userID'
		});
	}
  [methods.GET](_request, response) {
		response.json(_request.params);
	}
}