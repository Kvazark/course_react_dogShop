const dotenv = require('dotenv');
dotenv.config({ path: './.env.deploy' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPOSITORY, DEPLOY_REF } =
	process.env;

module.exports = {
	deploy: {
		production: {
			user: DEPLOY_USER,
			host: DEPLOY_HOST,
			ref: DEPLOY_REF,
			repo: DEPLOY_REPOSITORY,
			path: DEPLOY_PATH,
			'pre-deploy-local': `scp -Cr .env  ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current`,
			'post-deploy':
				'pwd && docker compose down && docker compose up -d --build ',
		},
	},
};
