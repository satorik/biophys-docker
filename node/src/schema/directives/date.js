import formatDate from 'dateformat'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { GraphQLString, defaultFieldResolver } from 'graphql'

const dateTypeDef = `
  directive @date(format: String,
    defaultFormat: String = "mmmm d, yyyy"
  ) on FIELD_DEFINITION
`

class DateFormatDirective extends SchemaDirectiveVisitor {
   visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    const { defaultFormat } = this.args

    field.args.push({
      name: 'format',
      type: GraphQLString
    })

    field.resolve = async function (
      source,
      { format, ...otherArgs },
      context,
      info,
    ) {
      const date = await resolve.call(this, source, otherArgs, context, info)
      return formatDate(date, format || defaultFormat)
    }

    field.type = GraphQLString
  }
}

export {dateTypeDef, DateFormatDirective}
