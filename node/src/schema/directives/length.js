import { SchemaDirectiveVisitor } from 'graphql-tools'
import { GraphQLScalarType, GraphQLNonNull } from 'graphql'

const lengthType = `
  directive @length(
    min: Int = 5
    max: Int = 0
  ) on INPUT_FIELD_DEFINITION | FIELD_DEFINITION
`

class LengthDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition(field) {
    this.wrapType(field);
  }

  visitFieldDefinition(field) {
    this.wrapType(field);
  }

  // Replace field.type with a custom GraphQLScalarType that enforces the
  // length restriction.
  wrapType(field) {
    if (field.type instanceof GraphQLNonNull &&
        field.type.ofType instanceof GraphQLScalarType) {
      field.type = new GraphQLNonNull(
        new LimitedLengthType(field.type.ofType, this.args.min, this.args.max))
    } else if (field.type instanceof GraphQLScalarType) {
      field.type = new LimitedLengthType(field.type, this.args.min, this.args.max)
    } else {
      throw new Error(`Not a scalar type: ${field.type}`);
    }
  }
}

class LimitedLengthType extends GraphQLScalarType {
  constructor(type, minLength, maxLength) {
    super({
      name: `LengthAtLeast${minLength}AtMost${maxLength}`,

      serialize(value) {
        //value = type.serialize(value)
        if ( assert.isAtLeast(value.length, minLength)) {
          if (maxLength !== 0) {
            if (assert.isAtMost(value.length, maxLength)){
              return value
            }
          }
        }
      },

      parseValue(value) {
        return type.parseValue(value)
      },

      parseLiteral(ast) {
        console.log(type.parseLiteral(ast))
        return type.parseLiteral(ast)
      }
    })
  }
}

export {lengthType, LengthDirective}