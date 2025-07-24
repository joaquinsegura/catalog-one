import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'categoria',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'nombre',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
