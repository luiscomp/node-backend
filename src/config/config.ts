let extension = 'js'
if(process.env.NODE_ENV == 'development') extension = 'ts';

module.exports = (): any => require(`./env/${process.env.NODE_ENV}.env.${extension}`)