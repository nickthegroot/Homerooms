const type = {
  base: 'OpenSans-Regular',
  header: 'Lato-Regular'
}

const size = {
  regular: 17,
  medium: 15,
  header: 27,
  smallHeader: 20
}

const style = {
  header: {
    fontFamily: type.header,
    fontSize: size.header,
    fontWeight: 'bold'
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
