import type { Schema, Attribute } from '@strapi/strapi';

export interface PageLink extends Schema.Component {
  collectionName: 'components_page_links';
  info: {
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'page.link': PageLink;
    }
  }
}
