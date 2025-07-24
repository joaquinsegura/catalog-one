import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'variante',
  title: 'Color Variant',
  type: 'object', 
  fields: [
    defineField({
      name: 'color',
      title: 'Color',
      type: 'reference',
      to: [{type: 'colorProducto'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagen',
      title: 'Image for this Color',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'color.nombre', 
      media: 'imagen',
    },
    prepare({ title, media }) {
      return {
        title: title || 'No color assigned',
        media: media,
      }
    },
  },
})