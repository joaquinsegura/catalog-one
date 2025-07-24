import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'lente',
  title: 'Lens',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Model Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL-friendly)',
      type: 'slug',
      options: {
        source: 'nombre',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'variantesDeColor',
      title: 'Color Variants',
      type: 'array',
      of: [{ type: 'variante' }], 
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'categorias',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'categoria'}]
        }
      ]
    }),
    defineField({
      name: 'material',
      title: 'Frame Material',
      type: 'string',
    }),
    defineField({
      name: 'tipoDeLente',
      title: 'Lens Type (e.g. Polarized, UV400)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      media: 'variantesDeColor.0.imagen', 
    },
  },
})