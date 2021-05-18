import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: myMongoString(configService),
		...getMongoOptions()
	};
};

const myMongoString = (configService: ConfigService) => configService.get('MONGO_STRING')


//from teacher
const getMongoString = (configService: ConfigService) =>
	'mongodb://' +
	configService.get('MONGO_HOST') +
	':' +
	configService.get('MONGO_PORT') +
	'/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'


const getMongoOptions = () => ({
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});