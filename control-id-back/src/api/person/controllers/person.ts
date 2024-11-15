/**
 * person controller


import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::person.person');
 */


import { factories } from '@strapi/strapi'
export default factories.createCoreController('api::person.person', ({ strapi }): {} => ({
	async getName (ctx: any){
        const name = ctx.request.params.name 
        ctx.body = `React Lab - ${name}`
    }
}));
