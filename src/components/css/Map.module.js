export const styling = {
  common: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:'30px',
  },
  desktop : {
    height: 'calc(100vh - 100px)',
    width: 'calc(100vw - 100px)',
    justifyContent: 'center',
    overflow: 'hidden',
    'WebkitMaskImage': '-webkit-radial-gradient(white, black)',
  },
  mobile : {
    height: '100%',
    width: '100%',
    // 'WebkitMaskImage': '-webkit-radial-gradient(white, black)',
  }
}
