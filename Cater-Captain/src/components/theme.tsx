import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
       darkTheme:{ primary: '#141220',
        secondary: '#90B4D6',
        tertiary: '#D2A4A4',
        quaternary: '#CBE6AD',
        quinary: '#DCDCDC',
       },
       lightTheme:{primary: '#FFFFFF',
        secondary: '#E2E8F0',
        tertiary: '#F7FAFC',
        quaternary: '#EDF2F7',
        quinary: '#FFFFFF',
        }
    }
})

export default theme; 