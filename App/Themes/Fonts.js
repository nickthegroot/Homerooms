const type = {
  headings: 'Josefin Slab',
  content: 'Nunito'
}

const size = {
  regular: 14,
  heading: 20,
  largeHeading: 52
}

const style = {
  content: {
    fontFamily: type.content,
    fontSize: size.regular,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 14
  },
  largeHeading: {
    fontFamily: type.content + '-Bold',
    fontSize: size.largeHeading,
    color: 'white'
  },
  heading: {
    fontFamily: type.headings,
    fontSize: size.heading,
    color: 'black'
  }
}

export default {
  type,
  size,
  style
}
