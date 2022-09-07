export const styling = {
  desktop : {
    display: 'flex',
    height: 'calc(100vh - 100px)',
    width: 'calc(100vw - 100px)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:'30px',
    overflow: 'hidden',
    '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
  },
  mobile : {
    display: 'flex',
    height: 'calc(100vh - 50px)',
    width: 'calc(100vw - 50px)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:'30px',
    overflow: 'hidden',
    '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
  }
}
