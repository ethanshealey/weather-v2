export default (speed: string, unit: string) => unit === 'c' ? parseInt(`${parseInt(speed) * 1.609}`) + 'kph' : parseInt(speed) + 'mph'