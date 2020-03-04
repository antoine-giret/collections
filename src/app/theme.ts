interface ITheme {
  palette: {
    primary: {
      main: string,
      contrastText: string
    }
  }
}

const theme: ITheme = {
  palette: {
    primary: {
      main: '#2196f3',
      contrastText: '#fff',
    },
  },
}

export default theme
