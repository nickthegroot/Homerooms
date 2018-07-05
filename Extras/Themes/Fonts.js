const families = {
  headings: 'JosefinSlab',
  content: 'Nunito'
}

const type = {
  headings: families.headings + '-Regular',
  content: families.content + '-Regular'
}

const size = {
  regular: 14,
  heading: 20,
  largeHeading: 52
}

const style = {
  content: {
    fontFamily: families.content + '-Regular',
    fontSize: size.regular,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 14
  },
  boldContent: {
    fontFamily: families.content + '-Bold',
    fontSize: size.regular,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 14
  },
  largeHeading: {
    fontFamily: families.content + '-Bold',
    fontSize: size.largeHeading,
    color: 'white'
  },
  heading: {
    fontFamily: families.headings,
    fontSize: size.heading,
    color: 'black'
  },
  header: {
    fontFamily: families.content + '-Bold',
    fontSize: 25,
    color: 'white'
  }
}

export default {
  type,
  size,
  style
}
