import {defineField, defineType} from 'sanity'
import React from 'react'

export default defineType({
  name: 'colorProducto',
  title: 'Color',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Color Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'valorHex',
      title: 'Color value',
      type: 'color',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'valorHex.hex', 
    },
    prepare({ title, subtitle }) {
      const colorSwatch = React.createElement('div', {
        style: {
          width: '24px',
          height: '24px',
          backgroundColor: subtitle,
          borderRadius: '50%',
          border: '1px solid #888',
        },
      });

      return {
        title: title,
        subtitle: subtitle,
        media: colorSwatch,
      }
    },
  },
})