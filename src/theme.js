import Constants from 'expo-constants'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: 'System',
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  appBar: {
    tab: {
      flexGrow: 0,
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
      margin: 15,
    },
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#24292e',
      display: 'flex',
    },
  },
  repository: {
    tinyLogo: {
      width: 50,
      height: 50,
      borderRadius: 5,
      flexGrow: 0,
    },
    row: {
      flexDirection: 'row',
      display: 'flex',
    },
    mainText: {
      marginStart: 10,
      flexGrow: 0,
    },
    language: {
      backgroundColor: '#0366d6',
      borderRadius: 4,
      color: '#ffff',
      fontWeight: 'bold',
      flexGrow: 0,
      padding: 8,
      marginTop: 10,
      marginBottom: 10,
    },
    itemContainer: {
      backgroundColor: 'white',
      marginBottom: 5,
      padding: 10,
    },
    statisticsElement: {
      flexGrow: 1,
      display: 'flex',
      margin: 10,
      alignItems: 'center',
    },
  },
}

export default theme
